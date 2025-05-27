require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const axios   = require('axios');
const datos   = require('./datos');

const {
  PUERTO,
  URL_SOLICITUDES,
  TBK_ENV_URL,
  TBK_COMMERCE_CODE,
  TBK_API_KEY,
  TBK_RETURN_URL
} = process.env;

// Cabeceras TbK según doc de Transbank REST v1.0
const AUTH_HEADERS = {
  'TbK-Api-Key-Id':     TBK_COMMERCE_CODE,
  'TbK-Api-Key-Secret': TBK_API_KEY,
  'Content-Type':       'application/json'
};

const app = express();
app.use(
  cors(),
  express.json(),
  express.urlencoded({ extended: true }) // para procesar formularios POST desde el navegador
);

/**
 * 1) Iniciar pago Webpay (create transaction)
 */
app.post('/api/pagos/webpay/init', async (req, res) => {
  const { solicitudId, monto } = req.body;
  if (!solicitudId || monto == null) {
    return res.status(400).json({ error: 'Faltan solicitudId o monto' });
  }

  // 1.a) Verificar que la solicitud exista
  try {
    await axios.get(`${URL_SOLICITUDES}/${solicitudId}`);
  } catch {
    return res.status(404).json({ error: 'Solicitud no existe' });
  }

  // 1.b) Preparar cuerpo de la transacción
  const body = {
    buy_order:  `S${solicitudId}-${Date.now()}`,
    session_id: `SES${solicitudId}-${Date.now()}`,
    amount:     Number(monto),
    return_url: TBK_RETURN_URL
  };

  // 1.c) Llamada al endpoint REST v1.0
  try {
    console.log('→ Webpay INIT URL:', `${TBK_ENV_URL}/transactions`);
    const { data } = await axios.post(
      `${TBK_ENV_URL}/transactions`,
      body,
      { headers: AUTH_HEADERS }
    );
    // devuelve { token, url }
    res.json(data);
  } catch (e) {
    console.error('Webpay init error:', e.response?.status, e.response?.data);
    res.status(500).json({
      error: 'Error iniciando transacción',
      detalle: e.response?.data || e.message
    });
  }
});

/**
 * Función interna para commit (confirmar pago) — REST v1.0 usa PUT
 */
async function commitTransaccion(token) {
  const { data } = await axios.put(
    `${TBK_ENV_URL}/transactions/${token}`,
    {},                 // body vacío
    { headers: AUTH_HEADERS }
  );
  // Guardar en memoria
  const pago = {
    id: datos.siguienteId++,
    ...data,
    metodo: 'Webpay',
    fecha: new Date().toISOString()
  };
  datos.pagos.push(pago);
  return data;
}

/**
 * 2) Confirmar pago Webpay — GET para navegador (redirección automática)
 */
app.get('/api/pagos/webpay/commit', async (req, res) => {
  const token = req.query.token_ws;
  if (!token) {
    return res.status(400).send('Falta token_ws en la URL');
  }
  try {
    const resultado = await commitTransaccion(token);
    return res.send(`
      <h1>Pago confirmado:</h1>
      <pre>${JSON.stringify(resultado, null, 2)}</pre>
    `);
  } catch (e) {
    console.error('Webpay commit GET error:', e.response?.data || e.message);
    return res.status(500).send('Error confirmando el pago. Mira la consola.');
  }
});

/**
 * 2.b) Confirmar pago Webpay — POST para Postman o clientes API
 */
app.post('/api/pagos/webpay/commit', async (req, res) => {
  const token = req.query.token_ws
    || req.body.token_ws
    || req.body.token;
  if (!token) {
    return res.status(400).json({ error: 'Falta token_ws' });
  }
  try {
    const resultado = await commitTransaccion(token);
    return res.json(resultado);
  } catch (e) {
    console.error('Webpay commit POST error:', e.response?.data || e.message);
    return res.status(500).json({ error: 'Error confirmando transacción' });
  }
});

/**
 * 3) Listar todos los pagos procesados
 */
app.get('/api/pagos', (_, res) => {
  res.json(datos.pagos);
});

app.listen(PUERTO, () =>
  console.log(`→ Servicio de Pagos (Webpay) escuchando en http://localhost:${PUERTO}`)
);

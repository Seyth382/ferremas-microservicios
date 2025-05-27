require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const axios   = require('axios');
const datos   = require('./datos');

const URL_PRODUCTOS = process.env.URL_PRODUCTOS;
const app = express();
app.use(cors(), express.json());

// 1) Crear solicitud
app.post('/api/solicitudes', async (req, res) => {
  const { sucursal, productoId, cantidad } = req.body;
  if (!sucursal || productoId == null || cantidad == null) {
    return res.status(400).json({
      status: 400, error: 'Bad Request',
      message: 'Faltan sucursal/productoId/cantidad',
      path: '/api/solicitudes'
    });
  }

  // Validar producto y stock
  let producto;
  try {
    producto = (await axios.get(`${URL_PRODUCTOS}/${productoId}`)).data;
  } catch {
    return res.status(404).json({
      status: 404, error: 'Not Found',
      message: 'Producto no existe',
      path: '/api/solicitudes'
    });
  }
  if (producto.stock < cantidad) {
    return res.status(409).json({
      status: 409, error: 'Conflict',
      message: 'Stock insuficiente',
      path: '/api/solicitudes'
    });
  }

  // Crear solicitud en memoria
  const sol = {
    id: datos.siguienteId++,
    sucursal,
    productoId,
    cantidad,
    fecha: new Date().toISOString()
  };
  datos.solicitudes.push(sol);

  res.status(201)
     .location(`/api/solicitudes/${sol.id}`)
     .json(sol);
});

// 2) Listar todas las solicitudes
app.get('/api/solicitudes', (_, res) => {
  res.json(datos.solicitudes);
});

// 3) Obtener una solicitud por ID
app.get('/api/solicitudes/:id', (req, res) => {
  const id = Number(req.params.id);
  const sol = datos.solicitudes.find(x => x.id === id);
  if (!sol) {
    return res.status(404).json({
      status: 404, error: 'Not Found',
      message: 'Solicitud no existe',
      path: `/api/solicitudes/${id}`
    });
  }
  res.json(sol);
});

const PUERTO = process.env.PUERTO || 3002;
app.listen(PUERTO, () =>
  console.log(`→ Servicio de Solicitudes escuchando en http://localhost:${PUERTO}`)
);

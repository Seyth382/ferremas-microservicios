// src/index.js
require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const axios   = require('axios')

const { PUERTO, MINDICADOR_API } = process.env

// Mapeo de códigos ISO a slugs de Mindicador.cl
const SLUG_MAP = {
  USD: 'dolar',
  EUR: 'euro',
  UF:  'uf',
  IVP: 'ivp',
  IPC: 'ipc'
  // ... agrega más si lo necesitas
}

const app = express()
app.use(cors())
app.use(express.json())

/**
 * GET /api/divisas/convert?from=USD&amount=100
 */
app.get('/api/divisas/convert', async (req, res) => {
  const { from, amount } = req.query
  if (!from || amount == null) {
    return res.status(400).json({ error: 'Falta from o amount' })
  }

  // 1) Determinar slug de Mindicador
  const iso  = from.toUpperCase()
  const slug = SLUG_MAP[iso]
  if (!slug) {
    return res.status(404).json({ error: 'Moneda no soportada' })
  }

  try {
    // 2) Llamar a Mindicador
    const url = `${MINDICADOR_API}/${slug}`
    const { data } = await axios.get(url)

    // 3) Extraer el valor más reciente
    const serie = data.serie
    if (!Array.isArray(serie) || serie.length === 0) {
      throw new Error(`Serie vacía para ${slug}`)
    }
    const tasa = serie[0].valor
    if (typeof tasa !== 'number') {
      throw new Error('Valor de tasa no es número')
    }

    // 4) Calcular conversión
    const original  = Number(amount)
    const converted = +(original * tasa).toFixed(2)

    return res.json({
      from:      iso,
      to:        'CLP',
      original,
      rate:      tasa,
      converted
    })
  } catch (err) {
    console.error('Error conversión Mindicador:', err.message)
    return res
      .status(500)
      .json({ error: `No se pudo obtener la tasa de ${iso}` })
  }
})

// Exportamos la app para que Jest/Supertest la importe sin arrancar el servidor
module.exports = app

// Si ejecutamos este archivo directamente, levantamos el servidor HTTP
if (require.main === module) {
  app.listen(PUERTO, () =>
    console.log(`→ Servicio de Divisas escuchando en http://localhost:${PUERTO}`)
  )
}

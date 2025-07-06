// src/index.js
require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const datos   = require('./datos')

const app = express()
app.use(cors())
app.use(express.json())

/** 1. Listar categorías */
app.get('/api/categorias', (_req, res) => {
  res.json(datos.categorias)
})

/** 2. Listar productos de una categoría */
app.get('/api/categorias/:id/productos', (req, res) => {
  const catId  = Number(req.params.id)
  const existe = datos.categorias.some(c => c.id === catId)
  if (!existe) {
    return res
      .status(404)
      .json({
        status: 404,
        error:  'Not Found',
        message:'Categoría no existe',
        path:   `/api/categorias/${catId}`
      })
  }
  const lista = datos.productos.filter(p => p.categoriaId === catId)
  res.json(lista)
})

/** 3. Listar todos los productos */
app.get('/api/productos', (_req, res) => {
  res.json(datos.productos)
})

/** 4. Detalle de un producto por código */
app.get('/api/productos/:codigo', (req, res) => {
  const prod = datos.productos.find(p => p.codigoProducto === req.params.codigo)
  if (!prod) {
    return res
      .status(404)
      .json({
        status: 404,
        error:  'Not Found',
        message:'Producto no existe',
        path:   `/api/productos/${req.params.codigo}`
      })
  }
  res.json(prod)
})

/*
  Sólo arrancamos el servidor si este archivo se ejecuta
  directamente con `node src/index.js`. Cuando Jest haga:
     const app = require('../src/index')
  NO se abrirá el TCP.
*/
if (require.main === module) {
  const PUERTO = process.env.PUERTO || 3001
  app.listen(PUERTO, () =>
    console.log(`→ Servicio de Productos escuchando en http://localhost:${PUERTO}`)
  )
}

module.exports = app

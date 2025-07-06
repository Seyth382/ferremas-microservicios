// tests/productos.test.js
const request = require('supertest')
const app     = require('../src/index')   // importa la "app" de Express

describe('🎯 Servicio de Productos', () => {
  describe('GET /api/productos', () => {
    it('✓ debería devolver 200 y un array de productos', async () => {
      const res = await request(app).get('/api/productos')
      expect(res.statusCode).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
      // cada elemento debe tener estas propiedades:
      if (res.body.length > 0) {
        const p = res.body[0]
        expect(p).toHaveProperty('codigoProducto')
        expect(p).toHaveProperty('nombre')
        expect(p).toHaveProperty('precio')
        expect(p).toHaveProperty('stock')
      }
    })
  })

  describe('GET /api/productos/:codigo', () => {
    it('✓ con código válido → 200 y objeto detalle', async () => {
      // coge uno de los que tienes en datos.productos
      const prod = require('../src/datos').productos[0]
      const res  = await request(app).get(`/api/productos/${prod.codigoProducto}`)
      expect(res.statusCode).toBe(200)
      expect(res.body.codigoProducto).toBe(prod.codigoProducto)
      expect(res.body.nombre).toBe(prod.nombre)
    })

    it('✗ con código inexistente → 404 y mensaje de error', async () => {
      const res = await request(app).get('/api/productos/NO-EXISTE')
      expect(res.statusCode).toBe(404)
      expect(res.body).toMatchObject({
        status:  404,
        error:   'Not Found',
        message: 'Producto no existe',
      })
    })
  })
})

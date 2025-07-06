// tests/categorias.test.js
const request = require('supertest')
const app     = require('../src/index')
const datos   = require('../src/datos')

describe('🎯 Servicio de Productos – Categorías', () => {

  it('GET /api/categorias → 200 y array de categorías', async () => {
    const res = await request(app).get('/api/categorias')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    if (res.body.length > 0) {
      // cada categoría debe tener id y nombre (o como lo definas)
      const c = res.body[0]
      expect(c).toHaveProperty('id')
      expect(c).toHaveProperty('nombre')
    }
  })

  it('GET /api/categorias/:id/productos con id válida → 200 y lista filtrada', async () => {
    // toma la primera categoría que exista
    const cat = datos.categorias[0]
    const res = await request(app).get(`/api/categorias/${cat.id}/productos`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    // Todos los productos devueltos deben pertenecer a esa categoría
    res.body.forEach(p => {
      expect(p.categoriaId).toBe(cat.id)
    })
  })

  it('GET /api/categorias/:id/productos con id sin productos → 200 y array vacío', async () => {
    // crea un id que exista en categorías pero sin productos asociados
    // por ejemplo si la última categoría no tiene productos
    const todasCatIds = datos.productos.map(p => p.categoriaId)
    const sinProdCat = datos.categorias.find(c => !todasCatIds.includes(c.id))
    if (sinProdCat) {
      const res = await request(app).get(`/api/categorias/${sinProdCat.id}/productos`)
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual([])
    } else {
      // si todas tienen productos, falla el test para que revises los datos
      throw new Error('Todos los categoryId tienen al menos un producto; ajusta datos.js para tener una categoría vacía')
    }
  })

  it('GET /api/categorias/:id/productos con id inválida → 404 y JSON de error', async () => {
    const res = await request(app).get('/api/categorias/9999/productos')
    expect(res.statusCode).toBe(404)
    expect(res.body).toMatchObject({
      status:  404,
      error:   'Not Found',
      message: 'Categoría no existe',
    })
  })

})

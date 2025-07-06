// tests/solicitudes.test.js
const request = require('supertest')
const app     = require('../src/index')

describe('🎯 Servicio de Solicitudes', () => {
  // Limpiar memoria antes de cada test
  beforeEach(() => {
    const datos = require('../src/datos')
    datos.prestamos = []      // si usas array “prestamos”
    datos.siguienteIdPrestamo = 1
  })

  it('✓ POST /api/solicitudes válido → 201 y objeto con campos correctos', async () => {
    const body = {
      sucursal:   'Centro',
      productoId: 'FER-0001',
      cantidad:   2
    }
    const res = await request(app)
      .post('/api/solicitudes')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.body).toMatchObject({
      id: expect.any(Number),
      sucursal:   body.sucursal,
      productoId: body.productoId,
      cantidad:   body.cantidad,
      fecha:      expect.any(String)
    })
  })

  it('✗ POST /api/solicitudes sin “cantidad” → 400 Bad Request', async () => {
    await request(app)
      .post('/api/solicitudes')
      .send({ sucursal:'Centro', productoId:'FER-0001' })
      .expect(400)
  })

  it('✗ POST /api/solicitudes sin “sucursal” → 400 Bad Request', async () => {
    await request(app)
      .post('/api/solicitudes')
      .send({ productoId:'FER-0001', cantidad:1 })
      .expect(400)
  })

  it('✗ POST /api/solicitudes sin “productoId” → 400 Bad Request', async () => {
    await request(app)
      .post('/api/solicitudes')
      .send({ sucursal:'Centro', cantidad:1 })
      .expect(400)
  })

  it('✓ GET /api/solicitudes → 200 y devuelve array con las solicitudes creadas', async () => {
    // crear dos solicitudes antes de listar
    await request(app).post('/api/solicitudes').send({ sucursal:'A', productoId:'X', cantidad:1 })
    await request(app).post('/api/solicitudes').send({ sucursal:'B', productoId:'Y', cantidad:2 })

    const res = await request(app)
      .get('/api/solicitudes')
      .expect(200)

    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(2)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sucursal:'A', productoId:'X', cantidad:1 })
      ])
    )
  })
})

// tests/divisas.test.js
jest.mock('axios')

const axios = require('axios')
const request = require('supertest')
const app = require('../src/index')

describe('🎯 Servicio de Divisas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('✓ GET /api/divisas/convert?from=USD&amount=100 → 200 y JSON con conversión', async () => {
    // Mockeamos la respuesta de Mindicador
    axios.get.mockResolvedValueOnce({
      data: {
        serie: [{ valor: 940.81 }]
      }
    })

    const res = await request(app)
      .get('/api/divisas/convert')
      .query({ from: 'USD', amount: '100' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toEqual({
      from:      'USD',
      to:        'CLP',
      original:  100,
      rate:      940.81,
      converted: +(100 * 940.81).toFixed(2)
    })
    expect(axios.get).toHaveBeenCalledWith('https://mindicador.cl/api/dolar')
  })

  it('✗ GET sin parámetros → 400 Bad Request', async () => {
    await request(app)
      .get('/api/divisas/convert')
      .expect('Content-Type', /json/)
      .expect(400, { error: 'Falta from o amount' })
  })

  it('✗ GET moneda no soportada → 404 Not Found', async () => {
    await request(app)
      .get('/api/divisas/convert')
      .query({ from: 'ABC', amount: '100' })
      .expect('Content-Type', /json/)
      .expect(404, { error: 'Moneda no soportada' })
  })

  it('✗ GET /api/divisas/convert → 500 si falla llamada externa', async () => {
    // Mockeamos un error en la llamada a Mindicador
    axios.get.mockRejectedValueOnce(new Error('network error'))

    await request(app)
      .get('/api/divisas/convert')
      .query({ from: 'USD', amount: '50' })
      .expect('Content-Type', /json/)
      .expect(500, { error: 'No se pudo obtener la tasa de USD' })
  })
})

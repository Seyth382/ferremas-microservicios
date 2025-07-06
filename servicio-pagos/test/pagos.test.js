// tests/pagos.test.js
jest.mock('axios')
const axios   = require('axios')
const request = require('supertest')
const app     = require('../src/index')
const datos   = require('../src/datos')

beforeEach(() => {
  // limpia la memoria entre tests
  datos.pagos.length = 0
  datos.siguienteId = 1
})

describe('🎯 Servicio de Pagos – Webpay', () => {

  describe('POST /api/pagos/webpay/init', () => {
    it('debe devolver 200 y {token, url} con init válido', async () => {
      axios.get.mockResolvedValueOnce({})  
      axios.post.mockResolvedValueOnce({ data: { token:'tk', url:'https://pay' } })

      const res = await request(app)
        .post('/api/pagos/webpay/init')
        .send({ solicitudId: 1, monto: 5000 })
        .expect(200)

      expect(res.body).toEqual({ token:'tk', url:'https://pay' })
    })

    it('400 si faltan campos', async () => {
      await request(app)
        .post('/api/pagos/webpay/init')
        .send({ monto: 1000 })
        .expect(400)
    })

    it('404 si solicitud no existe', async () => {
      axios.get.mockRejectedValueOnce(new Error('not found'))
      await request(app)
        .post('/api/pagos/webpay/init')
        .send({ solicitudId: 999, monto: 100 })
        .expect(404)
    })

    it('500 si Webpay falla', async () => {
      axios.get.mockResolvedValueOnce({})
      axios.post.mockRejectedValueOnce(new Error('timeout'))
      await request(app)
        .post('/api/pagos/webpay/init')
        .send({ solicitudId:1, monto:100 })
        .expect(500)
    })
  })

  describe('POST /api/pagos/webpay/commit', () => {
    it('debe devolver 200 y datos de commit válidos', async () => {
      const fake = { vci:'TSY', amount:5000 }
      axios.post.mockResolvedValueOnce({ data: fake })

      const res = await request(app)
        .post('/api/pagos/webpay/commit?token_ws=abc')
        .send()
        .expect(200)

      expect(res.body).toEqual(fake)
      expect(datos.pagos).toHaveLength(1)
    })

    it('400 si falta token', async () => {
      await request(app)
        .post('/api/pagos/webpay/commit')
        .send()
        .expect(400)
    })

    it('500 si commit falla', async () => {
      axios.post.mockRejectedValueOnce(new Error('fail'))
      await request(app)
        .post('/api/pagos/webpay/commit?token_ws=abc')
        .expect(500)
    })
  })

  describe('GET /api/pagos', () => {
    it('debe listar los pagos en memoria', async () => {
      datos.pagos.push({ id:1, metodo:'Webpay', amount:123 })
      const res = await request(app)
        .get('/api/pagos')
        .expect(200)

      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBe(1)
    })
  })

})

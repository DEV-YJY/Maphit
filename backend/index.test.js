const nock = require('nock')
const request = require('supertest')

const app = require('./index')

describe('POST /add', () => {
  it('returns a successfull response', async () => {
    expect.assertions(2)
    const dummyInput = {
      name: 'New album',
      description: 'New description',
    }
    const response = await request(app).post('/albums/add').send(dummyInput)

    expect(response.text).toContain('Album added successfully')
    expect(response.statusCode).toBe(200)
    // expect(response.data).toBe(`${dummyInput.name}`)
  })
})

describe('GET /', () => {
  it('returns a successfull response', async () => {
    expect.assertions(2)
    const response = await request(app).get('/albums/')

    expect(response.text).toContain('Retrieved albums successfully')
    expect(response.statusCode).toBe(200)
  })
})

// get albumbyid when fails - status, message

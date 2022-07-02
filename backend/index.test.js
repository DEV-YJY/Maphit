const nock = require('nock')
const request = require('supertest')
const { put } = require('./index')

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
    // expect(response.data).toBeTruthy()
  })
})

describe('GET /', () => {
  it('returns a successfull response', async () => {
    expect.assertions(2)
    const response = await request(app).get('/albums/')

    expect(response.body.message).toEqual('Retrieved albums successfully')
    expect(response.statusCode).toBe(200)
  })
})

// get albumbyid when fails - status, message

describe('GET /"albumId', () => {
  it('returns a correct response on failure', async () => {
    expect.assertions(2)
    const mockId = 'abcd0987'
    const response = await request(app).get(`/albums/${mockId}`)

    expect(response.text).toContain('Server error, failed to retrieve an album')
    expect(response.statusCode).toEqual(200)
  })
})

describe('PUT /removeImage/:albumId', () => {
  it('returns error message when request fails', async () => {
    const mockId = 'qwert123'
    const response = await request(app).put(`/albums/removeImage/${mockId}`)

    expect(response.body.message).toEqual('Server error, fail to remove image')
    expect(response.statusCode).toBe(200)
  })
})

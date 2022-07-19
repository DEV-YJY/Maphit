const nock = require('nock')
const request = require('supertest')
const { put } = require('../../index')
const upload = require('../../utils/multer')

const app = require('../../index')

jest.mock('../albumRoutes')

jest.mock('../../utils/multer', () => {
  return {
    array: jest.fn().mockReturnValue((req, res, next) => {
      console.log('mockFunction')
      next()
    }),
  }
})

const mockAlbumId = 'abcd0987'

describe('POST /add', () => {
  it('rreturns a correct response on successfull request', async () => {
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
  it('returns a correct response on successfull request', async () => {
    expect.assertions(2)
    const response = await request(app).get('/albums/')

    expect(response.body.message).toEqual('Retrieved albums successfully')
    expect(response.statusCode).toBe(200)
  })
})

// get albumbyid when fails - status, message

describe('GET /albumId', () => {
  it('returns a correct response on failure', async () => {
    expect.assertions(2)
    const fakeImageFile = 'image.jpeg'
    const response = await request(app).get(`/albums/${mockAlbum}`).send(fakeImageFile)

    expect(response.text).toContain('Server error, failed to retrieve an album')
    expect(response.statusCode).toEqual(200)
  })
})

// below not working :)
describe('PUT /upload/:albumId', () => {
  it('returns a correct success message when promise resolves', async () => {
    // expect.assertions(1)
    const dummyInput = [
      {
        imageName: 'fake-image-Name',
        cloudinaryId: 'fake-cloud-Id',
        url: 'fake-url',
      },
    ]
    console.log(Date.now())
    const response = await request(app)
      .put(`/albums/upload/${mockAlbumId}`)
      .send(dummyInput)
      .then((res) => console.log(res))

    console.log(Date.now())
    console.log(response)
    expect(response.innerHTML).toContain('Image(s) uploaded successfully')
  })

  // todo('returns an error message when promise rejects')
})

// describe('PUT /geoUpdate/"albumId')

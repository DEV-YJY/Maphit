// api to function then mock it
import nock from 'nock'
import { addAlbum, fetchAlbums } from '../album'

const mockData = [
  {
    description: 'fake description',
    name: 'fake name',
    geolocation: [
      {
        imageId: 'fakeId',
        lat: 123,
        lng: 456,
      },
    ],
    imageCloudData: [
      {
        cloudinaryId: 'fakeCloudId',
        imageName: 'fake image name',
        url: 'fakeCloudUrl',
      },
    ],
  },
]
describe('fetchAlbums() action', () => {
  it('returns correct type and payload on successfull call', async () => {
    expect.assertions(2)
    // mock out a fake api call and response
    const scope = nock('http://localhost').get('/albums').reply(200, { result: mockData })
    // fetchAlbums() will call the above
    const result = await fetchAlbums()
    // console.log(result)
    expect(result.type).toBe('FETCH_ALBUMS')
    expect(result.payload[0].imageCloudData[0].cloudinaryId).toBe('fakeCloudId')
    scope.done()
  })
})

describe('addAlbum() action', () => {
  it('returns correct type and payload on successfull call', async () => {
    expect.assertions(2)
    const scope = nock('http://localhost').post('/albums/add').reply(200, mockData)
    const result = await addAlbum()
    console.log('this is result: ', result)
    expect(result.type).toBeTruthy()
    expect(result.payload[0].name).toBe('fake name')
    scope.done()
  })
})

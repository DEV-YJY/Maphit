// api to function then mock it
import nock from 'nock'
import {
  addAlbum,
  deleteAlbum,
  fetchAlbumDetail,
  fetchAlbums,
  removeImage,
  uploadImageWithGeoData,
} from '../album'

// jest.mock('../album')

// afterAll(() => {
//   jest.restoreAllMocks()
// })

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
    // console.log('this is result: ', result)
    expect(result.type).toBeTruthy()
    expect(result.payload[0].name).toBe('fake name')
    scope.done()
  })
})
///////////////////////////////////////// :(
describe('deleteAlbum() action', () => {
  it('returns correct type and payload on successfull call', async () => {
    expect.assertions(2)
    const fakeAlbumId = '62ccb80395dcefc6b0605825'
    const fakeAlbumData = {
      status: 200,
      message: 'Album removed successfully',
      result: {
        place: {
          lat: 123,
          lng: 345,
          placeName: 'VN',
        },
        _id: '62ccb80395dcefc6b0605825',
        name: 'nd',
        description: 'ddasadsfdff',
        geolocation: [],
        imageCloudData: [],
        __v: 0,
      },
    }
    const scope = nock('http://localhost')
      .delete(`/albums/delete/${fakeAlbumId}`)
      .reply(200, fakeAlbumData)
    const result = await deleteAlbum(fakeAlbumId)
    // console.log(result)
    expect(result.type).toBe('DELETE_ALBUM')
    expect(result.payload).toStrictEqual(fakeAlbumData)
    scope.done()
  })
})

////////////////////// :(
// describe('uploadImageWithGeoData()', () => {
//   it('returns the correct type and payload on successfull call', async () => {
//     const fakeAlbumId = '62ccb80395dcefc6b0605825'

//     const scope = await nock('http://localhost')
//       .put(`/albums/upload/${fakeAlbumId}`)
//       .reply(200, mockData)

//     const result = uploadImageWithGeoData(fakeAlbumId, )

//     console.log(result)
//   })
// })

// describe('removeIamge() action', () => {
//   it('returns the correct type and payload on successfull call', async () => {
//     const fakeAlbumId = 'abcd1234'
//     const fakeImageName =
//       'fa23e98ebf996fa-hkzh8lcf-http://res.cload/v1657595157/hkzh0r82y7kwaock8lcf.jpg'
//     const fakeRes = {
//       status: 200,
//       message: 'Image removed successfully',
//       result: {
//         place: {
//           lat: 123,
//           lng: 345,
//           placeName: 'VN',
//         },
//         _id: 'abcd1234',
//         name: 'nnn',
//         description: 'desc',
//         geolocation: [],
//         imageCloudData: [],
//         __v: 0,
//       },
//     }

//     const scope = nock('http://localhost')
//       .put(`/albums/removeImage/${fakeAlbumId}`, fakeImageName)
//       .reply(200, fakeRes)

//     const result = await removeImage(fakeAlbumId, fakeImageName)
//     console.log(result)
//   })
// })

describe('fetchAlbumDetail() action', () => {
  it('returns the correct type and payload on successfull call', async () => {
    const fakeAlbumId = 'abcd1234'
    const fakeRes = {
      result: {
        place: {
          lat: 123,
          lng: 345,
          placeName: 'VN',
        },
        _id: '62ccb80395dcefc6b0605825',
        name: 'nd',
        description: 'ddasadsfdff',
        geolocation: [],
        imageCloudData: [],
        __v: 0,
      },
    }

    const scope = nock('http://localhost')
      .get(`/albums/${fakeAlbumId}`)
      .reply(200, fakeRes)

    const result = await fetchAlbumDetail(fakeAlbumId)
    console.log(result)
    expect(result.type).toStrictEqual('FETCH_ALBUM_DETAIL')
    expect(result.payload).toStrictEqual(fakeRes.result)
    scope.done()
  })
})

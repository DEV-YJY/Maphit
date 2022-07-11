import { FETCH_ALBUMS, FETCH_ALBUM_DETAIL } from '../../actions/type'
import albumReducer from '../albumReducer'

const initialState = {
  albumList: [],
  albumDetail: {},
}

const mockState = {
  albumList: [
    {
      imageCloudData: {
        cloudinaryId: 'ja3sjxc',
        imageName: 'bbdb9artnzojxc',
        url: 'http://res.cloudinaryjt',
      },
    },
  ],
  albumDetail: {
    name: 'fake album Name',
    description: 'fake album description',
    geolocation: [
      {
        imageId: 'fake Id',
        lat: 123,
        lng: 456,
      },
    ],
    place: {
      lat: 123,
      lng: 456,
      placeName: 'fake place name',
    },
    imageCloudData: [
      {
        cloudinaryId: 'fakeCloudId',
        imageName: 'fake image name',
        url: 'fakeCloudUrl',
      },
    ],
  },
}

describe('albumReducer()', () => {
  it('returns the correct state for FETCH_ALBUMS', () => {
    const action = {
      type: FETCH_ALBUMS,
      payload: mockState.albumList,
    }

    const expectedState = {
      albumList: mockState.albumList,
      albumDetail: {},
    }

    const outPutState = albumReducer(initialState, action)
    expect.assertions(2)
    // console.log('outPUTSTATE: ', outPutState.albumList)
    // console.log('initialState: ', initialState)
    expect(outPutState.albumList).toEqual(expectedState.albumList)
    expect(outPutState.albumList).not.toBe(initialState)
  })

  it('returns the correct state for FETCH_ALBUM_DETAIL', () => {
    const action = {
      type: FETCH_ALBUM_DETAIL,
      payload: mockState.albumDetail,
    }

    const expectedState = {
      albumList: [],
      albumDetail: mockState.albumDetail,
    }

    const outputState = albumReducer(initialState, action)
    expect.assertions(2)
    console.log('outputState', outputState)
    console.log('expectedState', expectedState)
    expect(outputState).toStrictEqual(expectedState)
    expect(outputState).not.toBe(expectedState)
  })
})

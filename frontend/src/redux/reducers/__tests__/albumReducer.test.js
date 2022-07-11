import { FETCH_ALBUMS } from '../../actions/type'
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
      payload: mockState,
    }

    const expectedState = {
      albumList: mockState.albumList,
      albumDetail: {},
    }

    const outPutState = albumReducer(initialState, action)

    console.log(outPutState)
    expect(outPutState.albumList.albumList).toEqual(expectedState.albumList)
  })
})

import {
  FETCH_ALBUMS,
  FETCH_ALBUM_DETAIL,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_WITH_GEO,
} from '../../actions/type'
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
  it('returns the correct state for FETCH_ALBUMS action', () => {
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

  it('returns the correct state for FETCH_ALBUM_DETAIL action', () => {
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

  it('returns the correct state for UPLOAD_IMAGE_WITH_GEO action', () => {
    const action = {
      type: UPLOAD_IMAGE_WITH_GEO,
      payload: {
        resGeoData: [
          {
            imageId: 'fake Id',
            lat: 123,
            lng: 456,
          },
        ],
        resGeoPlace: {
          lat: 123,
          lng: 456,
          placeName: 'fake place name',
        },
      },
    }

    const expectedState = {
      albumList: [],
      albumDetail: mockState.albumDetail,
    }

    const outputState = albumReducer(initialState, action)

    // console.log(outputState.albumDetail.place)
    // console.log('expected: ', expectedState.albumDetail.place)
    expect(outputState.albumDetail.place).toStrictEqual(expectedState.albumDetail.place)
  })

  it('returns the correct state for REMOVE_IMAGE action', () => {
    const fakeState = {
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

    const action = {
      type: REMOVE_IMAGE,
      payload: {
        name: 'fake album Name',
        description: 'fake album description',
        geolocation: [],
        place: {
          lat: 123,
          lng: 456,
          placeName: 'fake place name',
        },
        imageCloudData: [],
      },
    }

    const expectedState = {
      albumDetail: {
        name: 'fake album Name',
        description: 'fake album description',
        geolocation: [],
        place: {
          lat: 123,
          lng: 456,
          placeName: 'fake place name',
        },
        imageCloudData: [],
      },
    }

    const outputState = albumReducer(fakeState, action)
    expect.assertions(1)
    // console.log(outputState)
    expect(expectedState).toStrictEqual(outputState)
  })
})

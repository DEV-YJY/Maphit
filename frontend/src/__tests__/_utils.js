export const mockState = {
  album: {
    albumDetail: {
      name: 'Summer holiday',
      description: 'it was fun',
      geolocation: [],
      imageCloudData: [
        {
          cloudinaryId: 'someId',
          imageName: 'someName',
          url: 'someUrl',
        },
      ],
      place: {
        lat: 123,
        lng: 456,
        placeName: 'Singapore',
      },
    },
    albumList: [
      {
        description: 'Had so much fun',
        name: 'Summer holiday',
        place: [
          {
            lat: 123,
            lng: 456,
            placeName: 'Singapore',
          },
        ],
        imageCloudData: [
          {
            cloudinaryId: 'someId',
            imageName: 'someName',
            url: 'someUrl',
          },
        ],
      },
    ],
  },
}

# Maphit

This is a travel photo album application that displays the locations where the photos were taken.

- A user can :
  - Create different albums for different places.
  - Enter the address of the place they visited.
  - Can save photos in their albums.
  - Can delete their albums.
  - Can delete images from their albums.
  - Can check the locations where the photos were taken on the map.
  - Can change the colour theme (dark & light) depending on their need.

- All albums are saved in the database.
- All photos are saved in the cloud.
- The application is responsive.

## Demonstration
[Demo](https://youtu.be/8y-DjtxzMkE)

## Project Status
This project is complete to the level where user can upload their photos and see visual data representation. Functionality to add authentication is in progress.

## Built with
### Frontend
- [ReactJS](https://reactjs.org/) - Used for frontent functionality
- [Redux](https://redux.js.org/) - Used for state management
- [Tailwind](https://tailwindcss.com/) - Used for content presentation
- [React Google Maps API](https://react-google-maps-api-docs.netlify.app/) - Used for mapping the locaiton of the photos.

### Backend
- [MongoDB](https://www.mongodb.com/) - Used for storing the user data
- [Cloudinary](https://cloudinary.com/) - Used for storing the photos 
- [ExpressJS](https://nodejs.org/en/) - Used for setting up the server-side environment
- [Exifr](https://github.com/MikeKovarik/exifr) - Used for extracting the geolocation of the photos
- [Multer](https://github.com/expressjs/multer) - Used for uploading the files
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Vanilla JavaScript for functionality in both frontend and backend



## Reflection
This was a solo project that I worked on during the Bootcamp. Project goals included using technologies learned up until this point while trying out some new technologies which were not covered in the Bootcamp. Hence, I decided to make try out the [MERN stack](https://www.mongodb.com/mern-stack).

I wanted to build an application that allows users to create a digital travel album which also displays the locations where the photos were taken.

One of the main challenges I ran into was the backend part where I tried to connect the server with the database and cloud that I have never come across with. I initially decided to table connecting it to the cloud and decided to save photos within the application. However, after a few attempt, I managed to save the photos to the cloud and therefore enhanced the application performance.



## Author
- **[YJ You](https://github.com/DEV-YJY)** - *Developed the app*

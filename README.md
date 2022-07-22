# App name

This is a travel photo album application that displays the locations where the photos were taken.

- A user can :
  - Create different albums for different places.
  - Enter the address of the place they visited.
  - Can save photos in their albums.
  - Can check the locations where the photos were taken on       the map.
  - Can change the colour theme (dark & light) depending on their need.

- All albums are saved in the database.
- All photos are saved in the cloud.

## Demonstration
<!-- [Demo the project in production](https://triplanner.netlify.app/) -->

## Project Status
This project is complete to the level where user can upload their photos and see visual data representation. Functionality to add authentication is in progress.

## Project Screen Shot(s)
SCREEN SHOTS TO BE ADDED

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

## Deployment
This application was deployed usign [Vercel](https://vercel.com)

## Reflection
This was a solo project that I worked on during the Bootcamp. Project goals included using technologies learned up until this point while trying out some new technologies which were not covered in the Bootcamp.

I wanted to build an application that allows users to create a digital travel album which also displays the locations where the photos were taken.

One of the main challenges I ran into was the backend part where I tried to connect the server with the database and cloud that I have never come across with. I initially decided to table connecting it to the cloud and save photos in local. However, after a few attempt, I managed to send the photos to the cloud and therefore enhanced the application performance.



## Author
- **[YJ You](https://github.com/DEV-YJY)** - *Developed the app*

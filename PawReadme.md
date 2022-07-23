
# PaWalker

This is a platform that connects the dog owners with the walkers who do not own their own pets but willing to go for a walk with someone else's pet.

- A user can :
  - Log in with their email or Google accounts.
  - Register as either a walker or owner.
  - Upload their pets profile if register as an owner.
  - View all pet list.
  - View each pet profile and their owner.
  - Filter through the pet list by the location.
  - View the walkers list.
  - View each walker profile.
  - Add pets to their walk history.
  - Leave a review on their walk.
  - View the rank that displays the walkers based on the reviews.




## Project Status
This project is currently in development. Users can log in and see visual data representation. Functionality to write, update and delete to the database is in progress. Additional feature such as internal chat system is to be added.


## Project Screen Shot(s)

<p align="center">
<img src="https://user-images.githubusercontent.com/86042155/180580060-8ce12958-c6e2-4549-8f03-0951e1020049.png" alt="drawing" width="600"/>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/86042155/180584392-037777ca-fa74-4369-b6d5-3e48d80a9d08.png" alt="drawing" width="300"  align="top"/>
  <img src="https://user-images.githubusercontent.com/86042155/180584407-c0c4805c-4105-4aa7-88b6-7f298074bb97.png" alt="drawing" width="300" align="top"/>
  <img src="https://user-images.githubusercontent.com/86042155/180584423-6f4161d0-2e88-4943-b54c-c54e0eb275e7.png" alt="drawing" width="300" align="top"/>
  <img src="https://user-images.githubusercontent.com/86042155/180584442-5f45ffd7-0d72-4c45-81c6-97fe96b2cb8d.png" alt="drawing" width="300" align="top"/>
  <img src="https://user-images.githubusercontent.com/86042155/180584504-4e6a095a-cfdb-4b65-8e59-fd73e9da2646.png" alt="drawing" width="400" align="top"/>
</p>

## Project Details
This project includes:
* 3 API endpoints (`/api/v1/petsApi`, `/api/v1/reviewsApi`, `/api/v1/usersApi`)
* An auth0 landing page(register/logIn,logOut)
* various react components (view pet list, view pet profile, view user list, view user profile, ranking, reviews, history)
* 3 diffent databases with multiple tables storing information on users, pets and reviews
* configuration for Jest and testing library
* configuration for server-side debugging in VS Code



## Built with
### Frontend
- [ReactJS](https://reactjs.org/) - Used for frontent functionality
- [Redux Toolkit](https://redux.js.org/) - Used for state management
- [Tailwind](https://tailwindcss.com/) - Used for content presentation
- [Auth0](https://auth0.com/docs) - Used for user log in

### Backend
- [ExpressJS](https://nodejs.org/en/) - Used for setting up the server-side environment
- [SQLite3](https://www.sqlite.org/index.html) - Used for implementing SQL database
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Vanilla JavaScript for functionality in both frontend and backend

### Database Diagram
<img src="https://user-images.githubusercontent.com/86042155/180577342-fdea1787-e704-4f21-977e-3687a4027c36.png" alt="db-diagram" width="400"/>



## Reflection
This was the final group project built during the last week in the Bootcamp. From my past experience, I always thought that walking or running could be a lot more interesting when you have your paw mate. I noticed that the free neighbour dog walking service was quite thin in New Zealand. The team gather up to fill this gap to bring joy to the walkers, dog owners and the dogs themselves.

Hence, as a product owner, I wanted to build a free platform that links two parties:
- Walkers/runners who do not have a dog but would love to neighbour's dog for a walk
- Dog owners who need a free dog walk service in their neighbour

I suggested trying out a recent state management tool (Redux Toolkit) and thankfully the team agreed with the idea. The team had a previous experience with Redux so implementing Redux Toolkit was foreign but was something that the team quickly adapted to. One of the main challenges we also ran into was the implementation of Auth0 for the application. Implementation of Auth0 provides the main feature of the application that each user can create, update and delete their information on the database whilst reading other users' information.

Apart from the technical obstacles, the team worked collaboratively. We actively shared our ideas on the project. We had a minimum of two stand-ups every day where each member shared on what they have worked on in between and the issues they were facing. Each of us tried our best to complete the assigned tickets while helping other team members who were stuck on the problems.
Thank you for your hard work team!



## Authors
- **[YJ You](https://github.com/DEV-YJY)** - *Product Owner*
- **[Cameron Read](https://github.com/cameron-read)** - *Agile Facilitator*
- **[Harrison Mordecai](https://github.com/Banger66)** - *Agile Facilitator*
- **[Rodrigo Reis](https://github.com/RodrigoReis-dev)** - *Git Keeper*
- **[Callan Pinto](https://github.com/BaTmAnOmOrE)** - *Vibes Watcher*

# PhotoFolio

PhotoFolio is a sophisticated photo album management application that allows users to create and view photo albums with ease. The application supports album creation, image uploads, and provides a carousel view for an enhanced image browsing experience.

## Features

- **Album Management**: Create and view albums.
- **Image Management**: Add, update, delete, and view images within albums.
- **Image Carousel**: View images in a carousel format for a seamless browsing experience.
- **Real-Time Updates**: Real-time updates using Firestore to keep data synchronized across all devices.
- **Toast Notifications**: Real-time feedback for user actions using React-toastify.
- **Loading Indicators**: Display loading spinners to enhance user experience during data fetch operations.

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [React-toastify](https://fkhadra.github.io/react-toastify/): For providing beautiful notifications.
  - [react-spinner-material](https://www.npmjs.com/package/react-spinner-material): For displaying loading spinners.
  - [CSS Modules](https://github.com/css-modules/css-modules): For styling components locally.

- **Backend**:
  - [Firebase Firestore](https://firebase.google.com/products/firestore): A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)
- Firebase account

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/sho4516/PhotoFolio.git

2. Navigate to the project directory
   ```sh
   cd PhotoFolio

3. Install NPM packages
   ```sh
   npm install

4. Create a Firebase project and obtain your Firebase configuration credentials. Replace the Firebase config object in firebaseinit.js with your credentials.

### Running the application

1. Start the development server
   ```sh
   npm start
   
2. Open http://localhost:3000 to view it in the browser.

## Usage

- User Registration/Login: Register or log in to access your albums.
- Create Album: Use the "Add Album" button to create a new album.
- Add Images: Open an album and use the "Add Image" button to upload images.
- View Images: Click on any image to view it in the carousel mode.
- Edit/Delete: Use the update and delete buttons to manage your albums and images.

## Contribution

### Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request


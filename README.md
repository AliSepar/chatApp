# ChatApp

A real-time chat application built using React and Firebase. This project serves as a practice to enhance my skills in React and Firebase development. Users can search for and add other users, send real-time messages, and share images.

## Features

- **User Authentication**: Users can create accounts and log in using Firebase Authentication.
- **Search Users**: Find and add users to your chat list.
- **Real-Time Messaging**: Send and receive messages instantly using Firebase Firestore.
- **Image Sharing**: Send images in real-time as part of the chat.
- **Emoji Support**: Integrate emoji selection with `emoji-picker-react`.

## Technologies Used

- **Vite**: A modern frontend build tool that provides a fast development environment.
- **React**: A JavaScript library for building user interfaces.
- **Firebase**: A platform for developing web and mobile applications, used here for authentication and real-time database.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Zustand**: A small, fast, and scalable state management tool for React.
- **emoji-picker-react**: A React component for selecting emojis.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/chatapp.git

   ```

2. Navigate to the project directory:
   `cd chatapp`
3. Install the dependencies:
   `npm install` or `yarn install`

4. Set up Firebase:

- Create a Firebase project at Firebase Console.

- Enable Authentication (Email/Password) and Firestore Database.

- Copy your Firebase config and create a .env file in the root directory with the following format:

```
.env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

5. Start the development server:

```
npm run dev
```

or

```
yarn dev
```

6. Open your browser and navigate to http://localhost:3000 to see the app in action!

### Usage

1. Register a new account or log in with existing credentials.
2. Use the search bar to find and add users.
3. Start chatting by sending messages and sharing images.
4. Use the emoji picker to include emojis in your messages!

### Contributing

Contributions are welcome! If you have suggestions for improvements or features, please fork the repository and submit a pull request.

### Acknowledgments

- Firebase
- React
- Tailwind CSS
- Zustand
- emoji-picker-react

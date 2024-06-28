
# Guestroom Booking Application (MERN Stack)

## Overview

This project is a Guestroom Booking Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to book rooms, manage bookings, and view property details.

## Features

- User authentication (login, logout, registration)
- CRUD operations for properties and rooms
- Booking management (create, view bookings)

## Installation

To run this application locally, follow these steps:

1. **Clone the repository**

   git clone <repository-url>
   cd guestroom-booking-app

2. **Install dependencies**

   # Install server dependencies

   - In main directory
     npm install

   # Install client dependencies

   - In frontend directory
     cd ../frontend
     npm install

3. **Database setup**

   - Ensure MongoDB is installed and running locally or check a remote MongoDB URI in your `.env` file.

## Running the Application

To start the application, follow these steps:

1. **Start the server**

   # From the main directory

   npm run backend

2. **Start the client**

   # From the client directory

   npm start

3. **Access the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

To deploy the application to a production environment:

1. **Build the client**

   # From the client directory

   npm run build

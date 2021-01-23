# Reservation

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.


# Summary

This is a app that lets you make reservations to your favorite restaurants and tracks them. Helps people easily make reservations without having to call and helps workers manage all the reservations. 


# Documentation
As a User i can 
- Create an account with username password name
- Search when i want to make my reservation, what kind of restaurant im looking for and how many people, then you are displayed with avilable tables that you can reserve for your preferences
- After you make a reservation you are taken to a separate screen where you can see information about all of your active reservations
- In the screen with your active reservations you have a button to cancel any of the reservations

As a Admin i can
- Create an account with username password name
- Afer creation of admin account you are taken to a screen to Edit all the information about your Restaurant
- In the dashboard you can see all future reservations ordered by date
- You can mark any of the reservations as complete as soon as the guests have left
- You can click on edit tables where it will take you to a separate page where you can see all the tables in the Restaurant
- You can add new tables at the bottom of the screen

# ScreenShots
https://prnt.sc/xhpy8m - Restaurant Creation
https://prnt.sc/xhq037 - Admin Dashboard
https://prnt.sc/xhq0jc - Table Dashboard

https://prnt.sc/xhq296 - User Search
https://prnt.sc/xhq300 - User active reservations

# Technologies
This app uses React.js for the Client side, Node.js and Express for the server side and PostgreSQL for the database
# Sales-Admin Panel

A backend system to manage wholesaler-retailer relationships and track sales data, built with Node.js, Express.js, and MySQL using the Sequelize ORM.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Setup and Installation](#setup-and-installation)

## Overview

This project implements a wholesaler-retailer management system with the following features:

- Wholesalers can have multiple retailers and retailers can associate with multiple wholesalers
- Tracking of stock sales from wholesalers to retailers on a monthly basis
- Robust API endpoints for data analysis and relationship management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Architecture**: MVC (Model-View-Controller)

## Database Schema

The database consists of three main tables:

### wholesaler

- id (Primary Key)
- name
- mobile_number
- createdAt
- updatedAt

### retailer

- id (Primary Key)
- name
- mobile_number
- createdAt
- updatedAt

### stock

- id (Primary Key)
- retailer_id (Foreign Key)
- wholesaler_id (Foreign Key)
- stock_amount
- date
- createdAt
- updatedAt

### retailer_wholesaler (Junction Table)

- retailer_id (Foreign Key)
- wholesaler_id (Foreign Key)
- createdAt
- updatedAt

## API Documentation

### 1. Wholesaler with Associated Retailers

Retrieves a wholesaler with all their associated retailers.

- **Endpoint**: `GET /api/wholesalers/:id/retailers`
- **Example**: `http://localhost:3000/api/wholesalers/1/retailers`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Wholesaler A",
    "mobile_number": "1234567890",
    "retailers": [
      {
        "id": 1,
        "name": "Retailer X",
        "mobile_number": "9876543210"
      },
      ...
    ]
  }
  ```

### 2. Retailers with Single Wholesaler

Retrieves all retailers that are associated with exactly one wholesaler.

- **Endpoint**: `GET /api/retailers/with-single-wholesaler`
- **Example**: `http://localhost:3000/api/retailers/with-single-wholesaler`
- **Response**:
  ```json
  [
    {
      "id": 3,
      "name": "Retailer Z",
      "mobile_number": "5555555555",
      "wholesalers": [
        {
          "id": 2,
          "name": "Wholesaler B"
        }
      ]
    },
    ...
  ]
  ```

### 3. Monthly Turnover for Each Wholesaler

Returns the total monthly turnover for each wholesaler for a complete year.

- **Endpoint**: `GET /api/wholesalers/monthly-turnover`
- **Example**: `http://localhost:3000/api/wholesalers/monthly-turnover`
- **Response**:
  ```json
  [
    {
      "wholesaler_id": 1,
      "wholesaler_name": "Wholesaler A",
      "year": 2021,
      "monthly_turnover": {
        "January": 12500,
        "February": 10800,
        ...
        "December": 18300
      }
    },
    ...
  ]
  ```

### 4. Max Turnover from a Single Retailer

Retrieves the maximum turnover each wholesaler received from a single retailer.

- **Endpoint**: `GET /api/wholesalers/max-turnover`
- **Example**: `http://localhost:3000/api/wholesalers/max-turnover`
- **Response**:
  ```json
  [
    {
      "wholesaler_id": 1,
      "wholesaler_name": "Wholesaler A",
      "max_turnover": 45000,
      "retailer_id": 2,
      "retailer_name": "Retailer Y"
    },
    ...
  ]
  ```

## Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sooraj-Krishnan/Sales-Admin-Panel.git
   cd Sales-Admin-Panel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following:

   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=wholesaler
   DB_DIALECT=mysql
   ```

4. **Setup the database**

   ```bash
   # Create the database
   mysql -u your_db_username -p
   CREATE DATABASE wholesaler;
   exit

   # Sequelize will handle table creation when you start the application
   ```

5. **Run the application**

   ```bash
   npm start
   ```

6. **Access the API**
   The API will be available at `http://localhost:3000/api/`

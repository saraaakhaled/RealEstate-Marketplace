# Real Estate Marketplace

A full-stack real estate marketplace backend that allows users to manage property listings with authentication, authorization, CRUD operations, and image uploads.

## Project Description

Real Estate Marketplace is a web application designed to connect property buyers and agents in one platform.

The system allows users to register and log in securely, while different user roles have different permissions. Agents can manage property listings, and buyers can browse available properties.

The backend is built with Node.js, Express.js, MongoDB, and Mongoose.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* Postman
* Git & GitHub

## User Roles

### Admin

* Manage users
* Manage properties
* Access protected resources

### Agent

* Create property listings
* View properties
* Update properties
* Delete properties
* Upload property images

### Buyer

* Register and login
* View available properties
* Access protected user resources

## Main Features

### Authentication

* User registration
* User login
* Password hashing using bcryptjs
* JWT token generation
* JWT token verification
* Protected routes

### Authorization

The application uses role-based authorization.

Different roles have different permissions when accessing protected resources.

Roles:

* Admin
* Agent
* Buyer

### Property CRUD

#### Create Property

```text
POST /api/properties
```

Creates a new property listing.

#### Get All Properties

```text
GET /api/properties
```

Returns all available properties.

#### Get Property By ID

```text
GET /api/properties/:id
```

Returns a specific property.

#### Update Property

```text
PATCH /api/properties/:id
```

Updates an existing property.

#### Delete Property

```text
DELETE /api/properties/:id
```

Deletes a property.

## Property Data

Each property contains:

* Title
* Description
* Price
* Property Type
* Listing Type
* Location
* Bedrooms
* Bathrooms
* Area
* Image

Supported property types:

* Apartment
* Villa
* House
* Office
* Land
* Chalet

Listing types:

* Sale
* Rent

## Image Upload

Property images are uploaded using Multer.

### Allowed File Types

* JPG
* JPEG
* PNG
* WEBP

Uploaded images are stored in the `uploads` folder and the image path is saved with the property data.

Example:

```text
image → property-image.png
```

## Authentication Routes

### Signup

```text
POST /api/auth/signup
```

Creates a new user and returns a JWT token.

### Login

```text
POST /api/auth/login
```

Authenticates an existing user and returns a JWT token.

### Profile

```text
GET /api/auth/profile
```

A protected route that requires a valid JWT token.

## Authorization

Protected requests use the following header:

```text
Authorization: Bearer <token>
```

The server verifies the JWT token before allowing access to protected resources.

Role-based authorization is used to restrict actions depending on the user's role.

## Postman Testing

The API was tested using Postman.

The following CRUD operations were tested:

1. Create Property
2. Get All Properties
3. Get Property By ID
4. Update Property
5. Delete Property

Screenshots are included in the `screenshots` folder.

### Screenshots

* Create Property
* Get All Properties
* Get Property By ID
* Update Property
* Delete Property

## UI Design

The application UI/UX was designed using Figma.

[Figma UI/UX Design](https://www.figma.com/make/SlgCYvRNYo0Kv9EdgT5SXo/EstateHub-UI-UX-Design?t=pzBapbnrGGLJVLLS-1&preview-route=%2Fabout%23agents)

## Project Structure

```text
entity-module/
│
├── middleware/
│   ├── authMiddleware.js
│   └── authorize.js
│
├── models/
│   ├── Property.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   └── propertyRoutes.js
│
├── screenshots/
│   ├── 01-create-property.png
│   ├── 02-get-all-properties.png
│   ├── 03-get-property-by-id.png
│   ├── 04-update-property.png
│   └── 05-delete-property.png
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Installation

Clone the repository and move into the project folder:

```bash
cd entity-module
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file inside the `entity-module` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Do not upload the `.env` file to GitHub.

## Run the Project

For development:

```bash
npm run dev
```

Or:

```bash
node server.js
```

The server will run on:

```text
http://localhost:3000
```

## API Base URLs

Authentication:

```text
http://localhost:3000/api/auth
```

Properties:

```text
http://localhost:3000/api/properties
```

## Project Learning Outcomes

Through this project, the following backend concepts were practiced:

* REST API development
* CRUD operations
* MongoDB database management
* Mongoose models
* Express.js routing
* User authentication
* Password hashing
* JWT authentication
* Protected routes
* Role-based authorization
* File and image uploads using Multer
* API testing using Postman
* Git and GitHub project organization
* UI/UX planning using Figma

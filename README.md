# EstateHub — Real Estate Marketplace

EstateHub is a full-stack real estate marketplace web application that allows users to browse properties, view property details, save favorites, contact agents, and manage their account.

Agents and Admins can also add and manage property listings with property images.

---

## Project Overview

EstateHub was built as a full-stack project using Angular for the frontend and Node.js, Express.js, and MongoDB for the backend.

The project focuses on:

* Real estate property browsing
* Property details and image galleries
* User authentication
* Role-based authorization
* Property management
* Multiple image upload
* Favorites
* Property inquiries
* Agent listing
* Customer dashboard

---

## UI/UX Design

The project UI/UX was designed using Figma.

**Figma Design:**

https://www.figma.com/make/SlgCYvRNYo0Kv9EdgT5SXo/EstateHub-UI-UX-Design?t=pzBapbnrGGLJVLLS-1&preview-route=%2Fabout%23agents

The design focuses on a clean, modern, and simple real estate experience.

---

## Technologies Used

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Angular Router
* Angular Forms
* HttpClient
* Standalone Components

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* CORS

### Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* MongoDB

---

## Main Features

### Authentication

* User registration
* User login
* JWT authentication
* Protected API routes
* User profile
* Password hashing using bcryptjs

---

### Role-Based Access

The system supports three roles:

#### Buyer

Buyers can:

* Browse properties
* View property details
* Add properties to favorites
* Contact agents
* Send property inquiries
* View their inquiries
* Manage their profile

#### Agent

Agents can:

* Browse properties
* Add new properties
* Upload property images
* Manage property listings
* View their account information

#### Admin

Admins have higher-level access to protected property management operations.

---

## Property Management

The application supports:

* Create property
* View all properties
* View property details
* Update property
* Delete property
* Property type
* Sale or Rent listing
* Location
* Price
* Bedrooms
* Bathrooms
* Area
* Description

Supported property types:

* Apartment
* Villa
* House
* Office
* Land
* Chalet

---

## Property Image Upload

EstateHub supports uploading multiple images for a property using **Multer**.

The first uploaded image is stored as the main property image.

Additional images are stored separately and displayed in the property details gallery.

The property details page provides:

* Main property image
* Image thumbnails
* Selectable image gallery

Uploaded images are served from the backend through:

```text
/uploads
```

---

## Property Search and Filtering

Users can browse properties and filter them by:

* Search text
* Property type
* Location
* Price range

The application also supports search navigation from the homepage.

---

## Favorites

Users can save properties to their favorites.

Favorites can be:

* Added
* Removed
* Viewed from the customer dashboard

Favorites are stored on the client side using Local Storage.

---

## Property Inquiries

Users can contact an agent about a property by sending an inquiry.

The inquiry system supports:

* Creating an inquiry
* Viewing the user's inquiries
* Displaying the related property
* Inquiry date
* Inquiry status

---

## Agents

The Agents page loads real agent information from the backend.

Each agent can display:

* Name
* Email
* Phone
* Agent role

Users can contact an agent through their email.

---

## Customer Dashboard

The customer dashboard provides:

* Welcome message
* Favorite properties count
* Active inquiries count
* Recently viewed properties
* Recent inquiries
* Navigation to customer features

---

## Pages

### Public / Main Pages

* Home
* Properties
* Property Details
* Agents
* About
* Login
* Register

### Customer Pages

* Dashboard
* Profile
* Favorites
* My Inquiries

### Property Management

* Add Property

---

## Main Routes

```text
/home
/properties
/properties/:id
/add-property
/agents
/about
/login
/register
/customer/dashboard
/customer/profile
/customer/favorites
/customer/inquiries
```

---

## Project Structure

```text
EstateHub
│
├── entity-module
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── authorize.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Property.js
│   │   └── Inquiry.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   └── inquiryRoutes.js
│   │
│   ├── uploads
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── estate-hub
    │
    ├── src
    │   │
    │   ├── app
    │   │   │
    │   │   ├── core
    │   │   │   └── services
    │   │   │       ├── auth.ts
    │   │   │       ├── property.ts
    │   │   │       └── inquiry.ts
    │   │   │
    │   │   ├── features
    │   │   │   ├── home
    │   │   │   ├── properties
    │   │   │   ├── agents
    │   │   │   ├── about
    │   │   │   ├── auth
    │   │   │   └── customer
    │   │   │
    │   │   └── shared
    │   │       └── components
    │   │
    │   └── styles.css
    │
    ├── angular.json
    ├── package.json
    └── README.md
```

---

## Backend API

### Authentication

#### Register

```text
POST /api/auth/signup
```

#### Login

```text
POST /api/auth/login
```

#### Get Profile

```text
GET /api/auth/profile
```

Requires JWT authentication.

#### Get Agents

```text
GET /api/auth/agents
```

---

### Properties

#### Get All Properties

```text
GET /api/properties
```

Requires authentication.

#### Get Property

```text
GET /api/properties/:id
```

Requires authentication.

#### Create Property

```text
POST /api/properties
```

Requires:

* JWT authentication
* Admin or Agent role

Supports:

* Property information
* Main image
* Additional images

#### Update Property

```text
PATCH /api/properties/:id
```

Requires Admin or Agent authorization.

#### Delete Property

```text
DELETE /api/properties/:id
```

Requires Admin authorization.

---

### Inquiries

#### Create Inquiry

```text
POST /api/inquiries
```

Requires authentication.

#### Get My Inquiries

```text
GET /api/inquiries/my
```

Requires authentication.

---

## Authentication Flow

The authentication system uses JWT.

After successful login:

1. The backend verifies the email and password.
2. The password is checked using bcryptjs.
3. A JWT token is generated.
4. The frontend stores the token in Local Storage.
5. Protected requests send the token using the Authorization header.

Example:

```text
Authorization: Bearer <token>
```

---

## Image Upload Flow

Property images are uploaded using `multipart/form-data`.

The frontend creates a `FormData` object and sends:

```text
image
images
```

The backend receives the files through Multer.

The first image is used as the main image and the remaining images are stored as additional property images.

---

## Database

MongoDB is used as the database.

Main collections:

```text
users
properties
inquiries
```

Mongoose is used to define schemas and communicate with MongoDB.

---

## Environment Variables

The backend requires environment variables such as:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

---

## Running the Project

### 1. Start the Backend

Open a terminal:

```powershell
cd entity-module
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

---

### 2. Start the Frontend

Open another terminal:

```powershell
cd estate-hub
ng serve
```

The Angular application normally runs on:

```text
http://localhost:4200
```

---

## Testing

The backend APIs can be tested using Postman.

Important endpoints to test:

```text
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/profile

GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id

POST   /api/inquiries
GET    /api/inquiries/my
```

For property creation with images, use:

```text
Body → form-data
```

and include the property information together with the image files.

---

## Security

The project includes:

* Password hashing using bcryptjs
* JWT authentication
* Protected routes
* Role-based authorization
* Password exclusion from profile and agent responses
* Environment variables for sensitive configuration

---

## Future Improvements

Possible future improvements include:

* Admin dashboard
* Agent dashboard
* Property editing interface
* Advanced property search
* Map integration
* Property reviews
* Appointment scheduling
* Cloud image storage
* Pagination
* Improved form validation
* Production deployment

---

## Project Status

**Completed**

The current version includes the main frontend, backend, authentication, property management, image upload, favorites, inquiries, agent listing, customer dashboard, and responsive UI.

---

## Author

**Sara Khaled**

GitHub:

```text
https://github.com/saraaakhaled
```

---

## License

This project was created for educational and portfolio purposes.

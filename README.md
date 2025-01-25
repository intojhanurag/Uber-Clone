# User Registration API Documentation

## Endpoint: `/user/register`

### Description
This endpoint is used for registering a new user in the system. It accepts user details like **fullname**, **email**, and **password**, and returns a **JWT token** along with the user object upon successful registration.

### Method: `POST`

### Request Body

The request body must be in JSON format, and it should include the following fields:

- **fullname** (Object):
    - `firstname` (String): The first name of the user. It must be at least 3 characters long.
    - `lastname` (String): The last name of the user. It must be at least 3 characters long.

- **email** (String): The email address of the user. It must be a valid email format and at least 5 characters long.

- **password** (String): The password for the user account. It must be at least 6 characters long.

### Example Request Body:

{ "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "john.doe@example.com", "password": "password123" }


### Response

#### On Success (Status Code: 201)

- **Response Body:**
  - `token` (String): The JWT token used for user authentication.
  - `user` (Object): The created user object containing the `firstname`, `lastname`, `email`, and other relevant information.

{ "token": "your_jwt_token", "user": { "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "john.doe@example.com" } }



#### On Error (Status Code: 400)

- **Response Body:**
  - `errors` (Array): An array of validation errors, with detailed messages.

{ "errors": [ { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }, { "msg": "Email must be at least 5 characters long", "param": "email", "location": "body" }, { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" } ] }

### Status Codes:

- **201 Created**: The user was successfully registered.
- **400 Bad Request**: The request failed due to validation errors or missing required fields.

### Required Data:

1. **fullname**:
    - `firstname` (String): At least 3 characters long.
    - `lastname` (String): At least 3 characters long.
2. **email** (String): Must be a valid email and at least 5 characters long.
3. **password** (String): Must be at least 6 characters long.

### Error Messages:

- `"First name must be at least 3 characters long"`: This error occurs when the `firstname` field is less than 3 characters.
- `"Last name must be at least 3 characters long"`: This error occurs when the `lastname` field is less than 3 characters.
- `"Invalid Email"`: This error occurs when the `email` field is not a valid email address.
- `"Password must be at least 6 characters long"`: This error occurs when the `password` is less than 6 characters.

---

### Example Usage:

**Request:**

curl -X POST http://localhost:4000/user/register
-H "Content-Type: application/json"
-d '{ "fullname": {"firstname": "John", "lastname": "Doe"}, "email": "john.doe@example.com", "password": "password123" }'


**Response (Success):**

{ "token": "your_jwt_token", "user": { "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "john.doe@example.com" } }

javascript
Copy code

**Response (Error):**

{ "errors": [ { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" } ] }

---

### Notes:
- Make sure to send the correct **Content-Type** as `application/json`.
- The password is hashed before storing in the database, 

# Endpoint Documentation: `/user/login`

## Description
This endpoint allows registered users to log in by validating their email and password. Upon successful authentication, it returns a JSON Web Token (JWT) for secure access to protected resources.

---

## Request
### Method: `POST`
### URL: `/user/login`
### Headers:
- `Content-Type: application/json`

### Request Body:
```json
{
  "email": "test@test.com",
  "password": "test_password"
}
Field	Type	Required	Description
email	string	Yes	The registered email address of the user.
password	string	Yes	The password associated with the email.
Response
Success Response:
Status Code: 200 OK
Body:
json
Copy code
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "test@test.com",
    "socketId": null
  }
}
Error Responses:
Validation Error:
Status Code: 400 Bad Request Body:

json
Copy code
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
Invalid Credentials:
Status Code: 401 Unauthorized Body:

json
Copy code
{
  "message": "Invalid email or password"
}
Validation Rules:
email: Must be a valid email format.
password: Required field.
Error Handling
Missing or invalid fields in the request body will return a 400 Bad Request status with specific validation errors.
Incorrect email or password will result in a 401 Unauthorized status with an appropriate error message.



# API Endpoints

## GET /users/profile

- **Description**: 
  - Retrieves the profile of the currently authenticated user.
  
- **Access**: 
  - Private (Requires a valid JWT token)

- **Headers**: 
  - `Authorization: Bearer <token>`

- **Response**:
  - **200 OK**: Returns the user profile data (name, email, createdAt, etc.)
  
  Example:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
GET /users/logout
Description:

Logs out the user by clearing the JWT token cookie and blacklisting the token.
Access:

Private (Requires a valid JWT token)
Headers:

Authorization: Bearer <token>
Response:

200 OK: Returns a message indicating the user has been logged out.
Example:

json
Copy code
{
  "message": "Logged Out"
}
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
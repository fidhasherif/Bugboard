# BugBoard 🐞

A bug tracking app built with the MERN stack (MongoDB, Express, React, Node.js).
I'm a QA engineer by background, so I built the kind of tool I wished I had.

## Tech Stack
- Node.js and Express (backend)
- MongoDB Atlas with Mongoose (database)
- JWT and bcrypt (authentication)
- React (frontend, in progress)

## Features
- [x] User signup with hashed passwords
- [x] User login with JWT
- [x] Protected routes using middleware
- [ ] Projects
- [ ] Bug CRUD (create, read, update, delete)
- [ ] Dashboard
- [ ] React frontend

## API Endpoints
| Method | Route | Description | Protected |
|---|---|---|---|
| POST | /api/auth/signup | Create a new account | No |
| POST | /api/auth/login | Log in and receive a token | No |
| GET | /api/auth/me | Get the logged-in user | Yes |

## Test Cases

| # | Test | Expected | Actual | Result |
|---|---|---|---|---|
| 1 | Login with correct details | Token and user info | Token and user info | Pass |
| 2 | Login with wrong password | Invalid email or password | Invalid email or password | Pass |
| 3 | Login with unregistered email | Invalid email or password | Invalid email or password | Pass |
| 4 | Login with empty fields | Email and password are required | Email and password are required | Pass |
| 5 | Sign up with an existing email | Email already registered | Email already registered | Pass |
| 6 | GET /me with a valid token | User info without password | User info without password | Pass |
| 7 | GET /me with no token | No token, access denied | No token, access denied | Pass |
| 8 | GET /me with a fake token | Invalid or expired token | Invalid or expired token | Pass |
| 9 | GET /me with a tampered token | Invalid or expired token | Invalid or expired token | Pass |

## How to Run Locally
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with `MONGO_URI` and `JWT_SECRET`
4. Run `node server.js`

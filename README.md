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
- [x] Only the reporter can update or delete their bug
- [x] React frontend: login, bug list, add, mark fixed, delete
- [ ] Projects
- [x] Bug CRUD (create, read, update, delete)
- [ ] Dashboard
- [ ] React frontend

## API Endpoints
| Method | Route | Description | Protected |
|---|---|---|---|
| POST | /api/auth/signup | Create a new account | No |
| POST | /api/auth/login | Log in and receive a token | No |
| GET | /api/auth/me | Get the logged-in user | Yes |

| POST | /api/bugs | Create a new bug | Yes |
| GET | /api/bugs | List all bugs, newest first | Yes |
| PATCH | /api/bugs/:id | Update a bug's status | Yes |
| DELETE | /api/bugs/:id | Delete a bug | Yes |
| PATCH | /api/bugs/:id | Update a bug's status (reporter only) | Yes |
| DELETE | /api/bugs/:id | Delete a bug (reporter only) | Yes |
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
| 10 | Create a bug with valid details | Bug saved with status Open | Bug saved with status Open | Pass |
| 11 | Create a bug with no title | Title is required | Bug validation failed: title is required | Pass |
| 12 | Create a bug with no token | No token, access denied | No token, access denied | Pass |
| 13 | List all bugs | Array of bugs, newest first | Array of bugs, newest first | Pass |
| 14 | Update status to Fixed | Bug returned with status Fixed | Bug returned with status Fixed | Pass |
| 15 | Update status to an invalid value (Done) | Validation error | Done is not a valid enum value | Pass |
| 16 | Delete an existing bug | Bug deleted | Bug deleted | Pass |
| 17 | Update another user's bug | Not allowed (403) | Not allowed (403) | Pass |
| 18 | Delete another user's bug | Not allowed (403) | Not allowed (403) | Pass |
| 19 | Delete your own bug | Bug deleted | Bug deleted | Pass |
| 20 | Login from the React page with a wrong password | Invalid email or password shown | Invalid email or password shown | Pass |



## How to Run Locally
1. Clone the repo
2. Run `npm install` in the main folder, then create a `.env` file with `MONGO_URI` and `JWT_SECRET`
3. Run `node server.js` (backend, port 5001)
4. In a second terminal: `cd frontend`, `npm install`, `npm run dev` (frontend, port 5173)


## Known Issues / Next Steps
- The page shows nothing when the backend says "Not allowed" (403)
- No signup page in the frontend yet (signup works through the API)
- Projects and dashboard
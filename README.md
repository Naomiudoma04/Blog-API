# Blog API

A REST API for managing users and their blog posts. It uses Express, Sequelize, and MySQL.

## Requirements

- Node.js and npm
- MySQL

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a MySQL database, then create a `.env` file in the project root with:

   ```env
   PORT=3838
   DB_HOST=127.0.0.1
   DB_NAME=blog_api
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   ```

   Use your local MySQL host, database name, and credentials. Keep `.env` private; it is excluded from Git.

3. Run the database migrations:

   ```bash
   npm run migrate
   ```

4. Start the API:

   ```bash
   npm run dev
   ```

   Or start it without nodemon:

   ```bash
   npm start
   ```

The API listens on the port configured by `PORT` (the examples below use `http://localhost:3838`).

## API endpoints

All endpoints use JSON request and response bodies. User and post IDs are UUIDs.

### Users

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/createUser` | Create a user |
| `GET` | `/userList` | List users |
| `GET` | `/getUser/:id` | Get a user and their posts |
| `PUT` | `/updateUser/:id` | Update a user |
| `DELETE` | `/deleteUser/:id` | Delete a user and their posts |

Create a user with `POST /createUser`:

```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada@example.com",
  "gender": "Female"
}
```

`gender` must be `Male` or `Female`. The successful response includes the new user's UUID in `data.id`.

### Posts

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/createPost/:userId` | Create a post for the user UUID in the URL |
| `GET` | `/postList` | List posts |
| `GET` | `/getPost/:postId` | Get a post and its author |
| `PUT` | `/updatePost/:postId` | Update a post |
| `DELETE` | `/deletePost/:postId` | Delete a post |

Create a post using the user's UUID returned by `/createUser`:

```http
POST /createPost/USER_UUID
Content-Type: application/json
```

```json
{
  "title": "My first post",
  "content": "Hello, world!"
}
```

The response includes the new post UUID in `data.id`. Use this **post UUID** for get, update, and delete operations; those routes do not take a user UUID.

Update a post with `PUT /updatePost/POST_UUID`:

```json
{
  "title": "Updated title",
  "content": "Updated post content"
}
```

## Data relationships

- A user can have multiple posts; each post belongs to one user.
- Deleting a user removes their posts in the same database transaction.
- User email addresses must be unique.

## NPM scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the server |
| `npm run dev` | Start the server with nodemon |
| `npm run migrate` | Apply Sequelize migrations |
| `npm run undo:migrate` | Undo all Sequelize migrations |

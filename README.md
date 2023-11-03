## 	:toolbox: Getting Started  
Clone Repository:
```bash
git clone https://github.com/Nikita-Shah7/Book-Store-with-MERN.git
```

Go to project Directory:
```bash
cd <project-dir>
```

Install dependencies:
```bash
cd ./frontend
npm install

cd ../backend
npm install

cd ../backend-PgSQL
npm install
```

`Make changes in config.js file with appropriate credentials.`

#### Start Backend Server:
| Database | Command |
| :-------- | :--------- |
| **MongoDB** | `cd backend` `npm run dev` |
| **Postgres** | `cd backend-PgSQL` `npm run dev` |

#### Start Frontend Client:
```bash
cd frontend
npm run dev
```

`FRONTEND URL : http://localhost:5173`  
`BACKEND URL : http://localhost:5555`

#### Admin credentials:
`Username: nik1`  
`Password: nik1`  

#### User Login credentials
`Username: mok2`  
`Password: mok2`  

## API Reference:

<!-- 
#### Get all Books

```http
  GET /books
```
#### Get a Book

```http
  GET /books/${id}
```
#### Create a Book

```http
  POST /books
```
#### Update a Book

```http
  PUT /books/${id}
```
#### Delete a Book
```http
  DELETE /books/${id}
```
 -->


#### Books: 
|Operation| METHOD & End-point  |
| :-------- | :------- |
|Get all books| `GET /books` |
|Get a book| `GET /books/${id}` |
|Create a book| `POST /books` |
|Update a book| `PUT /books/${id}` |
|Delete a book| `DELETE /books/${id}` | 

**Note:** Only authorized user i.e. admin can perform deletion operation.


#### Users: 
|Operation| METHOD & End-point  |
| :-------- | :------- |
|Get all users| `GET /user` |
|Get a user| `GET /user/${id}` |
|Create a user| `POST /user` |
|Update a user| `PUT /user/${id}` |
|Delete a user| `DELETE /user/${id}` |  

#### Admin:

|Operation| METHOD & End-point  |
| :-------- | :------- |
|Get all admin| `GET /admin` |
|Get a admin| `GET /admin/${id}` |
|Create a admin| `POST /admin` |
|Update a admin| `PUT /admin/${id}` |
|Delete a admin| `DELETE /admin/${id}` |








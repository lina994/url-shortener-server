
<p align="center">
  <img src="https://i.postimg.cc/Prk8YjVq/logo.png" alt="Logo" width="400"/>
</p>

<h1 align="center">
  URL2Link - URL Shortener Server
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/npm-v8.4.0-blue" alt="npm version"/>
  <img src="https://img.shields.io/badge/node-v16.13.2-blue" alt="node version"/>
  <img src="https://img.shields.io/badge/PostgreSQL-v14.2.1-blue" alt="PostgreSQL version"/>
</p>

- Link shorteners work by transforming any long URL into a shortened link.
- When a user clicks the shortened link, they’re automatically forwarded to the destination URL.

## Features

- Create shortened links.
- Sign-up, Log-in.
- Custom links for authorized users. (create, update, delete).
- Check the amount of clicks that your shortened url received. (authorized users)
- redirect to destination URL.

## Server Deploy

https://url-2-link.herokuapp.com/

## Client Code

https://github.com/lina994/url-shortener-client

## Quick Start

### Download Server

```
git clone https://github.com/lina994/url-shortener-server.git
cd url-shortener-server
npm install
```

### Add Environment File

File name: `.env`  
File location: `url-shortener-server` directory

```
PORT = your_port
DB_NAME = your_database_name
DB_USER = your_database_username
DB_PASSWORD = your_database_password
DB_HOST = your_database_host
DB_PORT = your_database_port
NODE_ENV = development (or production)
SECRET_KEY = your_secret_key_for_jwt
```

### Available Scripts

#### `npm start`

## API

### Redirect (link)

GET /r/:slug

Example: 
  - url: https://url-2-link.herokuapp.com/r/aaaab

### Redirect (custom link)

GET /:slug

Example: 
  - url: https://url-2-link.herokuapp.com/aaaab

### Shorten a url (link)

POST /api/shorten

Converts a long url to a short link.

Request Body Schema:
- longUrl, string (Required)

Response:

```
{
  "id": "integer",
  "url": "string",
  "shortLink": "string",
  "updatedAt": "Date",
  "createdAt": "Date"
}
```

Example:

  request:

  url: https://url-2-link.herokuapp.com/api/shorten

  body:

```
{
  "longUrl": "https://www.google.com"
}
```

  response:

```
{
  "id": 1,
  "url": "www.google.com",
  "updatedAt": "2022-02-12T08:14:06.014Z",
  "createdAt": "2022-02-12T08:14:06.014Z",
  "shortLink": "url-2-link.herokuapp.com/r/slug"
}
```

### Shorten a url (custom link)

POST /api/custom/shorten

Converts a long url to a custom short link.

- Token (required)

Request Body Schema:
- longUrl, string (Required)
- slug, string (Required)
- title, string (optional)

Response:

```
{
  "clicks": "int",
  "id": "int",
  "url": "string",
  "slug": "string",
  "title": "string",
  "userId": "int",
  "shortLink": "string",
  "updatedAt": "date",
  "createdAt" "date"
}
```

Example: 

url: https://url-2-link.herokuapp.com/api/custom/shorten

body: 

```
{
  "longUrl": "https://www.google.com",
  "slug": "slug7",
  "title": "google"
}
```

response:

```
{
  "clicks": 0,
  "id": 7,
  "url": "https://www.google.com",
  "slug": "slug7",
  "title": "google",
  "updatedAt": "2022-02-12T09:24:09.615Z",
  "createdAt": "2022-02-12T09:24:09.608Z",
  "userId": 1,
  "shortLink": "url-2-link.herokuapp.com/slug7"
}
```


### Retrieve a url (link)

GET /api/shorten?slug={slug}

Returns long url for the specified slug.

Response:
```
{
  "id": "int",
  "url": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

Example: 
  request:
    - url: https://url-2-link.herokuapp.com/api/shorten?slug=aaaab

  response:

```
{
  "id": 1,
  "url": "www.google.com",
  "createdAt": "2022-02-12T08:14:06.014Z",
  "updatedAt": "2022-02-12T08:14:06.014Z"
}
```


### Retrieve a url (custom link)

GET /api/custom/shorten?slug7={slug}

Returns long url for the specified slug.

Response:
```
{
  "longUrl": "string"
}
```

Example: 

url: https://url-2-link.herokuapp.com/api/custom/shorten?slug=slug7

Repsonse:

```
{
  "url": "https://moovitapp.com/"
}
```

### Update custom link

PUT /api/custom/shorten

Update custom short link record.

- Token (required)

Request Body Schema:
- id, integer (Required)
- longUrl, string (optional)
- slug, string (optional)
- title, string (optional)

Response:

```
{
  "clicks": "int",
  "id": "int",
  "url": "string",
  "slug": "string",
  "title": "string",
  "userId": "int",
  "shortLink": "string",
  "updatedAt": "date",
  "createdAt" "date"
}
```

Example: 

url: https://url-2-link.herokuapp.com/api/custom/shorten

body: 

```
{
  "id": 4,
  "longUrl": "https://www.google.com",
  "slug": "slug7",
  "title": "google"
}
```

response:

```
{
  "clicks": 0,
  "id": 4,
  "url": "https://www.google.com",
  "slug": "slug7",
  "title": "google",
  "updatedAt": "2022-02-12T09:24:09.615Z",
  "createdAt": "2022-02-14T09:24:09.608Z",
  "userId": 1,
  "shortLink": "url-2-link.herokuapp.com/slug7"
}
```


### Delete custom link

DELETE /api/custom/shorten/:slug

Delete custom short link record.

- Token (required)

Example: 
  - url: http://localhost:3001/api/custom/shorten/7


### Dashboard

GET /api/custom/dashborad

Returns all user links.

- Token (required)

Response:

```
[
  {
    "id": "integer",
    "url": "string",
    "slug": "string",
    "title": "string",
    "clicks": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "userId": "integer"
  }
]
```

Example: 

url: https://url-2-link.herokuapp.com/api/custom/dashborad

response:

```
[
  {
    "id": 3,
    "url": "https://www.google.com/",
    "slug": "slug2",
    "title": "google",
    "clicks": 0,
    "createdAt": "2022-03-04T02:15:10.808Z",
    "updatedAt": "2022-03-04T02:15:10.810Z",
    "userId": 1
  }
]
```

### Registration

POST /api/user/registration

Request Body Schema:
- username, string (Required)
- password, string (Required)

Response:
```
{
  "token": "string"
}
```

Example: 

  request:

  url: https://url-2-link.herokuapp.com/api/user/registration

  body: 

```
  {
    "username": "user2",
    "password": "pass2"
  }
```

  response:

```
  {
    "token": "eyJhbGci..."
  }
```


### Login

POST /api/user/login

Request Body Schema:
- username, string (Required)
- password, string (Required)

Response:
```
{
  "token": ""
}
```

Example: 

  request:

  url: https://url-2-link.herokuapp.com/api/user/login

  body: 

```
  {
    "username": "user2",
    "password": "pass2"
  }
```

  response:

```
  {
    "token": "eyJhbGci..."
  }
```

### Update password

PUT /api/user/password

Update user password.

- Token (required)

Request Body Schema:
- password, string (Required)
- newPassword, string (Required)

Response:
```
{
  "token": "string"
}
```

Example: 

  request:

  url: https://url-2-link.herokuapp.com/api/user/password

  body: 

```
  {
    "password": "pass1",
    "newPassword": "pass211"
  }
```

  response:

```
  {
    "token": "eyJhbGci..."
  }
```


## Database (sequelize)

Associations:

User.hasMany(CustomShortLink);
CustomShortLink.belongsTo(User);

### User (user)


```
  user.getCustom_short_links()
  user.setCustom_short_links()
  user.addCustom_short_links()
  user.addCustom_short_link()
  user.createCustom_short_link()
  user.removeCustom_short_link()
  user.removeCustom_short_links()
  user.hasCustom_short_link()
  user.hasCustom_short_links()
  user.countCustom_short_links()
```

### CustomShortLink (custom_short_link)


```
custom_short_link.getUser()
custom_short_link.setUser()
custom_short_link.createUser()
```

### ShortLink (short_link)



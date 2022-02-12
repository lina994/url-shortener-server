# URL shortener Server

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
  "id": "",
  "url": "string"
  "shortLink": "string"
  "updatedAt"
  "createdAt"
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
  "shortLink": "url-2-link.herokuapp.com/r/aaaab"
}
```

### Shorten a url (custom link)

POST /api/custom/shorten

Converts a long url to a custom short link.

- Token (required)

Request Body Schema:
- longUrl, string (Required)
- slug, string (Required)

Response:

```
{
  "id": "int",
  "url": "string",
  "slug": "string",
  "userId": "int"
  "shortLink": "string"
  "updatedAt"
  "createdAt"
}
```

Example: 

url: https://url-2-link.herokuapp.com/api/custom/shorten

body: 

```
{
  "longUrl": "https://www.google.com",
  "slug": "aaaab"
}
```

response:

```
{
  "id": 7,
  "url": "https://moovitapp.com/",
  "slug": "slug7",
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
  "createdAt",
  "updatedAt"
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
  "id": "",
  "longUrl": "string"
}
```

Example: 

url: https://url-2-link.herokuapp.com/api/custom/shorten?slug=slug7

Repsonse:

```
{
  "id": 7,
  "url": "https://moovitapp.com/",
  "slug": "slug7",
  "createdAt": "2022-02-12T09:24:09.608Z",
  "updatedAt": "2022-02-12T09:24:09.615Z",
  "userId": 1
}
```

### Registration

POST /api/user/registration

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




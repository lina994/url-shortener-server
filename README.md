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
```

### Available Scripts

#### `npm start`

## API

### Redirect

GET /:shortLink

Example: 
  - url: https://url-2-link.herokuapp.com/aaaab

### Shorten a url

POST /api/shorten

Converts a long url to a short link.

Request Body Schema:
- longUrl, string (Required)

Response:
```
{
  "id": "",
  "shortLink": "string"
}
```

Example: 
  - url: https://url-2-link.herokuapp.com/api/shorten
  - body: 
    {
      "longUrl": "https://www.google.com"
    }


### Retrieve a url

GET /api/shorten/{shortLink}

Returns long url for the specified short link.

Response:
```
  "id": "",
  "longUrl": "string"
```

Example: 
  - url: https://url-2-link.herokuapp.com/api/shorten?shortLink=aaaab



# URL shortener Server

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
```

### Available Scripts

#### `npm start`

## API

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

### Retrieve a url

GET /api/shorten/{shortLink}

Returns long url for the specified short link.

Response:
```
  "id": "",
  "longUrl": "string"
```


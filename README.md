# Amazon Wishlist API

This is the API that will scrapes Amazon.com's servers for items and sends the data back as JSON.

## Requirements

- NodeJS 12.13.1
- Internet Connection

## Local Setup Instructions

### 1. Installing Node Version With NVM

```bash
nvm install;
```

### 2. Installing Depdendencies

```bash
yarn install; # npm install
```

### 3. Start Server

```bash
yarn start; # npm start
```

## Testing Endpoint

Testing if the server works, you can perform `curl` request or open it up in your browser:

**Request:**

`GET` http://localhost:5000

```bash
curl http://localhost:5000;
```

**Expected Result:**

```json
{ "version": "1.0.0" }
```

**Request:**

`GET` http://localhost:5000/?q=burrito

```bash
curl http://localhost:5000/search\?q=burrito
```

**Expected Result:**

```json
{
  "data": [
    {
      "name": "Throw Throw Burrito by Exploding Kittens - A Dodgeball Card Game - Family-Friendly Party Games - Card Games for Adults, Teens & Kids",
      "url": "/Throw-Burrito-Dodgeball-Exploding-Kittens/dp/B07TS96J7Q/ref=sr_1_1?dchild=1&keywords=burrito&qid=1586638633&sr=8-1",
      "image": "https://m.media-amazon.com/images/I/61qT2Psk-AL._AC_UL320_ML3_.jpg",
      "price": "24.99"
    }
  ]
}
```

## Explanation Of Additional Files

Used for Node Version Manager

```bash
.nvmrc
```

Used By Visual Studio Code to auto format code for spacing and more

```bash
.vscode/settings.json
```

# client-request-inspector

![npm](https://img.shields.io/npm/v/client-request-inspector)
![npm](https://img.shields.io/npm/dt/client-request-inspector)
![NPM](https://img.shields.io/npm/l/client-request-inspector)
[![Coverage](https://github.com/iheb15M/client-request-inspector/actions/workflows/coverage.yml/badge.svg)](https://github.com/iheb15M/client-request-inspector/actions/workflows/coverage.yml)

## Overview

`client-request-inspector` is a Node.js library designed for efficient server-side extraction of client data,
providing easy access to information such as `IP address`, `browser type`, and `location` to enhance the development experience for seamless web applications.


## Features

- Server-side client data extraction
- Support for IP address, browser type, and location
- Designed for use in web development projects
- Seamless integration with Express.js 


> [!TIP]
> To test the lib locally use [ngrok](https://ngrok.com/)

## Installation

You can install `client-request-inspector` via npm or yarn. 

```bash
npm install client-request-inspector
# or
yarn add client-request-inspector
```
## Usage
```javascript
const express = require('express');
const app = express();
const port = 3000;

// Import the library
const {clientInspector} = require('client-request-inspector');

app.get('/', async (req, res) => {
    // use client inspector
    const data = await clientInspector(req);
    res.send(data);
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

```

## Return Type Format

The `clientInspector` function returns an object with the following format:


|  Property  |     Type      |                                    Description                                    |
|:----------:|:-------------:|:---------------------------------------------------------------------------------:|
|     ip     |   `string`    |                             IP address of the client                              |
|  browser   |   `string`    |                     User agent string identifying the browser                     |
|  location  |   `Object`    | Object containing location information (isoCode, country, continent and timezone) |


### Exemple:

```javascript
{
    ip: "197.2.183.18",
        browser: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
        location: {
            isoCode: "TN",
            country: "Tunisia",
            continent: "Africa",
            timeZone: "Africa/Tunis"
    }
}

```

<div align="center">

#### Social Links
[![LinkedIn](https://img.shields.io/badge/LinkedIn-iheb--mejri-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/iheb-mejri/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-brightgreen?logo=github)](https://github.com/iheb15M/client-request-inspector)

</div>

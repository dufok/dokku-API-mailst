# Mail API for Postfix Server on Dokku
**Overview**
This repository contains a RESTful API built with Node.js and Express.js. The API serves as an intermediary layer between a Next.js application and a Postfix mail server. It allows the Next.js application to send emails using different user accounts on the Postfix server.

# Technologies Used
- Node.js
- Express.js
- Nodemailer
- Docker
- Dokku
# Setup
**Prerequisites**
- Node.js and npm installed
- Docker installed
- Dokku installed on your server

# Installation
- Clone the repository:

```bash
git clone https://github.com/your-repo/my-mail-api.git
```

- Navigate to the project directory:

```bash
cd my-mail-api
```

- Install dependencies:

```bash
npm install
```

# Running the API
**Without Docker (Locally)**
Run the API using Node.js:

``` bash
node app.js
```

**With Docker (Locally)**

- Build the Docker image:

```bash
docker build -t my-mail-api .
```

- Run the Docker container:

```bash
docker run -p 3000:3000 my-mail-api
```

# Deploying with Dokku
- SSH into your Dokku server.

- Create a new Dokku app:

```bash
dokku apps:create my-mail-api
```
- Generating an API Key
An API key is used to authenticate requests made to this service. You can generate an API key using various methods. One simple way is to use Node.js to generate a random string:
```bash
const crypto = require('crypto');

const apiKey = crypto.randomBytes(20).toString('hex');
console.log(apiKey);
```
This will generate a 40-character hexadecimal string that you can use as your API key.

- Set the API key as an environment variable on your Dokku server:

```bash
dokku config:set my-mail-api API_KEY=your-api-key
```
In the application, this environment variable is accessed as process.env.API_KEY.

- Add remote Dokku repository:

```bash
git remote add dokku dokku@your-dokku-server:my-mail-api
```

- Deploy the app to Dokku:

```bash
git push dokku master
```

# Features
**Localhost Setup**
If the API and the Postfix server are running on the same physical or virtual machine, you can use localhost as the host in the Nodemailer transport configuration.

**Dynamic User Authentication**
The API is designed to handle multiple users across multiple domains. Each request to send an email should include the user and pass fields to specify which email account should be used for sending. This allows for dynamic user authentication.

```json
{
  "to": "recipient@example.com",
  "subject": "Hello",
  "html": "<h1>Hello</h1>",
  "user": "user@example.com",
  "pass": "password"
}
```
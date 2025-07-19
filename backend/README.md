# Attention

This folder contain backend files for this project

PostgreSQL is used for this project database

Add .env file on project root that contain these variable:

```.env
DB_HOST=string // Ip address of your db
DB_NAME=string // Name of your db
DB_PORT=string // Port where your db listen to
DB_USERNAME=string // Your db username
DB_PASSWORD=string // Your db password
NODE_PORT=int // Port where you node listen to
```

Run `dotenvx encrypt` command on your terminal to encrypt your .env

Run the project with `dotenvx run -- node app.js`

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

Make sure you have postgre installed, then run this code `dotenvx run -- npx drizzle-kit push --config=./src/database/drizzle/drizzle.config.ts` to add new schema, table, and column into your new database

For dev, run the project with dotenvx run -- npx nodemon --watch . --ext ts,js --exec tsx app.ts

For prod, run the project with `dotenvx run -- node app.js`

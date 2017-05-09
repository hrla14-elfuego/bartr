# Bartr

Bartr is a peer to peer networking app that allows users to exchange services for services. In today's economy, there are countless individuals with valuable skills who are unable to make use of said skills. We serve to answer today's economic issue by providing the opportunity for talented individuals to exercise their skills in exchange for goods or services.

## Getting Started

1) `npm install || yarn` Install the necessary dependencies

2) `gulp seed` Create the database, create the schema, seed the database

3) `gulp` Runs nodemon, watches the database definition for schema changes, watches the seed data for seed data changes, and runs webpack with hot reload

4) Open localhost:8080 in your desired browser to get started!

## Development environment

Webpack-dev-server runs on port 8080, node runs on port 5000. You will need API keys for Auth0 to run this app. The app expects the keys to be in a .env file in the project root, they are loaded by gulp before starting nodemon and loaded by webpack before compiling the bundle.

The app uses a SQLite database for local development but was also deployed to Heroku with a Heroku Postgres database for production. When changing the database schema you may need to delete the SQLite file and let the seed script recreate it from scratch.

`sqlite server/db/bartr.sqlite3 sqlite3` Run SQLite3 to view the database in local dev environment

### Technology Used

- React

- React Router

- React Redux

- Redux Saga

- Webpack Hot Reload

- Auth0 Lock

- Gulp

- Node

- Express

- SQlite3

- Sequelize

- PostgreSQL

- Google Maps API

## Deployment

Deployed on Heroku

Access our app on bartr.life

## Built With

* [React](https://facebook.github.io/react/docs/hello-world.html) & [Redux](https://github.com/reactjs/react-redux)
* [Node + Express](https://expressjs.com/)
* [SQLite3](https://www.sqlite.org/) & [Sequelize](https://doclets.io/sequelize/sequelize/doclets) & [PostgreSQL](https://www.postgresql.org/)

## Authors

* **Justin Kang** - *Product Owner* - [J6K](https://github.com/j6k)
* **Shak Kaleemi** - *Scrum Master* - [Shakahs](https://github.com/shakahs)
* **Jason Kim** - *Lead Developer* - [jtk3068](https://github.com/jtk3068)
* **Joe Kim** - *Lead Developer* - [joeekimm](https://github.com/joeekimm)

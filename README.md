# NestJS API Project

## Description.

This project is an API developed using NestJS, TypeScript, and PostgreSQL. It includes user authentication, token management, and a basic framework for extending functionality.

## Requirements

- Node.js (version specified in package.json)
- Docker and Docker Compose
- PostgresSQL

## Setup.

1. Clone the repository:


git clone [https://github.com/Alex1stTry/project-test-day-1]
   cd [project-back-day-1]


2. Install the dependencies:


npm install


3. Configure the environment variables:
    - Copy environments/local.env.example to environments/local.env.
    - Edit environments/local.env according to your settings

## Starting the database

Start PostgreSQL using Docker:

npm run start:docker:db

## Database migrations

Use the following commands to manage your database schema:

- Create a new migration:


npm run migration:create --name=MigrationName


- Generating a migration based on changes to entities:


npm run migration:generate --name=MigrationName


- Application of migrations:


npm run migration:run


- Rollback of the last migration:


npm run migration:revert


## Starting the application

- For local development:


npm run start:local


- For a production environment:


npm run start:prod


## Testing

- Run unit tests:


npm test


- Running e2e tests:


npm run test:e2e


## API documentation

Swagger documentation is available at /docs after the server is started.

## Project structure

- src/ - source code of the application
- environments/ - environment configuration files
- docker-compose.db.yaml - Docker configuration for the database
- package.json - project dependencies and scripts
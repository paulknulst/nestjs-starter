# NestJs-Starter

This project is sample application that demonstrates storing and receiving data in MySQL database using NestJS framework
and TypeORM.

Additionally, it shows how to activate Swagger(OpenApi) documentation to automatically generate an REST-API

![](header.png)

## Database setup

In order to start this sample, please make sure that you specify the right data for establishing MySQL connection (in `
ormconfig.json` file, make sure that `username`, `password` and `database` values matches your MySQL server values):

```
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "nestuser",
    "password": "nestpw",
    "database": "nestdb",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}
```

## Install Dependencies

### APP

Then please install all the app depencencies by executing the following command:

```
npm install
```

### DB

To install a Mysql-Database you can use the predefined docker-compose.db.yml. This file contains all informtaion to
setup an docker comntainer with the same credentials from `ormconfig.json`. If you updated this file you have to update
docker-compose also. You can start the db with:

```
npm run db:start
```

To stop run:

```
npm run db:stop
```

If you dont want to use Docker you have to setup your own Mysql-Instance with credentials from `ormconfig.json`

### Migrations

Every time after creating new entities or updating old entities it is important that you generate migrations for this
new entities:

```shell
npm run migrations:generate
```

New migrations scripts will then be saved within the `migrations` folder as TIMESTAMP-nestdb.js _(adjust package.json
npm script to change name)_

-----

After generation (or initially) they have to be applied with:

```shell
npm run migrations:run
```

## Run

You can run the app by executing the following command:

```
npm run start:dev
```

Resources with CRUD functionality will be available
at [http://localhost:1337/](http://localhost:1337/) [users/subscriptions/notes]

## Swagger / OpenApi

Open http://localhost:1337/api to access the API documentation


# REST

"Register" a user (user bearer within `src/auth/adminauth.middleware.ts` - supersafe2)
```shell
curl -X POST http://localhost:1337/user -d '{"name": "admin", "password": "admin", "gender" : "m"}' -H "Authorization: Bearer supersafe2" -H "Content-Type: application/json"
```

"Login" using /auth/login
```shell
curl -X POST http://localhost:1337/auth/login -d '{"username": "admin", "password": "admin"}' -H "Content-Type: application/json"
```

Retrieve profile lol
```shell
curl http://localhost:1337/profile -H "Authorization: Bearer HERE_TOKEN_FROM_LOGIN_CALL"
```
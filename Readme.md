# Node JS & Typescript

- Node.js
- MongoDB with Mongoose
- Typescript
- Express and Express Middleware

## Dependencies :

We need to install these in order to make a proper API

```shell
yarn add express yup config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid
```

```shell
yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/yup @types/pino @types/mongoose @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node typescript -D
```

## Steps to initialize project :

- Do yarn init
- Install the dependencies
- make a src folder and then make an app.js file in that
- make a nodemon.json file and put the following code in it :

```json
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/", "dist/", "coverage/"],
  "watch": ["src/"],
  "execMap": {
    "ts": "node -r ts-node/register"
  },
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json,ts"
}
```

- Now add the following script in package.json

```json
"scripts": {
        "dev": "nodemon --config nodemon.json src/app.ts"
},
```

- Use this to start the project

```shell
yarn dev
```

- Make the following folders :

1. controller : This will contain the handler functions.
2. db : This here will contain our DB functions.
3. logger : This will have our logger which will format our cli output.
4. model : This will have all the schemas.
5. service : This will contain the functions to create,modify,delete anything.
6. middleware : This will contain the middlewares for data validation or anything.
7. schema : This will contain all the valid schemas

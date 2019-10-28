# HÉTIC vs EEMI

Plus Eemien ou Héticien ? Le jeu qui ne fait pas rire les élèves.

## Project setup

Clone repository

```
git clone https://github.com/sundowndev/HETICvsEEMI
```

Install core dependencies

```
npm install
npm run bootstrap
```

Launch REST API

```
node server
```

Start client

```
cd client/
npm run serve
```

Then you can browse the client at `http://localhost:8080/` and the API at `http://localhost:3000/`.

### API routes

- **/questions** returns an array of questions
- **/schools** returns an array of schools

### Client development

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your tests
```
npm run test
```

#### Lints and fixes files
```
npm run lint
```

#### Run your end-to-end tests
```
npm run test:e2e
```

#### Run your unit tests
```
npm run test:unit
```

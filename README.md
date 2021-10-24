# AngularHeroku

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deploy to Heroku

Create a new angular project
```
ng new demo-deploy
```
Push project to github
```
    git remote add origin <new_github_repository_url>
    git add --all
    git commit -m "initial commit"
    git push -u origin master
```
Install them into your application by running this commands in your terminal:

```
npm install @angular/cli@latest @angular/compiler-cli --save-dev
```
In your package.json, copy from devDependencies to dependencies
```
"@angular/cli”: “~11.0.5”,
"@angular/compiler-cli": "~11.0.5",
```
### Create postinstall script in package.json
Under “scripts”, add a “heroku-postinstall” command like so:
```
"heroku-postbuild": "ng build --aot --prod "
```
This tells Heroku to build the application using Ahead Of Time (AOT) compiler and make it production-ready. This will create a dist folder where all html and javascript converted version of our app will be launched from.

### Copy typescript to dependencies.
```
"typescript": "~4.3.5",
```
### Install Server to run your app
Locally we run ng serve from terminal to run our app on local browser. But we will need to setup an Express server that will run our production ready app (from dist folder created) only to ensure light-weight and fast loading.

Install Express server by running:
```
npm install express path --save
```
Create a server.js file in the root of the application and paste the following code.
```
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/angular-heroku'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/angular-heroku' }
    );
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
```

### Test That Everything is OK
Running to generate ./dist/xxx
```
ng build --prod
```
Run server from terminal
```
node server.js
```
Check the connection from
```
http://localhost:8080/
```

### Change start command
In package.json, change the “start” command to node server.js so it becomes:
```
"start": "node server.js"
```

### Push changes to GitHub:
```
git add .
git commit -m "updates to deploy to heroku"
git push
```

At this point, your application on Heroku will automatically take the changes from GitHub and update itself.

Also, it’ll look into your package.json and install packages.

It will run the postinstall and then, node server.js to spin up your application.

You can check Activity tab and open Build log to see how it actually runs.
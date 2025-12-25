# D&D Character Creator

This is a D&D Character Creator app built mainly with [Electron](https://electronjs.org) and [Angular](https://angular.dev).

Since it is a NodeJS project, installing dependencies is straightforward as soon as you have NodeJS (and by extension NPM) on your machine: open the project folder and run `npm i`.

From then on, starting the project in development mode will require running `npm run start:dev`, which will trigger two concurrent processes: the renderer process, where our Angular application runs at port 4200 by default, and the main process which is our Electron app wrapping around the browser, showing said Angular application.

As of writing this, all Electron logic lives within the folder `electron/`, and all other code can be assumed to be part of the Angular application.

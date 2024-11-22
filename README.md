# Gondola Client
### Client side for gondola app

Gondola client is a Graphical User Interface made for connecting, sending, and viewing flight routes from the Gondola machine.
Gondola Client handles several needs, Including:
* Uploading CSV files with targets
* Adding targets and flight route manually
* Viewing best route as calculated by the machine
* viewing previously saved routes and plans

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)

## Installation

Clone down this repository. You will need node and npm installed globally on your machine.

After you cloned the repository, to update submodules run:
```bash
# On the first time
git submodule update --init
# Any other time
git submodule update
```
To install the dependencies run:
```bash
npm install
```

## Usage

**To run the app on development mode**

run:

```bash
npm start
```
Then you can open http://localhost:3000 to view it in your browser.

**To run the app on test mode**

run:

```bash
npm test
```
This will launch the test runner in the interactive watch mode using Jest testing framework.

**To build the app**

run:

```bash
npm run build
```
This will build the app for production to the 'build' folder.

In order to access the services from the Gondola Machine, the Gondola Client needs to run together with Gondola Server. For installation and running guide on the Gondola Server see [the Gondola Server documentation](https://gitlab.broadway.iaf/gondola1/backend/gondola-server).

## Documentation

This project what built with [TypeScript](https://www.typescriptlang.org/) using [React](https://legacy.reactjs.org/) javascript library.

Below are some of the main libraries used to build this project:

### [Leaflet]((https://leafletjs.com/))

Leaflet is an open-source JavaScript library for building lightweight interactive maps.

In this project I used Leaflet to show detections and their places and to show antennas, their reception range and some information about them.

In order to make this library more useful specifically for this project i built additional typescript files that can work together with Leaflet, including:

* JSXControl - allows you to add your own JSX elements as anchors to the Leaflet map.
* JSXMarker - allows you to add your own JSX elements as markers to the Leaflet map.

### [Redux](https://redux.js.org/)

Redux is a predictable state container for JavaScript Apps.

For this project I used Redux in order to store globally objects (slices) that need to be used on the entire codebase. Including:

* Routes - as the server provided
* Polygons - added by user
* Targets - added by user
* general flight data - added by user

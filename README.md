# SupersetSdk

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

### What is Superset?

Apache Superset is an open-source software application that enables users to visualize and explore data interactively. It is designed to be highly intuitive and supports a wide range of visualization types. Superset can connect to most SQL-based data sources, including traditional databases and newer SQL-speaking environments. It's particularly known for its ease of use, expansive visualization capabilities, and robust security features.

### Superset Angular SDK

The Superset Angular SDK is a software development kit that allows developers to integrate Superset's powerful data visualization and exploration capabilities into applications built with Angular, a popular web application framework. This SDK provides a set of tools, libraries, and components that make it easier to embed Superset charts and dashboards within Angular applications, enabling a seamless user experience.

## Features

1. **Easy Integration:** Simplifies the process of embedding Superset visualizations into Angular applications.
2. **Customization:** Offers options to customize the look and feel of the visualizations to match the Angular application’s design.
3. **Interactive Dashboards:** Enables the creation of interactive dashboards with drill-down capabilities.
4. **Security:** Ensures secure data handling and integration with Superset’s robust security model.
5. **Real-time Data Visualization:** Supports real-time data visualization for dynamic and up-to-date insights.

## Installation

```bash
npm install superset-angular-sdk
```

## Usage

### Basic Usage

Here’s a simple example of how to use the Superset Angular SDK in your project:

```javascript
import { SupersetClient } from 'superset-angular-sdk';

SupersetClient.configure({
    // Configuration options
}).init();
```

### Embedding a Dashboard

```javascript
// Code example to embed a Superset dashboard
```

# Architecture

## Build

Cozy-api is written in ES6 and built using webpack and babel.

**TODO:** As a developer, I can `import`/`require` cozy-client-js using any build tool
**TODO:** As a developer, I can add `<script src="/cozy-client-js.js">` to my page and get started.

## Polyfills

Cozy-api uses [fetch](https://fetch.spec.whatwg.org/) and bundle all necessary polyfills (promise, fetch, reGenerator)

**TODO:** We should move the polyfills to a separate bundle and require them only if needed.

## Linting

ESLint is run against the codebase.

**TODO:** Cozy-api does NOT follow cozy-guidelines .eslintrc for now as it is react dependant.

## Testing

Tests are written in ES7 and run using webpack-mocha.

They are two types of test :

- In **test/unit**, we mock `fetch` and ensure each function calls the proper route(s) and parse the results as expected if the server is correct.
- In **test/integration**, we run a complex scenario against both v1 and v2 cozy and ensure compatibility.

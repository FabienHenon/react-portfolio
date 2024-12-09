# React micro frontend bootstrap

**Micro frontends are to be used with [mf-maestro](https://github.com/company-app/mf-maestro) and [mf-bundler](https://github.com/company-app/mf-bundler)**

---

## Steps to use the bootstrap in your project

### `./package.json`

- Replace `domain` by your domain name (ie: my-todo)
- Add in `mf-maestro.entities[].exclude_folders` the `dist` folder of your micro frontends
- Add in `watch.build.patterns` the `src` directories of your micro frontends

### `./apps/.../package.json`

- Replace `name` with the name of your MF suffixed by either `detail`, `master`, `new`, `edit`
- Adapt the `start` script with you path for your project and the `main-styles` project (`main-styles` is a project providing the global CSS used by your `mf-maestro`, this is useful when testing your component locally without `mf-maestro`)
- Be sure you use `PORT` not already in use by another component in your `test:e2e` script.

### `./apps/.../mf-bundler.config.js`

- Set a unique name for your micro frontend in `microAppName`
- Set your entity name in `entity`
- Set the ui type in uiType. Possible values are: `master`, `detail`, `new`, `edit`

_(your folder's name contains the entity name and the uiType: entity-uiType)_

### `./apps/.../public/index.html`

- Replace `domain-entity-detail` by the `microAppName` you specified in `mf-bundler.config.js`

### `./apps/.../src/app.js`

- Replace `domain-entity-detail` by the `microAppName` you specified in `mf-bundler.config.js`
- Replace `domain` by your domain name for the `domainName` flag value

## Testing

You can test all your micro frontends by running in the root directory:

```
$ npm run test
```

This will run mocks in background and the `test` script for all your micro frontends.

If you wish to test only the micro frontend your working on you have 3 scripts:

### `npm run test:unit`

Will run unit tests for your component

### `npm run test:e2e`

Will run end to end tests for your component (_be sure to run mocks by yourself in this case_)

### `npm run test`

Will run unit and end to end tests for your component (_be sure to run mocks by yourself in this case_)

## Mocks

Mocks are available if you want to try and test this bootstrap.
To start mocks run:

```
$ npm run mocks
```

## Available Scripts

In the project directory, you can run:

### `npm run build`

Build all micro-front projects and generate maestro manifest

### `npm run clean`

Clean all micro-front projects

### `npm run serve`

Serve all micro-front projects

### `npm run test`

Test all micro-front projects

### `npm run watch`

Run all micro-front projects and watch modification

### `npm run mocks`

Run mocks to be able to test these bootstraps

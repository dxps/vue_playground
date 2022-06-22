# Quasar Weather (quasar-weather)

A Quasar Project

## Setup

### Install the dependencies
```bash
yarn
# or
npm install
```

### Set the OpenWeather API Key

Go to [API Keys](https://home.openweathermap.org/api_keys) to generate and get your OpenWeather API key. Set it into `.env` file like this:
```env
VUE_APP_OPENWEATHER_API=dd44...11707
```

## Run

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```

## Build

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

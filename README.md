# Saqaya E-commerce

A beauty and fragrance e-commerce application built with Vue 2, TypeScript, Vuex 3, and Vue Router 3.

## Tech Stack

- Vue 2 + TypeScript
- Vuex 3 (namespaced modules)
- Vue Router 3
- SCSS / SASS 7-in-1 architecture + BEM
- Axios + DummyJSON API
- Jest + Vue Test Utils

## Project Setup

```bash
npm install --legacy-peer-deps
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Run unit tests
```bash
npm run test:unit
```

### Lint and fix files
```bash
npx eslint --ext .js,.vue,.ts src/ --fix
```

## Note
Cart items persist across sessions using vuex-persistedstate.
To reset the cart, run `localStorage.clear()` in the browser console.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Saqaya E-commerce

A beauty and fragrance e-commerce application built with Vue 2, TypeScript, Vuex 3, and Vue Router 3, consuming the [DummyJSON API](https://dummyjson.com/).

## Live Demo

🔗 [https://saqaya-ecommerce-two.vercel.app/](https://saqaya-ecommerce-two.vercel.app/)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 2 + TypeScript |
| State Management | Vuex 3 (namespaced modules) |
| Routing | Vue Router 3 |
| Styling | SCSS / SASS 7-in-1 architecture + BEM |
| HTTP Client | Axios |
| API | DummyJSON |
| Testing | Jest + Vue Test Utils |
| Deployment | Vercel |

## Project Structure

```
src/
├── assets/             # Static assets
├── components/         # Reusable components organized by domain
│   ├── About/
│   ├── Cart/
│   ├── Contact/
│   ├── Global/         # Header, Footer
│   ├── Home/
│   ├── ProductDetail/
│   ├── Products/
│   └── UI/             # AppButton, AppInput
├── layout/             # MainLayout.vue
├── router/             # Vue Router config
├── services/           # API service layer (Axios calls)
├── store/              # Vuex store
│   └── modules/        # cart.ts, products.ts
├── styles/             # SCSS 7-in-1 architecture
│   ├── abstracts/      # Variables, mixins, functions
│   ├── base/           # Reset, typography
│   ├── components/     # Component-level styles
│   ├── layout/         # Header, footer styles
│   ├── pages/          # Page-specific styles
│   ├── themes/
│   └── vendors/
├── types/              # Shared TypeScript interfaces
└── views/              # Route-level page components
```

## Key Features

- 🛍️ **Product browsing** — filter by beauty categories fetched from the API
- 🔍 **Product detail** — dynamic routing with breadcrumb support (`?from=home` / `?from=products`)
- 🛒 **Side cart** — add, remove, update quantity, with persistent state via `vuex-persistedstate`
- 🔀 **Sort & filter** — sort products by price and rating using a dedicated `SortDropdown` component
- 📱 **Responsive design** — mobile-friendly layout including hero section
- ✅ **Full test coverage** — 126 tests across 12 suites

## Test Coverage

```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |     100 |     87.5 |     100 |     100 |
services/             |     100 |      100 |     100 |     100 |
store/modules/        |     100 |      100 |     100 |     100 |
components/           |     100 |      100 |     100 |     100 |
```

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

### Run unit tests with coverage

```bash
npm run test:unit -- --coverage
```

### Lint and fix files

```bash
npx eslint --ext .js,.vue,.ts src/ --fix
```

## Notes

- Cart items persist across sessions using `vuex-persistedstate`.  
  To reset the cart, run `localStorage.clear()` in the browser console.
- All API calls are centralized in `src/services/productService.ts` and consumed by Vuex actions.
- All shared TypeScript interfaces live in `src/types/product.ts`.

## Configuration

See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).

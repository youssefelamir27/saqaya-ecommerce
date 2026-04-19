# Saqaya E-commerce V3

A beauty and fragrance e-commerce application — migrated from Vue 2 to Vue 3, rebuilt with modern tooling and clean architecture patterns.

> **Week 4 Migration:** Vue 2 + Vuex + Options API → Vue 3 + Pinia + Composition API + Vite

## Live Demo

🔗 Coming soon on Vercel

## Tech Stack

| Layer | Technology |
|:---:|:---:|
| Framework | Vue 3 + TypeScript |
| Build Tool | Vite |
| State Management | Pinia (with persistence) |
| Routing | Vue Router 4 |
| Styling | SCSS / SASS 7-in-1 architecture + BEM |
| HTTP Client | Axios |
| API | DummyJSON |
| Testing | Vitest + Vue Test Utils |
| Deployment | Vercel |

## Architecture

This project follows a **Clean Architecture** pattern with a composables layer separating UI from business logic:

```
component → composable → store → service → API
```

| Layer | Location | Responsibility |
|:---:|:---:|:---:|
| Presentation | `src/components/`, `src/views/` | UI rendering |
| Application | `src/composables/` | Business logic, state coordination |
| State | `src/stores/` | Pinia stores (cart, products) |
| Infrastructure | `src/services/` | API calls via Axios |
| Domain | `src/types/` | Shared TypeScript interfaces |

## Project Structure

```
src/
├── assets/             # Static assets + Font Awesome
├── components/         # Reusable components organized by domain
│   ├── __tests__/
│   ├── About/          # OurStory, StatsBox, TeamCard
│   ├── Cart/           # SideCart, SideCartItem
│   │   └── __tests__/
│   ├── Contact/        # ContactBox, ContactForm
│   ├── Global/         # Header, Footer
│   ├── Home/           # FlashSale, BrowseCategory, ExploreProducts
│   ├── ProductDetail/  # ProductInfo
│   ├── Products/       # SortDropdown
│   └── UI/             # AppButton, AppInput
│       └── __tests__/
├── composables/        # Application layer — useCart, useProducts
│   └── __tests__/
├── layout/             # MainLayout.vue
├── router/             # Vue Router 4 config
├── services/           # API service layer (Axios calls)
├── stores/             # Pinia stores — cart.ts, products.ts
│   └── __tests__/
├── styles/             # SCSS 7-in-1 architecture
│   ├── abstracts/      # Variables, mixins, functions
│   ├── base/           # Reset, typography
│   ├── components/     # Component-level styles
│   ├── layout/         # Header, footer styles
│   ├── pages/          # Page-specific styles
│   ├── themes/
│   └── vendors/
├── types/              # Shared TypeScript interfaces
├── views/              # Route-level page components
└── webfonts/           # Font Awesome webfonts
```

## Key Features

- 🛍️ **Product browsing** — filter by beauty categories fetched from the API
- 🔍 **Product detail** — dynamic routing with breadcrumb support (`?from=home` / `?from=products`)
- 🛒 **Side cart** — add, remove, update quantity, with persistent state via `pinia-plugin-persistedstate`
- 🔀 **Sort & filter** — sort products by price and rating using a dedicated `SortDropdown` component
- 📱 **Responsive design** — mobile-friendly layout including hero section
- ✅ **85 tests** across 7 suites — stores, composables, and components

## Key Migration Changes (Vue 2 → Vue 3)

| Vue 2 | Vue 3 |
|:---:|:---:|
| Options API | Composition API (`<script setup>`) |
| Vuex 3 | Pinia |
| Vue CLI + Webpack | Vite |
| Jest | Vitest |
| `mapGetters` / `mapActions` | `useCart()` / `useProducts()` composables |
| `Vue.extend({})` | `defineProps` / `defineEmits` |
| `beforeRouteEnter` | `onMounted` + `onBeforeRouteUpdate` |
| `vuex-persistedstate` | `pinia-plugin-persistedstate` |

## Test Coverage

```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   91.60 |    92.85 |   87.87 |   91.89 |
components/Cart       |     100 |      100 |     100 |     100 |
components/UI         |   83.33 |      100 |   66.66 |   83.33 |
composables           |   97.72 |      100 |   96.42 |     100 |
stores                |     100 |       80 |     100 |     100 |
```

## Project Setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run dev
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

### Type check

```bash
npx vue-tsc --noEmit
```

### Lint and fix files

```bash
npm run lint
```

## Notes

- Cart items persist across sessions using `pinia-plugin-persistedstate`.
  To reset the cart, run `localStorage.clear()` in the browser console.
- All API calls are centralized in `src/services/productService.ts`.
- Components access state exclusively through composables (`useCart`, `useProducts`) — never directly from stores.
- All shared TypeScript interfaces live in `src/types/product.ts`.

## Related

- **Vue 2 version (Week 1-3):** [`main` branch](https://github.com/youssefelamir27/saqaya-ecommerce/tree/main)
- **Vue 3 migration (Week 4):** [`week4/vue3-migration` branch](https://github.com/youssefelamir27/saqaya-ecommerce/tree/week4/vue3-migration)

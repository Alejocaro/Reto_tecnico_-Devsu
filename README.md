# Prueba Técnica QA — Reto Devsu

**Autor:** [Alejandro Caro Gómez](https://github.com/Alejocaro)  
**Repositorio:** [Reto_tecnico_-Devsu](https://github.com/Alejocaro/Reto_tecnico_-Devsu)

Automatización E2E y API con Cypress sobre [demoblaze.com](https://www.demoblaze.com), siguiendo buenas prácticas de proyecto (POM + comandos reutilizables + fixtures + reporter).  
Incluye escenarios positivos/negativos, validaciones de precios y pruebas de servicios de autenticación.

> Proyecto de autoría propia desarrollado como reto técnico de QA.

## Alcance

- **E2E (implementado):** Flujo de compra en Demoblaze.
- **API (implementado):** Servicios `signup` y `login` de Demoblaze (`/signup`, `/login`).

## Requisitos previos

- Node.js >= 18.x ([nodejs.org](https://nodejs.org))
- npm >= 9.x
- Google Chrome (recomendado para Cypress)

## Instalación

```bash
git clone https://github.com/Alejocaro/Reto_tecnico_-Devsu.git
cd Reto_tecnico_-Devsu
npm install
```

## Variables de entorno (.env)

1. Crear archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

2. Ajustar valores si aplica:

```env
DEMOBLAZE_API_URL=https://api.demoblaze.com
API_USERNAME_PREFIX=qa_auto_user
API_PASSWORD=Passw0rd.123
API_INVALID_PASSWORD=WrongPass.123
```

## Comandos principales

```bash
# Abrir Cypress Test Runner (modo interactivo)
npm run cy:open

# Ejecutar todo en modo headless
npm run cy:run

# Ejecutar solo specs de Demoblaze
npm run cy:run:demoblaze

# Ejecutar solo specs de API
npm run cy:run:api

# Ejecutar con reporte HTML/JSON (Mochawesome)
npm run cy:run:report

# Alias para ejecutar todo y consolidar en un solo reporte
npm run test:all:report
```

> `cy:run:report` limpia automaticamente `cypress/reports` antes de generar un nuevo reporte.

## Abrir reporte HTML

Tras ejecutar `npm run cy:run:report`, abre el archivo:

`cypress/reports/index.html`

En Windows:

```bash
start cypress/reports/index.html
```

## Estructura del proyecto

```text
Reto_tecnico_-Devsu/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── demoblaze_auth.cy.js
│   │   └── demoblaze/
│   │       └── purchase_flow.cy.js
│   ├── fixtures/
│   │   ├── checkout.json
│   │   └── products.json
│   ├── reports/
│   │   └── index.html
│   └── support/
│       ├── commands/
│       │   ├── demoblaze.api.commands.js
│       │   └── demoblaze.commands.js
│       ├── helpers/
│       │   ├── elementAssertions.js
│       │   └── priceUtils.js
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── ProductPage.js
│       │   ├── CartPage.js
│       │   └── CheckoutModal.js
│       ├── selectors/
│       │   └── demoblaze.selectors.js
│       └── e2e.js
├── cypress.config.js
├── .env.example
├── package.json
├── README.md
└── conclusiones.txt
```

## Escenarios E2E cubiertos (`purchase_flow.cy.js`)

- Compra completa con dos productos.
- Validacion de precios por producto, total de carrito y monto final en confirmacion.
- Escenario negativo: intento de compra con formulario vacio.
- Escenario de valor: eliminar producto y recalcular total.

## Escenarios API cubiertos (`demoblaze_auth.cy.js`)

- Crear un nuevo usuario en `POST /signup`.
- Intentar crear usuario ya existente en `POST /signup`.
- Login exitoso con credenciales correctas en `POST /login`.
- Login fallido con credenciales incorrectas en `POST /login`.

## Flujo funcional principal

1. Cargar catalogo.
2. Agregar dos productos al carrito.
3. Validar productos y total en carrito.
4. Completar checkout y confirmar compra.
5. Validar datos de confirmacion (`Name`, `Amount`, etc.).

## Artefactos generados

- `cypress/videos/`: video de ejecucion en modo headless.
- `cypress/screenshots/`: capturas automaticas ante fallo.
- `cypress/reports/`: reporte HTML/JSON (Mochawesome).

---

## Autor

**Alejandro Caro Gómez** — QA Automation Engineer  
GitHub: [@Alejocaro](https://github.com/Alejocaro)

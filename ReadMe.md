# Desafío Técnico QA Automation

## Consideraciones

La naturaleza de este proyecto es que se pueda visualizar como quedaria un proyecto armado de manera completa para un desafío técnico. Para lo cual no se van a considerar prácticas de seguridad o optimizaciones de uso, ya que el objetivo es demostrar el conocimiento adquirido. A continuación se detallan las consideraciones:

- Se sube el Cypress.env.json con las credenciales de los usuarios de prueba. En caso de avanzar se debe agregar el archivo al .gitignore
- Se sube la carpeta de reports con una ejecución compleja luego de haber corrido multiple-cucumber-html-reporter para que se pueda visualizar el reporte. En caso de avanzar se debe agregar el archivo al .gitignore
- La arquitectura del proyecto esta basada en el patrón POM para las pruebas de frontend y MVC para las pruebas de API. En la práctica, estas arquitecturas deberían ir separadas de acuerdo con lo que se va a testear. En este caso, como se esta haciendo un desafío técnico, se opto por una arquitectura unificada para simplificar el proyecto.

## Descripción Breve

Este repositorio resuelve el desafío técnico propuesto. Se eligió una web pública para testing E2E y una API pública para testing de integración, cumpliendo las 4 partes de la consigna:

1. Web seleccionada: **Sauce Demo**[](https://www.saucedemo.com) – demo e-commerce para pruebas end-to-end (login, catálogo, carrito, checkout).
2. API seleccionada: **Fake Store API**[](https://fakestoreapi.com) – API pública para simular operaciones de e-commerce (users, auth, products, carts).
3. Casos de prueba definidos:
   - Web: Flujo completo de compra E2E (login → selección múltiple de productos → carrito → checkout).
   - API: Integración realista (obtener usuarios → login → listar productos → detalle → crear carrito → actualizar carrito → eliminar carrito).
4. Tests automatizados con Cypress + Cucumber (Gherkin) para ambos casos, con validaciones completas, parametrización y manejo de datos.

Se documentaron asunciones (e.g., APIs no persisten datos, IDs temporales, uso de credenciales reales de users devueltos por API).

## Tecnologías Usadas

- **Framework de Testing**: Cypress (E2E web + API)
- **BDD**: Cucumber (Gherkin para features, step definitions)
- **Lenguaje**: JavaScript (Node.js)
- **Dependencias Principales**:
  - cypress
  - @badeball/cypress-cucumber-preprocessor
  - @bahmutov/cypress-esbuild-preprocessor
  - esbuild
  - multiple-cucumber-html-reporter (reportes HTML)
- **Estructura**:
  - Web: Page Object Model (POM) en `cypress/pages/`
  - API: MVC-like en `apis/`, `controllers/`, `models/`
- **Control de Versiones**: Git + GitHub

## Precondiciones Necesarias

- Node.js ≥ 14 (recomendado 18+)
- Git instalado
- Acceso a internet (para cargar https://www.saucedemo.com y https://fakestoreapi.com)
- Navegador Chrome (default de Cypress)
- No se requiere cuenta ni autenticación en las APIs o web (todo público)

Nota: En Windows, si tenés problemas con `npm` (Execution Policy), ejecutá en PowerShell como administrador:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

## Instalacion de dependencias

1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd qa-automation-challenge
```

2. Instalar dependencias

```bash
npm install
```

3. Verificar que cypress se instalo correctamente

```bash
npx cypress verify
```

Nota: Si cypress no se instala correctamente, se puede intentar instalar manualmente:

```bash
npx cypress install
```

## Ejecucion de tests

1. Modo interactivo (recomendado para debug)

```bash
npx cypress open
```

- Selecciona "E2E Testing"
- Elige browser (Chrome)
- Ejecuta features individuales (web o api)

2. Ejecutar tests API

```bash
npx cypress run --spec "cypress/e2e/features/api/*.feature"
```

3. Ejecutar tests Web

```bash
npx cypress run --spec "cypress/e2e/features/web/*.feature"
```

## Visualizar reporte

El proyecto tiene incorporado multiple-cucumber-html-reporter, para generar un reporte se debe ejecutar una suite de test y luego ejecutar el siguiente comando:

```bash
npm run report
```

El reporte se generara en la carpeta `cypress/reports`, y se visualiza a través de un navegador web abriendo el archivo `cypress/reports/index.html`

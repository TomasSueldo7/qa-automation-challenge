import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../pages/Login.page.js'
import InventoryPage from '../../pages/Inventory.page.js'
import CartPage from '../../pages/Cart.page.js'
import CheckoutOverviewPage from '../../pages/CheckoutOverview.page.js'
import CheckoutInformationPage from '../../pages/CheckoutInformation.page.js'
import Product from '../../models/product.model.js'

let selectedProducts = []

Given('el usuario navega a la página principal', () => {
  LoginPage.visit()
})

When('el usuario ingresa con las credenciales correctas del rol {string}', (rol) => {
  cy.env([rol]).then((envValues) => {
    const userCredentials = envValues[rol]

    if (!userCredentials) {
      throw new Error(`No se encontraron credenciales para el rol "${rol}"`)
    }

    LoginPage.login(userCredentials.user, userCredentials.password)
  })
})

Then('ingresa correctamente al sistema', () => {
  InventoryPage.validateLoaded()
})

When('el usuario selecciona los siguientes productos del catálogo', (dataTable) => {
  const productNames = dataTable.hashes().map(row => row.producto.trim())

  selectedProducts = []

  cy.wrap(productNames).each((productName) => {
    InventoryPage.getProductDetails(productName).then((details) => {
      const product = new Product(
        details.name,
        details.description,
        details.price
      )
      selectedProducts.push(product)
      cy.log(`Producto agregado: ${product.name} - $${product.price}`)
    })

    InventoryPage.addToCart(productName)
  })
})

Then('el sistema marca cada producto como agregado al carrito', () => {
  cy.wrap(selectedProducts).each((product) => {
    InventoryPage.getProductContainer(product.name)
      .find('.btn_inventory')
      .should('have.text', 'Remove')
  })
})

When('el usuario selecciona la opcion de ver el carrito', () => {
  InventoryPage.goToCart()
})

Then('el sistema muestra en el carrito todos los productos seleccionados', () => {
  selectedProducts.forEach((expectedProduct) => {
    CartPage.getCartItemDetails(expectedProduct.name).then((cartItem) => {
      expect(cartItem.name).to.equal(expectedProduct.name)
      expect(cartItem.description).to.equal(expectedProduct.description)
      expect(cartItem.price).to.equal(`$${expectedProduct.price.toFixed(2)}`)
    })
  })

  CartPage.getCartItemCount().should('eq', selectedProducts.length)
})

When('el usuario procede al checkout', () => {
  CartPage.proceedToCheckout()
})

When('el usuario ingresa nombre {string}, apellido {string} y codigo postal {string} para confirmar el pedido', (nombre, apellido, cp) => {
  CheckoutInformationPage.fillInfo(nombre, apellido, cp)
})

Then('el sistema muestra el resumen del checkout con datos validos', () => {
  CheckoutOverviewPage.validateSummary()
  CheckoutOverviewPage.getItemTotal().then((total) => {
    expect(total).to.be.closeTo(selectedProducts.reduce((acc, product) => acc + product.price, 0), 0.1)
  })
  CheckoutOverviewPage.getTax().then((tax) => {
    expect(tax).to.be.closeTo(selectedProducts.reduce((acc, product) => acc + product.price, 0) * 0.08, 0.1)
  })
  CheckoutOverviewPage.getTotal().then((total) => {
    expect(total).to.be.closeTo(selectedProducts.reduce((acc, product) => acc + product.price, 0) * 1.08, 0.1)
  })
})

When('el usuario confirma la compra', () => {
  CheckoutOverviewPage.finishPurchase()
})

Then('el sistema muestra la confirmación de la orden', () => {
  CheckoutOverviewPage.validateConfirmation()
})

When('el usuario ingresa datos de envío inválidos', () => {
  CheckoutInformationPage.continueWithoutInfo()
})

Then('el sistema indica que la orden no puede ser procesada', () => {
  CheckoutInformationPage.validateError()
})
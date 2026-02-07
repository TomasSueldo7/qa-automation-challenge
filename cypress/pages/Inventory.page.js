import { normalizeNumber } from '../utils/data.utils.js'

class InventoryPage {
  get title() { return cy.get('.title') }
  get productItems() { return cy.get('.inventory_item') }
  get cartLink() { return cy.get('[data-test="shopping-cart-link"]')}
  get itemPrice() {return cy.get('.inventory_item_price')}

  validateLoaded() {
    this.title.should('have.text', 'Products')
  }

  getProductContainer(productName) {
    return this.productItems.contains(productName).parents('.inventory_item')
  }

  getProductDetails(productName) {
    return this.getProductContainer(productName).then($container => {
      const name = $container.find('.inventory_item_name').text().trim()
      const description = $container.find('.inventory_item_desc').text().trim()
      const priceText = $container.find('.inventory_item_price').text().trim()
      const price = normalizeNumber(priceText)

      return { name, description, price }
    })
  }

  addToCart(productName) {
    this.getProductContainer(productName)
      .find('.btn_inventory')
      .should('contain', 'Add to cart')
      .click()
  }

  goToCart() {
    this.cartLink.click()
  }
}

export default new InventoryPage()
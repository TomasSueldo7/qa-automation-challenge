class CartPage {
  get cartItems() { return cy.get('.cart_item') }
  get checkoutButton() { return cy.get('#checkout') }

  getCartItemDetails(productName) {
    return this.cartItems
      .contains('.inventory_item_name', productName)
      .parents('.cart_item')
      .then(($container) => {
        const name = $container.find('.inventory_item_name').text().trim()
        const description = $container.find('.inventory_item_desc').text().trim()
        const price = $container.find('.inventory_item_price').text().trim()

        expect(name, `El producto "${productName}" no se encontró en el carrito`).to.equal(productName)

        return {
          name,
          description,
          price,
          priceNumber: parseFloat(price.replace('$', ''))
        }
      })
  }

  getCartItemCount() {
    return this.cartItems.its('length')
  }

  proceedToCheckout() {
    this.checkoutButton.click()
  }
}

export default new CartPage()
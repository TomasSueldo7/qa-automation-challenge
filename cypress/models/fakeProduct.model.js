class FakeProduct {
  constructor(id, title, price, description, category, image = null) {
    this.id = id
    this.title = title
    this.price = parseFloat(price)
    this.description = description
    this.category = category
    this.image = image
  }

  updatePrice(newPrice) {
    this.price = newPrice
  }
}

export default FakeProduct
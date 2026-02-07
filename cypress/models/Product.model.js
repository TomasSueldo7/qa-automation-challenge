class Product {
  constructor(name, description, price){
    this.name = name,
    this.description = description,
    this.price = price
  }

  getPrice(){
    return this.price
  }
}

export default Product
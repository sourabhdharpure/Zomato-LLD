
 class Cart {

  constructor() {
    this.items = [];
    this.amt = 0;
  }
  
  add(dish) {
    this.items.push(dish);
    this.amt += dish.price;
  }

  remove(dish) {
    this.items = this.items.filter((d) => d != dish);
    this.amt -= dish.price;
  }

  getItems(){
    console.log('CART', this.items)
  }
}

module.exports = {
    Cart
}
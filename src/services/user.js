const { Cart } = require("./cart");

 class User {

  constructor(id, name, address, no, cart) {
    this.id = id;
    this.name = name;
    this.addcartress = address;
    this.no = no;
    this.cart = cart;
  }

  update(name, address, no) {
    if (name) this.name = name;
    if (address) this.address = address;
    if (no) this.no = no;
  }

  addCart(dish) {
    this.cart.add(dish);
  }

  getCart(){
    console.log('CART', this.cart)
  }

  placeOrder() {
    //pass this.cart
    console.log('Placing order for these items ', this.cart)
  }

  trackOrder(orderId){
    console.log('Tracking order')
  }

  getAllOrders(){
    console.log('Getthisting All orders')
  }
}
 module.exports = 
  {
User
  }
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const { User } = require('./src/services/user');
const { Dish } = require('./src/services/dish');
const { Restaurant } = require('./src/services/restaurant');
const { Order } = require('./src/services/order');
const { Rider } = require('./src/services/rider');
const { Cart } = require('./src/services/cart');

const app = express();

// Middleware setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

class OrderHandler {
  constructor(user, restaurant, rider) {
    this.user = user;
    this.restaurant = restaurant;
    this.rider = rider;
  }

  setNextHandler(handler) {
    this.nextHandler = handler;
  }

  async handleOrder(order) {
    if (this.nextHandler) {
      await this.nextHandler.handleOrder(order);
    }
  }
}

class PlaceOrderHandler extends OrderHandler {
  async handleOrder(order) {
    console.log(`Placing order for user ${order.userId} at restaurant ${order.restId}`);
    this.user.placeOrder();
    console.log(`Order ${order.id} placed by ${this.user.name}`);
    order.updateStatus('ORDER PLACED');
    await super.handleOrder(order);
  }
}

class CookOrderHandler extends OrderHandler {
  async handleOrder(order) {
    console.log(`Cooking order ${order.id} at restaurant ${order.restId}`);
    this.restaurant.cook(true);
    console.log(`Restaurant ${this.restaurant.name} is preparing dish for order ${order.id}`);
    await new Promise(resolve => setTimeout(resolve, 5000));
    order.updateStatus('ORDER COOKED');
    await super.handleOrder(order);
  }
}

class DeliverOrderHandler extends OrderHandler {
  async handleOrder(order) {
    console.log(`Delivering order ${order.id} to user ${order.userId}`);
    console.log(`Rider ${this.rider.name} is riding to deliver order ${order.id}`);
    this.rider.startRide();
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.rider.endRide();
    console.log(`Order ${order.id} delivered by ${this.rider.name}`);
    order.updateStatus('ORDER DELIVERED');
    await super.handleOrder(order);
  }
}

// Usage

// Create instances
const order1 = new Order(1, 1, 1);
const cart1 = new Cart();
const user1 = new User(1, 'tom', '2433 d hsr layout', '7898089859', cart1);
const rest1 = new Restaurant(1, 'INDORI RASOI', '27th Main 13th Cross sector 1 HSR layout', '9898786765');
const dish1 = new Dish(1, 'Poha', 'Very delicious Indori Poha', 20, 1);
const rider1 = new Rider(1, 'Laxman', '399 LIG Vikas Nagar', '6756453423');

// Set up the chain of responsibility with the necessary objects
const placeOrderHandler = new PlaceOrderHandler(user1, rest1, rider1);
const cookOrderHandler = new CookOrderHandler(user1, rest1, rider1);
const deliverOrderHandler = new DeliverOrderHandler(user1, rest1, rider1);

placeOrderHandler.setNextHandler(cookOrderHandler);
cookOrderHandler.setNextHandler(deliverOrderHandler);

// User places order
user1.addCart(dish1);

// Use async/await to make the operations synchronous
(async () => {
  await placeOrderHandler.handleOrder(order1);
})();

module.exports = app;

class Dish{
    constructor(id, name, desc, price, rest_id) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.price = price;
        this.restaurantId = rest_id;
    }

    update(){
    }
}

module.exports = {
    Dish
}
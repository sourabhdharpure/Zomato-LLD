class Restaurant {
    constructor(id, name, address, phoneNumber) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.live = 0;
        this.dishes = [];
    }

    cook(bool) {
        // Add logic for cooking in the restaurant
        if(bool) console.log(`${this.name} started cooking delicious food!`);
        else console.log(`${this.name} finished cooking delicious food!`);
    }

    changeStatus(){
        this.live = (this.live + 1)%2;
        console.log(`${this.name} is now `, this.live ? 'OPEN' : 'CLOSED');
    }

    addDish(dish){
        this.dishes.push(dish);
        console.log(`${dish.name} added to the restaurant ${this.name}`);
    }

    removeDish(dish){
        this.dishes.map(d=>{ d != dish });
        console.log(`${dish.name} removed from the restaurant ${this.name}`);
    }

    getMenu(){
        console.log(`MENU OF ${this.name} RESTAURANT`);
        console.log(this.dishes);
    }
}

module.exports = {
    Restaurant
}
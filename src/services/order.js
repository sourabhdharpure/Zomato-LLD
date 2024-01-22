class Order {
    constructor(id, userId, restId) {
        this.id = id;
        this.userId = userId;
        this.restId = restId;
        this.status = 'ORDER PLACED';
    }

    updateStatus(status){
        this.status = status;
        console.log(` Order ${this.id}'s current status is ${this.status}`);
    }

    getStatus(){
        console.log(` Order ${this.id}'s current status is ${this.status}`);
    }
}

module.exports = {
    Order
};

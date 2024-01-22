class Rider {
    constructor(id, name, address, phoneNumber) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    startRide(){
        console.log('Picked food from the restaurant');
    }

    endRide(){
        console.log('Ride ended, food delivered');
    }
    
}

module.exports = {
    Rider
};

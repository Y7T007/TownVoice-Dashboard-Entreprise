class Product {
    constructor(productID, productName, productPrice, quantity) {
        this.productID = productID;
        this.productName = productName;
        this.productPrice = productPrice;
        this.quantity = quantity;
    }

    toString() {
        return `${this.productID}, ${this.productName}, ${this.productPrice}, ${this.quantity}`;
    }
}

export default Product;
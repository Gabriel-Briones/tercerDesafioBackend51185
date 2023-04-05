import fs from 'fs';
//const fs = require('fs');

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.idActual = 1;
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.idActual = this.products[this.products.length - 1].id + 1;
        } catch (err) {
            console.log("Archivo no encontrado o vacío. Se creará uno nuevo", err);
        }
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        // title (nombre del producto)
        // description (descripción del producto)
        // price (precio)
        // thumbnail (ruta de imagen)
        // code (código identificador)
        // stock (número de piezas disponibles)

        product.id = this.idActual++;
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.log("Error al leer el archivo.", err);
        }
        return this.products;
    }

    getProductById(id) {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            const product = this.products.find(p => p.id == id);
            if (!product) {
                console.log(`Error al buscar producto, id: ${id} no encontrado`);
                return product;
            }
            return product;
        } catch (err) {
            console.log("Error al leer el archivo.", err);
        }
    }

    updateProduct(id, updatedProduct) {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.log(`Error al actualizar, id: ${id} no encontrado`);
                return;
            }
            updatedProduct.id = id;
            this.products[index] = updatedProduct;
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (err) {
            console.log("Error al leer o escribir el archivo.", err);
        }
    }

    deleteProduct(id) {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.log(`Error id: ${id} no encontrado`);
                return;
            }
            this.products.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log(`Producto id: ${id} borrado`);
        } catch (err) {
            console.log("Error al leer o escribir el archivo.", err);
        }
    }
}


//const productos = new ProductManager("productos.json");
//console.log(productos.getProducts());





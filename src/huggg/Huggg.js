import Brands from "./Brands";
import Products from "./Products";
import BrandsToProducts from "./BrandsToProducts";
import Stores from "./Stores";
import BrandsToStores from "./BrandsToStores";

const fs = require('fs');
var alasql = require('alasql');

/**
 * Huggg Main data parsing class.
 */
export default class Huggg {

    /**
     * Reads in the brands.json file and extracts the Brands,
     * BrandsToProducts and Products data.
     * This information is then pushed into the Alasql database
     */
    constructor(name) {
        this.db = new alasql.Database();
        // get the brands data
        const results = fs.readFileSync('./src/data/brands.json', 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            return data;
        });
        const dataParsed = JSON.parse(results)
        // parse the brands
        this.db = new Brands(dataParsed.data, this.db)
        // parse the brands to products
        this.db = new BrandsToProducts(dataParsed.data, this.db)
        // parse the products
        this.db = new Products(dataParsed.embedded.products, this.db)
        // parse the stores
        this.db = new Stores(dataParsed.embedded.stores, this.db)
        // parse the brands to stores
        this.db = new BrandsToStores(dataParsed.data, this.db)
    }

    /**
     * Get the Brands, or One Brand
     */
    getBrand(id = null) {
        return (id ?
                this.db.exec('SELECT * FROM brands WHERE id like ? ORDER BY id DESC', [id])
                :
                this.db.exec("SELECT * FROM brands ORDER BY id DESC")
        )
    }

    /**
     * Get the Products which belong to one Brand from the many-to-many
     * Brands to Products table and also pull the Product label from the
     * Product table
     */
    getProductsByBrand(brandId = null) {
        const brand = this.getBrand(brandId)
        const productsByBrand = (brandId ?
                this.db.exec('SELECT brandId, productId, label, description FROM brandstoproducts, products WHERE brandId like ? AND brandstoproducts.productId = products.id', [brandId])
                :
                {}
        )
        // we're going to return combined brand details and the filtered products listings
        return {'Brand': brand[0], 'Products': productsByBrand}
    }

    /**
     * Get the Stores, or One Store
     */
    getStore(id = null) {
        return (id ?
                this.db.exec('SELECT * FROM stores WHERE id like ? ORDER BY id DESC', [id])
                :
                this.db.exec("SELECT * FROM stores ORDER BY id DESC")
        )
    }

    /**
     * Get the Stores which belong to one Brand from the many-to-many
     * Brands to Stores table and also pull the Store name from the
     * Stores table
     */
    getStoresByBrand(brandId = null) {
        const brand = this.getBrand(brandId)
        const storesByBrand = (brandId ?
                this.db.exec('SELECT storeId, stores.name FROM brandstostores, stores WHERE brandId like ? AND brandstostores.storeId = stores.id', [brandId])
                :
                {}
        )
        // we're going to return combined brand details and the filtered products listings
        return {'Brand': brand[0], 'Stores': storesByBrand}
    }

    /**
     * Get the Products, or One Product
     */
    getProduct(id = null) {
        return (id ?
                this.db.exec('SELECT * FROM products WHERE id like ? ORDER BY id DESC', [id])
                :
                this.db.exec("SELECT * FROM products ORDER BY id DESC")
        )
    }

}


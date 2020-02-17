import Brands from "./Brands";
import Products from "./Products";
import BrandsToProducts from "./BrandsToProducts";

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
        const results = fs.readFileSync('./src/data/brands.json', 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            return data;
        });
        const dataParsed = JSON.parse(results)
        this.db = new Brands(dataParsed.data, this.db)
        this.db = new BrandsToProducts(dataParsed.data, this.db)
        this.db = new Products(dataParsed.embedded.products, this.db)
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

}


/**
 * Brands To Products get pulled and written into the db.
 */
export default class BrandsToProducts {

    constructor(data, db) {

        // iterate through the data and product an array of brands-to-products
        const brandsToProducts = data.map((abrand) => {

            const AbrandProducts = abrand.products.map((abrandProduct) => {
                return {
                    brandId: abrand.id,
                    productId: abrandProduct
                }
            })

            return AbrandProducts

        })

        db.exec("CREATE TABLE brandstoproducts (brandId STRING, productId STRING)");
        db.tables.brandstoproducts.data = brandsToProducts.flat(1);
        db.exec("CREATE INDEX brandId ON brandstoproducts (brandId)")
        db.exec("CREATE INDEX productId ON brandstoproducts (productId)")

        return db
    }

}


/**
 * Products get pulled and written into the db.
 */
export default class Products {

    constructor(data, db) {

        // iterate through the data and product an array of products
        const products = data.map((aproduct) => {
            return {
                id: aproduct.id,
                label: aproduct.label,
                description: aproduct.description
            }
        })

        db.exec("CREATE TABLE products (id STRING, label STRING, description STRING)");
        db.tables.products.data = products;
        db.exec("CREATE INDEX id ON products (id)")
        return db
    }

}


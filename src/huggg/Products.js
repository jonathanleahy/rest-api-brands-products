/**
 * Products get pulled and written into the db.
 */
export default class Products {

    constructor(data, db) {

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


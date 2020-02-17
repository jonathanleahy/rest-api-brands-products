/**
 * Stores get pulled and written into the db.
 */
export default class Stores {

    constructor(data, db) {

        // iterate through the data and product an array of products
        const stores = data.map((astore) => {
            return {
                id: astore.id,
                name: astore.name
            }
        })

        db.exec("CREATE TABLE stores (id STRING, name STRING)");
        db.tables.stores.data = stores;
        db.exec("CREATE INDEX id ON stores (id)")
        return db
    }

}


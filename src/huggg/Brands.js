/**
 * Brands get pulled and written into the db.
 */
export default class Brands {

    constructor(data, db) {

        const brands = data.map((abrand) => {
            return {
                id: abrand.id,
                name: abrand.name
            }
        })

        db.exec("CREATE TABLE brands (id STRING, name STRING)");
        db.tables.brands.data = brands;
        db.exec("CREATE INDEX id ON brands (id)")

        return db
    }

}


/**
 * Brands To Products get pulled and written into the db.
 */
export default class BrandsToStores {

    constructor(data, db) {

        // iterate through the data and produce an array of brands-to-stores
        const brandsToStores = data.map((abrand) => {

            const AbrandStores = abrand.stores.map((abrandStore) => {
                return {
                    brandId: abrand.id,
                    storeId: abrandStore
                }
            })

            return AbrandStores

        })

        db.exec("CREATE TABLE brandstostores (brandId STRING, storeId STRING, test STRING)");
        db.tables.brandstostores.data = brandsToStores.flat(1);
        console.log(brandsToStores.flat(1))
        db.exec("CREATE INDEX brandId ON brandstostores (brandId)")
        db.exec("CREATE INDEX storeId ON brandstostores (storeId)")

        return db
    }

}


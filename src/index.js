import http from 'http';
import express from 'express';
import config from './config.json';
import Huggg from './huggg/Huggg';

let app = express();
app.server = http.createServer(app);

// Pull in the raw JSON data and push into a sql database
let oHugg = new Huggg()

// Get All Brands = http://localhost:8080/brand/
// Get A Brand = http://localhost:8080/brand/6d3b6637-7d19-45eb-8dd5-1cbbd597cb70 = Mrs. Potts Chocolate House
app.get('/brand/:abrand?', (req, res) => {
    res.send(oHugg.getBrand( req.params.abrand ))
})

// Get Products filtered by Brand
// Get A Brand = http://localhost:8080/brand/6d3b6637-7d19-45eb-8dd5-1cbbd597cb70/products = Mrs. Potts Chocolate House
app.get('/brand/:abrand/products', (req, res) => {
    res.send(oHugg.getProductsByBrand( req.params.abrand ))
})

// Get Products
app.get('/product/:aproduct?', (req, res) => {
    res.send(oHugg.getProduct( req.params.aproduct ))
})

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;

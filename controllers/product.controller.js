const Product = require('../models/product.model');

// Test
exports.test = function(req, res) {
    res.send('Greetings from the Test Controller!');
};

// Create
exports.product_create = function(req, res){
    let product = new Product(
        {
        name: req.body.name,
        price: req.body.price
        }
    );
    product.save(function(err) {
        if(err) {
            return next(err);
        }
        res.send('Product Created Successfully');
    });
};

// Get All(Read)
exports.products = function (req, res) {
    Product.find({}, function(err, products) {
        if (err) return next(err);
        var productMap = {};
    
        products.forEach(function(product) {
          productMap[product._id] = product;
        });
    
        res.send(products);  
      });
};

// Get by Id( Read)
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if(err){
            return next(err);
        }
        res.send(product);
    })
};

// Update
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

// Delete
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
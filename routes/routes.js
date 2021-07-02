const express = require('express');
const router = express.Router();
const Products = require('../models/products');
const multer = require('multer');
const products = require('../models/products');
const fs = require('fs');

// Image Upload
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

var upload = multer({
    storage: storage,

}) .single('image');

// Insert product name into database route
router.post("/add",upload, (req, res) => {
    const product = new Products({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.file.filename,
    });
    product.save((err)=> {
        if(err){
            res.json({message: err.message, type:"danger"});
        } else {
            req.session.message = {
                type: "success",
                message: "Product added successfully"
            };
            res.redirect("/");
        }
    })
});



// Get all products route
router.get("/",(req, res) => {
    Products.find().exec((err, products)=> {
        if(err){
            res.json({ message: err.message});
        } else {
            res.render("index", {
                title: "Home Page",
                products: products,
            });
        }
    });
});

router.get("/add",(req, res) => {
    res.render("add_products", {title:"Add Products"});

});

// Edit the products routes
router.get("/edit/:id",(req, res) => {
    let id = req.params.id;
    Products.findById(id, (err, products) => {
        if(err)
        {
            res.redirect('/');
        }

        else {
            if(products == null){
                res.redirect("/");
            } else {
                res.render("edit_products", {
                    title: "Edit Product",
                    products : products,
                });
              }
        }
    });   
});

//update product routes
router.post('/update/:id', upload, (req,res)=> {
    let id = req.params.id;
    let new_image = '';

    if(req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync('./uploads/' + req.body.old_image);
        }

        catch(err) {
            console.log(err);

        }

    } else {
        new_image = req.body.old_image;
    }
    Products.findByIdAndUpdate(id, {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: new_image,
    
    }, (err, result) => {
         if(err){
            res.json({message: err.message, type: 'danger'});
        } else {
            req.session.message = {
                type:'success',
                message:'Product Updated Successfully'
            };
            res.redirect('/');

        }
    });
});

// Delete routes
router.get('/delete/:id', (req,res)=> {
    let id = req.params.id;
    Products.findByIdAndRemove(id, (err, result) => {
        if(result.image != ''){
            try {
                fs.unlinkSync('./uploads/'+ result.image);
            } catch (error) {
                console.log(err);
                
            }
        }
        if(err){
            res.json({message: err.message});
        } else {
            req.session.message = {
                type: 'info',
                message: 'User Deleted'
            };
            res.redirect('/');
        }
    });
});
module.exports = router;
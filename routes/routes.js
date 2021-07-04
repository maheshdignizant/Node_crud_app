const express = require('express');
const router = express.Router();

router.get("/",(req, res) => {
    res.render("dashboard", {title:"Home"});

});

router.get("/add",(req, res) => {
    res.render("add_products", {title:"Add Product"});

});


      


module.exports = router;
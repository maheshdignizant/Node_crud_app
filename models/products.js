const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    pname:{
        type:String,
        required: true,

    },
    
    category: {
        type:String,
        required:true,
    },

    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Products",productSchema);
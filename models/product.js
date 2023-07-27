const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("products" , ProductSchema);
const router = require("express").Router();
const product = require("../models/product");

const upload = require("../global/mutler");

//----------------- add new product -------------
router.post("/add-product", upload.any() , async(req, res)=>{
    const newProduct = new product(req.body);
    try{
        const saveProduct = await newProduct.save()
        res.status(200).json(saveProduct)
    }catch(error){
        res.status(500).json(error)
    }
})



//---- update product
router.put("/update-product/:id" , async(req, res)=>{
    try{
        const product_ = await product.findById(req.params.id)
        if(product_.username === req.body.username){
            try{
                const updateProduct = await product.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body
                    },
                    {
                        new:true
                    }
                )
                res.status(200).json(updateProduct);
            }catch(error){
                res.status(500).json(error);
            }
        } else{
            res.status(401).json("You can update only your product!");
        }
    }catch(error){
        res.status(500).json(error);
    }
})


//---- delete product ----
router.delete("/delete-product/:id", async (req, res) => {
    try{
    let id = req.params.id;
    await product.deleteOne({_id: id});
    res.status(200).json("product has been deleted...")
    }catch(error){
        res.status(500).json(error)
    }
});

// ---- get one product ----------
router.get("/find-product/:id" , async(req , res) => {
    try{
        const product_ = await product.findById(req.params.id)
        res.status(200).json(product_)
    }catch(error){
        res.status(404).json(error)
    }
});

// =---- get all product ------
router.get("/" , async(req , res) => {
    try{
        const products = await product.find({})
        res.status(200).json(products);
    }catch(error){
        res.status(400).json(error)
    }
})




module.exports = router;
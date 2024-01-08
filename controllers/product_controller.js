const Product = require('../models/product')
const {static_files_host} = require('../configs')

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProduct = async (req,res) =>{
  try{
    const { id } = req.params
    let product = await Product.findOne({ _id: id })
    return res.status(200).json(product)
  }catch (error){
    console.log(error.message)
    return  res.status(500).json({})
  }
}

exports.updateProduct = async (req,res) =>{
  try{
    const { name, description, price, link } = req.body
    const { id } = req.params

    if(req.file){

      const url = static_files_host + req.file.path
      await Product.updateOne({_id:id},{
        name,description,price,link,
        image:url,
      })
      return res.status(200).send("Product Is Updated")
    }
    await Product.updateOne({_id:id},{
      name,description,price
    })
    return res.status(200).send("Product Is Updated")
  }catch (error){
    return  res.status(500).send("Error Updating The Product, Internal Server Error")
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, link } = req.body;
    console.log(req.body);

    // Check if the technician exists
    const existingProduct = await Product.findOne({ name });
    if(existingProduct){
      console.log('exists');
      return res.status(400).send("Product Already Exists, Choose Another Name")
    }

    if(!req.file){
      console.log('no file');
      return  res.status(400).send("Failed To Add Product, Please Provide An Image")
    }

    const url = static_files_host + req.file.path

    let product = new Product({ name,link, description, price,image:url })
    await product.save()
    return res.status(201).send("Product Was Created Successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.deleteOne(({ _id: id }))
    return res.status(200).send("Product Was Deleted");
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({})
    return res.status(200).send("All Products Were Deleted");
  } catch (error) {
    return res.status(500).send('Internal server error, Failed To Delete All Products');
  }
};

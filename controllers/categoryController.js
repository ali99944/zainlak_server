const Category = require('../models/categoryModel');
const { static_files_host } = require('../configs')

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { __v: false });
    console.log(categories);
    
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, nameAr } = req.body;


    if (req.file.filename == '') {
        console.log('errored');
        return res.status(400).json({ error: 'No image file provided' });
      }

      const url = static_files_host + req.file.path

    const category = new Category({
      name: name,
      nameAr:nameAr,
      image: url
    });

    const savedCategory = await category.save();

    return res.status(200).json(savedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAllCategories = async (req,res) =>{
  try{
    await Category.deleteMany({})
    return res.status(200).send("All Categories Were Deleted")
  }catch (error){
    return res.status(500).send("Internal Server Error")
  }
}

exports.getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: name, image: image },
      { new: true }
    );

    if (updatedCategory) {
      return res.status(200).json(updatedCategory);
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const SubCategory = require('../models/subCategories')
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (deletedCategory) {
      await SubCategory.deleteMany({ parentCategory: categoryId })
      return res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

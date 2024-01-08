const express = require('express');
const router = express.Router();

const popularTechnicianController = require('../controllers/product_controller');
const uuid = require('uuid')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid.v4()}-${file.originalname}`)
    },
})

const upload = multer({ storage: storage })

// GET all popular technicians
router.get('/products', popularTechnicianController.getAllProducts);
router.get('/products/:id', popularTechnicianController.getProduct);
router.put('/products/:id',upload.single('image'), popularTechnicianController.updateProduct);

// POST add new popular technician
router.post('/products',upload.single('image'), popularTechnicianController.createProduct);
router.delete('/products', popularTechnicianController.deleteAllProducts);

// DELETE popular technician by ID
router.delete('/products/:id', popularTechnicianController.deleteProduct);

module.exports = router;

const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    
    const { name, price, description, availability, storeName, storeLocation } = req.body;
    
    let imagePath = '';
    if (req.file) {
     imagePath = '/uploads/images/' + req.file.filename;
      console.log('Image saved:', imagePath); 
    } else {
      console.log('No file in request');
    }

    const product = new Product({
      name,
      price: Number(price),
      description,
      availability,
      storeName,
      storeLocation,
      image: imagePath
    });

    const savedProduct = await product.save();
    console.log('Saved product image:', savedProduct.image ? 'present' : 'empty');
    res.status(201).json(savedProduct);
  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', 'images', req.file.filename);
      fs.unlink(filePath, () => {});
    }
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, availability, storeName, storeLocation } = req.body;
    
    const updateData = { name, price: Number(price), description, availability, storeName, storeLocation };
    
    if (req.file) {
      updateData.image = '/uploads/images/' + req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!product) {
       if (req.file) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', 'images', req.file.filename);
        fs.unlink(filePath, () => {});
      }
      return res.status(404).json({ message: 'Product not found' });
    }
        
    if (req.file && product.image && product.image !== updateData.image) {
      const oldFilePath = path.join(__dirname, '..', '..', product.image);
      fs.unlink(oldFilePath, () => {});
    }
    res.json(product);
  } catch (error) {
        if (req.file) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', 'images', req.file.filename);
      fs.unlink(filePath, () => {});
    }
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
        
    if (product.image) {
      const filePath = path.join(__dirname, '..', '..', product.image);
      fs.unlink(filePath, () => {});
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Product = require('../models/Product');

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

function fileToBase64(file) {
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
}

exports.createProduct = async (req, res) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    
    const { name, price, description, availability, storeName, storeLocation } = req.body;
    
    let image = '';
    if (req.file) {
      image = fileToBase64(req.file);
      console.log('Image converted, length:', image.length);
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
      image
    });

    const savedProduct = await product.save();
    console.log('Saved product image:', savedProduct.image ? 'present' : 'empty');
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, availability, storeName, storeLocation } = req.body;
    
    const updateData = { name, price: Number(price), description, availability, storeName, storeLocation };
    
    if (req.file) {
      updateData.image = fileToBase64(req.file);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
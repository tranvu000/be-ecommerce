const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = req.body;
    try {
      const checkProduct = await Product.findOne({
        name: name
      });
      if (checkProduct !== null) {
        resolve({
          status: 'OK',
          message: 'The name of product is already'
        })
      };
      const createdProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description
      });
      if (createdProduct) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdProduct
        })
      };
    } catch (e) {
      reject(e)
    }
  })
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id
      });
      if (checkProduct === null) {
        resolve({
          status: 'OK',
          message: 'The product is not defined'
        })
      };

      const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedProduct
      });
    } catch (e) {
      reject(e)
    }
  })
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id
      });
      if (product === null) {
        resolve({
          status: 'OK',
          message: 'The product is not defined'
        })
      };

      resolve({
        status: 'OK',
        message: 'Success',
        data: product
      });
    } catch (e) {
      reject(e)
    }
  })
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id
      });
      if (checkProduct === null) {
        resolve({
          status: 'OK',
          message: 'The product is not defined'
        })
      };

      const deletedProduct = await Product.findByIdAndDelete(id);
      
      resolve({
        status: 'OK',
        message: 'Delete product success',
      });
    } catch (e) {
      reject(e)
    }
  })
};

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProduct = await Product.find();
      
      resolve({
        status: 'OK',
        message: 'Success',
        data: allProduct
      });
    } catch (e) {
      reject(e)
    }
  })
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct
};
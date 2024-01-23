const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder;

    try {
      const promises = orderItems.map( async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: {$gte: order.amount}
          },
          {$inc: {
            countInStock: -order.amount,
            selled: +order.amount
          }},
          {new: true}
        );
  
        if (productData) {
          const createdOrder = await Order.create({
            orderItems,
            shippingAddress: {
              fullName,
              phone,
              address,
              city
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user: user
          })     
          if (createdOrder) {
            return {
              status: 'OK',
              message: 'SUCCESS',
            }
          }
        } else {
          return {
            status: 'OK',
            message: 'ERR',
            id: order.product
          }
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);

      if (newData.length) {
        resolve ({
          status: 'ERR',
          message: `Sản phẩm với id${newData.join(',')} không đủ hàng`
        })
      };

      resolve ({
        status: 'OK',
        message: 'SUCCESS'
      });
    } catch (e) {
      reject(e)
    }
  });
};

const getAllOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id
      });

      if (order === null) {
        resolve({
          status: 'ERR',
          message: 'The order is not defined'
        })
      };

      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: order
      });
    } catch (e) {
      reject(e)
    }
  })
};

const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id
      });

      if (order === null) {
        resolve({
          status: 'ERR',
          message: 'The order is not defined'
        })
      };

      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: order
      });
    } catch (e) {
      reject(e)
    }
  })
};

const deleteOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];
      const promises = data.map( async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            selled: {$gte: order.amount}
          },
          {$inc: {
            countInStock: +order.amount,
            selled: -order.amount
          }},
          {new: true}
        );
    
        if (productData) {
          order = await Order.findByIdAndDelete(id);
    
          if (order === null) {
            resolve({
              status: 'ERR',
              message: 'The order is not defined'
            })
          };
        } else {
          return {
            status: 'OK',
            message: 'ERR',
            id: order.product
          }
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item);
    
      if (newData.length) {
        resolve ({
          status: 'ERR',
          message: `Sản phẩm với id${newData.join(',')} không tồn tại`
        })
      };
    
      resolve ({
        status: 'OK',
        message: 'SUCCESS',
        data: order
      });
    } catch (e) {
      reject(e)
    }
  })
};

module.exports = {
  createOrder,
  getAllOrder,
  getDetailsOrder,
  deleteOrder
};
const Order = require("../models/OrderProduct");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder;
    
    try {
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
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdOrder
        })
      }
    } catch (e) {
      reject(e)
    }
  })
};

module.exports = {
  createOrder
};
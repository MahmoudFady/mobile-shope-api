function calcPrice(price, discount) {
  return price - price * (discount / 100);
}
const Cart = require("../../model/cart");
const Product = require("../../model/product");
module.exports.getAllCarts = async (req, res, next) => {
  const carts = await Cart.find();
  res.status(200).json({
    message: "successfully get all carts",
    carts,
  });
};

module.exports.addToCart = async (decode, req, res, next) => {
  const { userId } = decode;
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId }).select(
    "price discount count"
  );
  if (product.count != 0) {
    const oldCart = await Cart.findOne({ userId });
    let updatedCart = null;
    if (oldCart) {
      const { products, price, productCount } = oldCart;
      products.push(productId);
      updatedCart = await Cart.findOneAndUpdate(
        { userId },
        {
          $set: {
            products,
            productCount: productCount + 1,
            price: price + calcPrice(product.price, product.discount),
          },
        },
        {
          new: true,
        }
      );
    } else {
      updatedCart = await new Cart({
        userId,
        products: [productId],
        price: calcPrice(product.price, product.discount),
        productCount: 1,
      }).save();
    }
    if (updatedCart) {
      await Product.updateOne(
        { _id: product._id },
        {
          $set: {
            count: product.count - 1,
          },
        }
      );
      res.status(200).json({
        message: "product add successfully",
        updatedCart,
      });
    }
  }
  res.status(406).json({ message: "product out of stock now" });
};
module.exports.getCartByUserId = async (decode, req, res, next) => {
  const { userId } = decode;
  const usId = req.params["userId"];
  if (userId == usId) {
    const cart = await Cart.findOne({ userId }).populate({
      path: "products",
      select: "brand model price discount images",
    });
    res.status(200).json({
      message: "successfully get cart",
      cart,
    });
  } else {
    res.status(202).json({
      message: "auth faild",
    });
  }
};
module.exports.deleteCartByUserId = async (decode, req, res, next) => {
  const { userId } = decode;
  const usId = req.params["userId"];
  if (userId == usId) {
    const cart = await Cart.findOneAndDelete({ userId });
    res.status(200).json({
      message: "successfully delete cart",
      cart,
    });
  } else {
    res.status(202).json({
      message: "auth faild",
    });
  }
};
module.exports.removeProduct = async (decode, req, res, next) => {
  // FIRST GET PRODUCT ID AND USER ID
  const { productId } = req.params;
  const { userId } = decode;
  // GET OLD CART TO UPDATE IT
  const oldCart = await Cart.findOne({ userId }).populate({
    path: "products",
    select: "price discount",
  });
  // EXTRACT INFO FROM OLD CART
  let { products, productCount, price } = oldCart;
  // IF IT IS THE LAST PRODUCT IN CART THEN WE DELETE THE CART
  if (products.length == 1 && products[0]._id == productId) {
    await Cart.deleteOne({ userId });
    res.status(200).json({
      message: "cart deleted ",
    });
  } else {
    // FIND INDEX OF PRODUCT TO REMOVE
    const index = products.findIndex((p) => {
      return p._id == productId;
    });
    const prodPrice = products[index].price;
    const prodDiscount = products[index].discount;
    products.splice(index, 1);
    // AFTER UPDATE THE PRODUCT PROPERTY THEN LISTEN CHANGES TO DATA BASE
    const newCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $set: {
          products,
          productCount: productCount - 1,
          price: price - calcPrice(prodPrice, prodDiscount),
        },
      },
      { new: true }
    );
    await Product.findByIdAndUpdate(productId, {
      $inc: {
        count: 1,
      },
    });
    res.status(200).json({
      message: "product removed from cart ",
      newCart,
    });
  }
};
module.exports.getCartForUnAuthUser = async (req, res, next) => {
  const { cartProducts } = req.body;
  console.log(cartProducts);
  let products = [];
  let price = 0;

  for (let id of cartProducts) {
    const product = await Product.findById(id).select(
      "brand model price discount images"
    );
    products.push(product);
    price += product.price - product.price * (product.discount / 100);
  }
  res.status(200).json({
    message: "products",
    cart: { products, productCount: products.length, price },
  });
};
module.exports.getCartProductCount = async (decode, req, res, next) => {
  const userId = decode.userId;
  const { productCount } = await Cart.findOne({ userId }).select(
    "productCount"
  );
  if (productCount) {
    res.status(200).json({
      productCount,
    });
  } else {
    res.status(200).json({
      productCount: 0,
    });
  }
};

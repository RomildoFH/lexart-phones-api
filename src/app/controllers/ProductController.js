const ProductService = require('../services/ProductServices');

class ProductController {
  async createOne(req, res) {
    let { name, details, price, brand, model, color } = req.body;

    if (details) {
      brand = details.brand;
      model = details.model;
      color = details.color;
    };

    if (!name || !brand || !price || !color || !model) {
      return res.status(404).json({message: "All fields are required"});
    };

    const payload = {
      name,
      brand,
      model,
      color,
      price,
    };

    const {type, message} = await ProductService.create(payload);

    return res.status(type).json(message);
  };

  async createMany(req, res) {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(404).json({message: "At least one product must be specified"});
    };

    const newProducts = await Promise.all(products.map(async(product, index) => {
      const { name, brand, model, data } = product;

      if (!name || !brand || !model || !data) {
        return { type: 500, messsage: "All fields are required" }
      }
      const response = await Promise.all(product.data.map(async(details, subIndex) => {
        const { price, color } = details;

        if (!price || isNaN(price) || !color) {
          return { type: 500, messsage: `Data fields malformed on index [${index}, ${subIndex}]` }
        };

        const payload = {
          name: product.name,
          brand: product.brand,
          model: product.model,
          price: details.price,
          color: details.color,
        };

        const newProduct = await ProductService.create(payload);
        return newProduct;
      }));
      return response;
    }));

    if (newProducts?.length) {
      return res.status(201).json(newProducts.flat());
    };

    return res.status(500).json({message: "Error creating new products"});
  };
};

module.exports = new ProductController();

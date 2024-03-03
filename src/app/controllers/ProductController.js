const ProductService = require('../services/ProductServices');

class ProductController {
  async createOne(req, res) {
    const { name, details, price } = req.body;
    let { brand, model, color } = req.body;

    if (details) {
      brand = details.brand;
      model = details.model;
      color = details.color;
    };

    if (!name || !brand || !price || !color) {
      return res.status(404).json({message: "All fields are required"});
    };

    const payload = {
      name,
      brand,
      model,
      color,
      price,
    }

    const {type, message} = await ProductService.create(payload);

    return res.status(type).json(message);
  };
};

module.exports = new ProductController();

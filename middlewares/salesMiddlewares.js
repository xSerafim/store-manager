const JOI = require('joi');

const productSchema = JOI.object({
  productId: JOI.number().required().messages({
    'number.base': '400*"quantity" must be a number',
    'any.required': '400*"productId" is required',
  }),
  quantity: JOI.number().min(1).required().messages({
    'number.base': '400*"quantity" must be a number',
    'number.min': '422*"quantity" must be greater than or equal to 1',
    'any.required': '400*"quantity" is required',
  }),
});

function validateProduct(req, _res, next) {
  const results = req.body;
  results.forEach((result) => {
    const { error } = productSchema.validate(result);
    if (error) throw error;
  });

  next();
}

module.exports = {
  validateProduct,
};
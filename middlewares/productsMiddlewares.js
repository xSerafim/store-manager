const JOI = require('joi');

const productSchema = JOI.object({
  name: JOI.string().min(5).required().messages({
    'string.base': '400*"name" must be a string',
    'string.min': '422*"name" length must be at least 5 characters long',
    'string.required': '400*"name" is required',
  }),
  quantity: JOI.number().min(1).required().messages({
    'number.base': '400*"quantity" must be a string',
    'number.min': '422*"quantity" must be greater than or equal to 1',
    'number.required': '400*"quantity" is required',
  }),
});

function validateProduct(req, _res, next) {
  const { error } = productSchema.validate(req.body);
  if (error) throw error;

  next();
}

module.exports = {
  validateProduct,
};

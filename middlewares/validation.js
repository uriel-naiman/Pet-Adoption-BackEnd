const Ajv = require('ajv');
const ajv = new Ajv();

function validate(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    console.log(req.body.data);
    const valid = validate(req.body.data);
    if (!valid) {
      res.status(400);
      res.send({ errors: validate.errors });
    } else {
      next();
    }
  }
}

exports.validate = validate;
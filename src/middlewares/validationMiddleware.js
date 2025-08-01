// Middleware to validate request body using Joi schemas

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });


      if (error) {
        const details = error.details.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));

        return res.status(400).json({
          message: "Validation failed",
          error: details,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Unexpected error in validation middleware",
        error: err.message,
      });
    }
  };
};

export default validate;

import { ValidationChain, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run each validation middleware
    await Promise.all(validations.map((validation) => validation.run(req)));
    // Extract any validation errors from the request
    const errors = validationResult(req);
    // If there are no validation errors, continue with the request
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  };
};

const loginValidator = [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be at least 8 characters long"),
];

const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];

const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];

export { validate, loginValidator, signupValidator, chatCompletionValidator };

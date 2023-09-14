import joi from "joi";

export const validateSignUp = (userData) => {
  const Schema = joi.object({
    username: joi.string().required().min(5),
    fullname: joi.string().required().min(5),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    following: joi.array(),
  });

  return Schema.validateAsync(userData);
};

export const validateSignIn = (userData) => {
  const Schema = joi.object({
    email: joi.string().email(),
    username: joi.string().min(5), 
    password: joi.string().min(5).required(),
  })
  .or('email', 'username') 
  return Schema.validateAsync(userData);
};

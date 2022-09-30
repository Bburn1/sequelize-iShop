import { NEW_ITEM_VALIDATION_SCHEMA, CHANGE_ITEM_VALIDATION_SCHEMA } from "../utils/validationSchema";

import createError from "http-errors";

export const validateNewItem = async (req, res, next) => {
  const body = req.body;
  try {
    await NEW_ITEM_VALIDATION_SCHEMA.validate(body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

export const validateChangeItem = async (req, res, next) => {
  const body = req.body;
  if (await CHANGE_ITEM_VALIDATION_SCHEMA.isValid(body)){
    return next()
  }
  
  next(createError(422, 'Unprocessable Entity'));
  
}

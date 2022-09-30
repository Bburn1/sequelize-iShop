import * as Yup from "yup";

const SOME_ID_SCHEMA = Yup.number('')
  .positive('must be a positive number')
  .integer('must be an integer')

const PRICE_SCHEMA = Yup.number('').positive('must be a positive number')


export const NEW_ITEM_VALIDATION_SCHEMA = Yup.object().shape({
  category_id: SOME_ID_SCHEMA,
  type_id: SOME_ID_SCHEMA,
  model_id: SOME_ID_SCHEMA,
  brand_id: SOME_ID_SCHEMA,
  store_id: SOME_ID_SCHEMA,
  price: PRICE_SCHEMA.required(),
})

export const CHANGE_ITEM_VALIDATION_SCHEMA = Yup.object().shape({

  category_id: SOME_ID_SCHEMA,
  type_id: SOME_ID_SCHEMA,
  model_id: SOME_ID_SCHEMA,
  brand_id: SOME_ID_SCHEMA,
  store_id: SOME_ID_SCHEMA,
  price: PRICE_SCHEMA,
  
})


export const PAGINATION_SCHEMA = Yup.object().shape({
  limit: Yup.number().min(1).max(10).required(),
  offset: Yup.number().required(),
})

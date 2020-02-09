/**
 * Contains express middlewares for validating routes
 **/

/*** Helpers ***/

const isValidId = id => {
  const n = Number(id);
  return !Number.isNaN(n) && n > 0;
};
const isString = x => typeof x === "string";
const isNonEmptyString = x => isString(x) && x.length > 0;

/*** Middlewares ***/

/* Validates req.params.id */
const id = (req, res, next) => {
  const { id } = req.params;
  if (isValidId(id)) {
    next();
  } else {
    res.status(500).send(`Invalid id: '${id}'`);
  }
};

/* Validates req.body */
const groupBody = ({ body }, res, next) => {
  const validKeys = ["name", "description"];
  if (
    isNonEmptyString(body.name) && // 'name' exists
    (body.description == undefined || isString(body.description)) && // 'description' is string if it exists
    Object.keys(body).every(key => validKeys.includes(key)) // 'body' contains only 'name' and 'description'
  ) {
    next();
  } else {
    res.status(500).send(`Invalid body: '${JSON.stringify(body)}'`);
  }
};

module.exports = {
  id,
  groupBody
};

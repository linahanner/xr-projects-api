/**
 * Contains express middlewares for validating routes
 **/

/*** Helpers ***/

const isValidId = id => !Number.isNaN(Number(id));
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
  if (
    isNonEmptyString(body.name) &&
    isString(body.description) &&
    Object.keys(body).length === 2 // 'body' contains only 'name' and 'description'
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

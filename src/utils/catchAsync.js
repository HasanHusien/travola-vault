// with using this fn no need for try catch block
// and make don't repeat any code, ann make code
// readable and more pro, and catch error directly

module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

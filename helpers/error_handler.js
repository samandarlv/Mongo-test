const errorHandler = (req, res) => {
  res.status(500).send({ message: `Xatolik ${error}` });
};

module.exports = { errorHandler };

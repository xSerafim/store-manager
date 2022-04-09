function serverError(res, _error) {
  // console.log(error);
  return res.status(500).json({ message: 'Erro no servidor' });
}

module.exports = { serverError };

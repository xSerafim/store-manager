const express = require('express');

require('dotenv').config();

const salesRouter = require('./routers/sales');
const productsRouter = require('./routers/products');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(salesRouter);
app.use(productsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

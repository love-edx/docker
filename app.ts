import express from 'express';
const app = express();
const PORT = 4000;

async function helloWorld() {
  return { status: 200, message: 'Github PR strict action' };
}

app.get('/', async (req, res) => {
  res.status(200).send({ status: 200, message: 'Hello world!' });
});

app.listen(PORT, () =>
  console.log(`⚡Server is running here 👉 http://localhost:${PORT}`)
);

export { helloWorld };

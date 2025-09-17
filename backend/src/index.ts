import express from "express";
const app = express();

app.get("/(.*)", (req, res) => {
  res.status(200).send("¡El servidor mínimo de prueba FUNCIONA!");
});

export default app;

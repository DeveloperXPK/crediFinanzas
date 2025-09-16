import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { supabase } from "./config/supabaseCliente";
import clienteRoutes from './modulos/clientes/api/clientes.routes'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express entienda JSON en el body de las peticiones
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:4321",
};
app.use(cors(corsOptions));

// Endpoint de prueba para verificar la conexión
app.get("/api/applications", async (req, res) => {
  const { data, error } = await supabase
    .from("mst_tipoIdentificacion")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ applications: data });
});


app.use('/api', clienteRoutes);




app.listen(PORT, () => {
  console.log(`🚀 Servidor de negocio corriendo en http://localhost:${PORT}`);
});

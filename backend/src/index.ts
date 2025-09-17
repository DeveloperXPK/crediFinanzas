import express from "express";
// import bcrypt from "bcrypt"; // Para inicio de sesion y hash
import cors from "cors";
import { supabase } from "./config/supabaseCliente";
import creditoRoute from './modulos/credito/api/credito.routes'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express entienda JSON en el body de las peticiones
app.use(express.json());

const corsOptions = {
  origin: "*", // Permite peticiones de cualquier origen
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Métodos permitidos
  allowedHeaders: "Content-Type, Authorization", // Encabezados permitidos
};
app.use(cors(corsOptions));

// Nos permite recibir datos desde el body/urlencoded del formulario
app.use(express.urlencoded({ extended: true }));

app.use('/api/credito', creditoRoute);


app.post("/api/central", async (req, res) => {
  const { tipo_documento, numero_documento } = req.body;

  if (!tipo_documento || !numero_documento) {
    return res
      .status(400)
      .json({
        error:
          "Faltan parámetros requeridos: tipo_documento y numero_documento",
      });
  }

  try {
    const { data, error } = await supabase
      .from("central_riesgo")
      .select("puntaje")
      .match({ tipo_documento, numero_documento })
      .single();

    if (error) {
      return res.status(500).json({ error: "Error al obtener puntaje" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/api/credito/test", (req, res) => {
  res.status(200).send("¡La prueba desde INDEX.TS funciona!");
});

// app.listen(PORT, () => {
//   console.log(`🚀 Servidor de negocio corriendo en http://localhost:${PORT}`);
// }); ---> COMENTADA PARA EL DESPLIEGUE EN VERCEL

export default app;
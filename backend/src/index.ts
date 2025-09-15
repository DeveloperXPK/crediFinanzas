import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { supabase } from "./config/supabaseCliente";

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

// Registro de usuarios
app.post("/usuario/registro", async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      error: "El usuario y el password son necesarios",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("usuarios")
      .insert([
        {
          usuario: usuario,
          password: passwordHash,
          last_password: passwordHash,
        },
      ])
      .select();

    if (error) {
      return res.status(409).json({
        error: "El usuario ya existe",
        detalles: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Login usuario
app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      error: "El usuario y el password son necesarios",
    });
  }

  try {
    const { data: usuarios, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("usuario", usuario);

    // Validamos que tengamos registros de respuesta
    if (error || !usuarios || usuarios.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = usuarios[0];

    const passwordIsValid = await bcrypt.compare(password, user.password);

    // Validamos que la password coincida
    if (!passwordIsValid) {
      return res.status(401).json({ error: "Password erronea" });
    }

    res.status(200).json({
      message: "Inicio de sesion con exito!!",
      usuarioId: user.id,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de negocio corriendo en http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import { connectDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import ActorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
    res.send("Bienvenido al cine Iplacex");
});

// Rutas personalizadas
app.use("/api", peliculaRoutes);
app.use("/api", ActorRoutes);

// Iniciar servidor solo si MongoDB conecta correctamente
async function iniciarServidor() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("No fue posible iniciar el servidor:", error);
    }
}

iniciarServidor();
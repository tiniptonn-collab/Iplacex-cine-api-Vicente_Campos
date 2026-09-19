import express from "express";
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from "./controller.js";

const ActorRoutes = express.Router();

ActorRoutes.post("/actor", handleInsertActorRequest);

ActorRoutes.get("/actores", handleGetActoresRequest);

ActorRoutes.get("/actor/:id", handleGetActorByIdRequest);

// Se agrega "pelicula" para evitar choque con /actor/:id
ActorRoutes.get(
    "/actor/pelicula/:pelicula",
    handleGetActoresByPeliculaIdRequest
);

export default ActorRoutes;
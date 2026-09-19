import { ObjectId } from "mongodb";
import { getDB } from "../common/db.js";
import { Actor } from "./actor.js";

const actorCollection = () => getDB().collection("actores");
const peliculaCollection = () => getDB().collection("peliculas");


// INSERTAR ACTOR
export async function handleInsertActorRequest(req, res) {

    return peliculaCollection()
        .findOne({ nombre: req.body.pelicula })
        .then((pelicula) => {

            if (!pelicula) {
                return res.status(404).json({
                    mensaje: "Película no encontrada"
                });
            }

            const actor = {
                ...Actor,
                idPelicula: pelicula._id.toString(),
                nombre: req.body.nombre,
                edad: req.body.edad,
                estaRetirado: req.body.estaRetirado,
                premios: req.body.premios
            };

            return actorCollection()
                .insertOne(actor)
                .then((resultado) => {

                    return res.status(201).json({
                        mensaje: "Actor creado correctamente",
                        _id: resultado.insertedId,
                        ...actor
                    });

                })
                .catch((error) => {

                    return res.status(500).json({
                        mensaje: "Error al crear el actor",
                        error: error.message
                    });

                });

        })
        .catch((error) => {

            return res.status(500).json({
                mensaje: "Error al validar la película",
                error: error.message
            });

        });
}


// OBTENER TODOS LOS ACTORES
export async function handleGetActoresRequest(req, res) {

    return actorCollection()
        .find({})
        .toArray()
        .then((actores) => {

            return res.status(200).json(actores);

        })
        .catch((error) => {

            return res.status(500).json({
                mensaje: "Error al obtener los actores",
                error: error.message
            });

        });
}


// OBTENER ACTOR POR ID
export async function handleGetActorByIdRequest(req, res) {

    try {

        const id = new ObjectId(req.params.id);

        return actorCollection()
            .findOne({ _id: id })
            .then((actor) => {

                if (!actor) {
                    return res.status(404).json({
                        mensaje: "Actor no encontrado"
                    });
                }

                return res.status(200).json(actor);

            })
            .catch((error) => {

                return res.status(500).json({
                    mensaje: "Error al obtener el actor",
                    error: error.message
                });

            });

    } catch (error) {

        return res.status(400).json({
            mensaje: "Id mal formado"
        });

    }
}


// OBTENER ACTORES POR ID DE PELICULA
export async function handleGetActoresByPeliculaIdRequest(req, res) {

    try {

        const peliculaId = new ObjectId(req.params.pelicula);

        return peliculaCollection()
            .findOne({ _id: peliculaId })
            .then((pelicula) => {

                if (!pelicula) {
                    return res.status(404).json({
                        mensaje: "Película no encontrada"
                    });
                }

                return actorCollection()
                    .find({
                        idPelicula: peliculaId.toString()
                    })
                    .toArray()
                    .then((actores) => {

                        return res.status(200).json(actores);

                    })
                    .catch((error) => {

                        return res.status(500).json({
                            mensaje: "Error al obtener los actores",
                            error: error.message
                        });

                    });

            })
            .catch((error) => {

                return res.status(500).json({
                    mensaje: "Error al buscar la película",
                    error: error.message
                });

            });

    } catch (error) {

        return res.status(400).json({
            mensaje: "Id mal formado"
        });

    }
}
import { ObjectId } from "mongodb";
import { getDB } from "../common/db.js";
import { Pelicula } from "./pelicula.js";

const peliculaCollection = () => getDB().collection("peliculas");

// INSERTAR PELICULA
export async function handleInsertPeliculaRequest(req, res) {
    const pelicula = {
        ...Pelicula,
        nombre: req.body.nombre,
        generos: req.body.generos,
        anioEstreno: req.body.anioEstreno
    };

    return peliculaCollection()
        .insertOne(pelicula)
        .then((resultado) => {
            return res.status(201).json({
                mensaje: "Película creada correctamente",
                _id: resultado.insertedId,
                ...pelicula
            });
        })
        .catch((error) => {
            return res.status(500).json({
                mensaje: "Error al crear la película",
                error: error.message
            });
        });
}


// OBTENER TODAS LAS PELICULAS
export async function handleGetPeliculasRequest(req, res) {
    return peliculaCollection()
        .find({})
        .toArray()
        .then((peliculas) => {
            return res.status(200).json(peliculas);
        })
        .catch((error) => {
            return res.status(500).json({
                mensaje: "Error al obtener las películas",
                error: error.message
            });
        });
}


// OBTENER PELICULA POR ID
export async function handleGetPeliculaByIdRequest(req, res) {
    try {
        const id = new ObjectId(req.params.id);

        return peliculaCollection()
            .findOne({ _id: id })
            .then((pelicula) => {
                if (!pelicula) {
                    return res.status(404).json({
                        mensaje: "Película no encontrada"
                    });
                }

                return res.status(200).json(pelicula);
            })
            .catch((error) => {
                return res.status(500).json({
                    mensaje: "Error al obtener la película",
                    error: error.message
                });
            });

    } catch (error) {
        return res.status(400).json({
            mensaje: "Id mal formado"
        });
    }
}


// ACTUALIZAR PELICULA POR ID
export async function handleUpdatePeliculaByIdRequest(req, res) {
    try {
        const id = new ObjectId(req.params.id);

        const datosActualizar = {
            nombre: req.body.nombre,
            generos: req.body.generos,
            anioEstreno: req.body.anioEstreno
        };

        return peliculaCollection()
            .updateOne(
                { _id: id },
                {
                    $set: datosActualizar
                }
            )
            .then((resultado) => {
                if (resultado.matchedCount === 0) {
                    return res.status(404).json({
                        mensaje: "Película no encontrada"
                    });
                }

                return res.status(200).json({
                    mensaje: "Película actualizada correctamente"
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    mensaje: "Error al actualizar la película",
                    error: error.message
                });
            });

    } catch (error) {
        return res.status(400).json({
            mensaje: "Id mal formado"
        });
    }
}


// ELIMINAR PELICULA POR ID
export async function handleDeletePeliculaByIdRequest(req, res) {
    try {
        const id = new ObjectId(req.params.id);

        return peliculaCollection()
            .deleteOne({ _id: id })
            .then((resultado) => {
                if (resultado.deletedCount === 0) {
                    return res.status(404).json({
                        mensaje: "Película no encontrada"
                    });
                }

                return res.status(200).json({
                    mensaje: "Película eliminada correctamente"
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    mensaje: "Error al eliminar la película",
                    error: error.message
                });
            });

    } catch (error) {
        return res.status(400).json({
            mensaje: "Id mal formado"
        });
    }
}
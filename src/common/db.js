import { MongoClient } from "mongodb";

const uri = "mongodb+srv://tiniptonn_db_user:Xhv68!KRBzVL.sN@eva-u3-express.ivp7kjk.mongodb.net/?appName=eva-u3-express";

const client = new MongoClient(uri);

let db;

export async function connectDB() {
    try {
        await client.connect();
        db = client.db("cine");
        console.log("Conectado correctamente a MongoDB Atlas");
        return db;
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        throw error;
    }
}

export function getDB() {
    if (!db) {
        throw new Error("La base de datos aún no está conectada");
    }
    return db;
}
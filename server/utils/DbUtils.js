import mongoose from "mongoose";
import configDb from '../constant/configDb';


export function dbCreateConnection() {
    mongoose.connect(`mongodb://${configDb.db.host}:${configDb.db.port}/${configDb.db.name}`);
}

export function dbCloseConnection() {
    mongoose.connection.close();
}
import { Schema, model } from "mongoose";
import { IContact } from "../interfaces";

const contactSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    }
});


export const Contact = model<IContact>("contacts", contactSchema);
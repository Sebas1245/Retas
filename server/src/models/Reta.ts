import { Document, Model, model, Types, Schema } from "mongoose"
import { IUser } from "./User"

export interface IReta {
    name: string,
    description: string,
    date: Date,
    hours: number,
    minutes: number,
    duration: number,
    location: string,
    private: boolean,
    min_participants?: number,
    max_participants?: number,
    confirmed_users: IUser[]
}

interface IRetaDocument extends IReta, Document {
    confirmed_users: Types.Array<IUser>;
}
// TMethodsAndOverrides
type RetaDocumentProps = {
    confirmed_users: Types.DocumentArray<IUser>;
};

type RetaModelType = Model<IUser, RetaDocumentProps>;

const RetaSchema: Schema<IRetaDocument, RetaModelType> = new Schema<IRetaDocument, RetaModelType>({
    name: { type: String, required: [true, "Name is missing!"] },
    description: { type: String, required: [true, "No description was provided!"] },
    date: { type: Date, required: [true, "No date was provided!"] },
    hours: { type: Number, required: [true, "No start time was provided!"]},
    minutes: { type: Number, required: [true, "No start minutes were provided!"] },
    duration: { type: Number, required: [true, "No duration was provided!"] },
    location: { type: String, required: [true, "No location was provided!"] },
    private: { type: Boolean, default: false },
    min_participants: { type: Number, min: 2 },
    max_participants: { type: Number, min: 2 },
    confirmed_users: { type: [{ type: Types.ObjectId , ref: "User" }]} // check if this actually works
});

const RetaModel = model<IRetaDocument>('Reta', RetaSchema);

export default RetaModel;
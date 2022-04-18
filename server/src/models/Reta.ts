import { Document, Model, model, Types, Schema } from "mongoose"
import { IUser } from "./User"

export interface IReta {
    name: string;
    description: string;
    date: Date;
    hours: number;
    minutes: number;
    duration: number;
    location: string;
    is_private: boolean;
    min_participants: number;
    max_participants: number;
    confirmed_users: IUser[];
    admin: Types.ObjectId;
    is_active: boolean;
}

interface IRetaDocument extends IReta, Document {
    confirmed_users: Types.Array<IUser>;
    admin: Types.ObjectId;
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
    hours: { type: Number, required: [true, "No start time was provided!"], min: 0, max: 23},
    minutes: { type: Number, required: [true, "No start minutes were provided!"], min: 0, max: 59 },
    duration: { type: Number, required: [true, "No duration was provided!"], min: 1},
    location: { type: String, required: [true, "No location was provided!"] },
    is_private: { type: Boolean, default: false },
    min_participants: { type: Number, min: 2, default: 2 },
    max_participants: { type: Number, min: 2, default: 2 },
    confirmed_users: { type: [{ type: Types.ObjectId , ref: "User" }]},
    admin: { type: Schema.Types.ObjectId, ref: "User", required: [true, "Need an admin for the event"] },
    is_active: { type: Boolean, default: true }
});

const RetaModel = model<IRetaDocument>('Reta', RetaSchema);

export default RetaModel;
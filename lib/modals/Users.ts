import { Model, Schema, model, models } from "mongoose";

interface Users {
    nameuser: String;
    value: number;
    Month: Schema.Types.ObjectId;
}

const UsersSchema: Schema = new Schema({
    nameuser: { type: String, required: true },
    value: { type: Number, required: true },
    dataPag: { type: String, required: true },
    Month: { type: Schema.Types.ObjectId, ref: "Month", required: true }

})

const Users: Model<Users> = model<Users>("User", UsersSchema)


export default Users;
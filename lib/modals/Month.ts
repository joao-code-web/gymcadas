import { Model, Schema, model, models } from "mongoose";

interface Month {
    Month: String;
}

const MonthSchema: Schema = new Schema<Month>({
    Month: { type: String, require: true },
})

const Month: Model<Month> = model<Month>("Month", MonthSchema);


export default Month;
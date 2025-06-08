import mongoose, { Schema } from "mongoose";

const OtherSchema = new mongoose.Schema({
       
       message: { type: String, },
       totaluser: { type: Number, default:12000},
       
});

const Other = mongoose.model("Other", OtherSchema);
export default Other;


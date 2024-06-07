import mongoose from "mongoose";

const LinksSchema = mongoose.Schema({
    originalUrl:String,
    clicks: [
        {
            insertedAt: Date,
            ipAddress: String,
            targetParamValue: String
        }
    ],
    targetParamName: String,
    targetValues: [
        {
            name: String,
            value: String
        }
    ]
});
export default mongoose.model("links", LinksSchema);

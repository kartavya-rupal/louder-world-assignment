import mongoose from "mongoose";

const importLogSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        importedBy: String,
        notes: String
    },
    { timestamps: true }
);

export default mongoose.model("ImportLog", importLogSchema);

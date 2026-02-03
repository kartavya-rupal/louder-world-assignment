import mongoose from "mongoose";

const emailLeadSchema = new mongoose.Schema(
    {
        email: String,
        consent: Boolean,
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    },
    { timestamps: true }
);

export default mongoose.model("EmailLead", emailLeadSchema);

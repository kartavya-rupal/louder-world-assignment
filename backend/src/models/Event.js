import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: String,
        dateTime: String,
        venue: String,
        address: String,
        city: { type: String, default: "Sydney" },
        description: String,
        category: [String],
        imageUrl: String,
        source: String,
        sourceUrl: { type: String, unique: true },

        status: {
            type: String,
            enum: ["new", "updated", "inactive", "imported"],
            default: "new"
        },

        lastHash: String,
        lastScrapedAt: Date,

        importedAt: Date,
        importedBy: String,
        importNotes: String
    },
    { timestamps: true }
);

export default mongoose.model("Event", eventSchema);

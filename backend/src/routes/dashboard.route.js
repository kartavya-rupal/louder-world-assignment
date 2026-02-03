import express from "express";
import Event from "../models/Event.js";
import ImportLog from "../models/ImportLog.js";

const router = express.Router();

router.get("/events", async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

router.patch("/events/:id/import", async (req, res) => {
    const event = await Event.findById(req.params.id);

    event.status = "imported";
    event.importedAt = new Date();
    event.importedBy = "dashboard-user";
    event.importNotes = req.body.notes || "";

    await event.save();

    await ImportLog.create({
        eventId: event._id,
        importedBy: "dashboard-user",
        notes: req.body.notes
    });

    res.json({ success: true });
});

export default router;

import express from "express";
import Event from "../models/Event.js";
import EmailLead from "../models/EmailLead.js";

const router = express.Router();

router.get("/", async (_, res) => {
    const events = await Event.find({ status: { $ne: "inactive" } });
    res.json(events);
});

router.post("/:id/lead", async (req, res) => {
    const { email, consent } = req.body;
    await EmailLead.create({
        email,
        consent,
        eventId: req.params.id
    });
    res.json({ success: true });
});

export default router;

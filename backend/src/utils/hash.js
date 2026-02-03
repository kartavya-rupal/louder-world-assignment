import crypto from "crypto";

export const hashEvent = (event) => {
    const raw = `${event.title}${event.dateTime}${event.venue}${event.description}`;
    return crypto.createHash("md5").update(raw).digest("hex");
};

import Event from "../models/Event.js";
import { hashEvent } from "../utils/hash.js";
import { isUpdated } from "./diffUtils.js";
import { scrapeEventbrite } from "./eventbrite.js";
import { scrapeEventbriteDetails } from "./eventbritedetails.js";

export const runScraper = async () => {
    console.log("Running scraper...");

    const scrapedEvents = await scrapeEventbrite();
    const seenUrls = new Set();

    const MAX_DETAIL_SCRAPES = 5;
    let detailScrapeCount = 0;

    for (const e of scrapedEvents) {
        if (!e.title || !e.sourceUrl) continue;

        seenUrls.add(e.sourceUrl);
        const existing = await Event.findOne({ sourceUrl: e.sourceUrl });

        if (!existing) {
            let details = {};

            if (detailScrapeCount < MAX_DETAIL_SCRAPES) {
                try {
                    details = await scrapeEventbriteDetails(e.sourceUrl);
                    detailScrapeCount++;
                } catch {
                    console.error("Detail scrape failed:", e.sourceUrl);
                }
            }

            await Event.create({
                ...e,
                ...details,
                lastHash: hashEvent({ ...e, ...details }),
                lastScrapedAt: new Date(),
                status: "new"
            });

            continue;
        }

        const newHash = hashEvent(existing);

        if (isUpdated(existing.lastHash, newHash)) {
            existing.lastHash = newHash;
            existing.status = "updated";
            existing.lastScrapedAt = new Date();
            await existing.save();
        }
    }

    await Event.updateMany(
        {
            source: "Eventbrite",
            sourceUrl: { $nin: [...seenUrls] },
            status: { $ne: "inactive" }
        },
        { status: "inactive" }
    );

    console.log("Scraping completed");
};

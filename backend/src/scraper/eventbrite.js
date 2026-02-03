import puppeteer from "puppeteer";

export const scrapeEventbrite = async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,
        args: [
            "--start-maximized",
            "--disable-blink-features=AutomationControlled"
        ]
    });

    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
    );

    await page.goto(
        "https://www.eventbrite.com.au/d/australia--sydney/events/",
        { waitUntil: "domcontentloaded" }
    );

    // ✅ VERSION-SAFE WAIT
    await new Promise(resolve => setTimeout(resolve, 5000));

    const events = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll("a[href*='/e/']"));

        return links.slice(0, 20).map(link => ({
            title: link.innerText.trim(),
            dateTime: "",
            venue: "",
            city: "Sydney",
            description: "",
            category: [],
            imageUrl: "",
            source: "Eventbrite",
            sourceUrl: link.href
        }));
    });

    await browser.close();

    return events.filter(e => e.title.length > 5);
};

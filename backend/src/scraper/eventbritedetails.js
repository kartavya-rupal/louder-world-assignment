import puppeteer from "puppeteer";

export const scrapeEventbriteDetails = async (url) => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--disable-blink-features=AutomationControlled"]
    });

    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "domcontentloaded" });

    await new Promise(r => setTimeout(r, 3000));

    const details = await page.evaluate(() => {
        const dateTime =
            document.querySelector("time")?.innerText?.trim() || "";

        const venue =
            document.querySelector("[data-testid='venue-name']")?.innerText?.trim() ||
            "";

        const description =
            document.querySelector("[data-testid='event-description']")?.innerText
                ?.trim()
                ?.slice(0, 500) || "";

        const imageUrl =
            document.querySelector("img")?.getAttribute("src") || "";

        return { dateTime, venue, description, imageUrl };
    });

    await browser.close();
    return details;
};

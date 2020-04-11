// Imports
// ----------------------------------------
const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

// Constants
// ----------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;
const VERSION = process.env.VERSION || "1.0.0";

// Config
// ----------------------------------------
app.use(cors());

// Puppeteer Request
// ----------------------------------------
const SearchAmazon = async (query) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (
      req.resourceType() == "stylesheet" ||
      req.resourceType() == "font" ||
      req.resourceType() == "image"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`https://www.amazon.com/s?k=${query}`);

  const getData = await page.evaluate(() => {
    console.log("getData");
    const data = [];
    const items = document.querySelector(
      ".s-result-list.s-search-results.sg-row"
    );

    for (let i = 0; i < items.children.length; i++) {
      const name = items.children[i].querySelector("h2 > a span");
      const url = items.children[i].querySelector("h2 > a");
      const image = items.children[i].querySelector("img");
      const price = items.children[i].innerHTML.match(
        /\$([0-9]+|[0-9]+,[0-9]+).([0-9]+)/g
      );
      if (name || url || image || price) {
        data.push({
          name: (name && name.innerText) || "Unknown Name",
          url: (url && url.getAttribute("href")) || "Unknown URL",
          image: (image && image.getAttribute("src")) || "Unknown Image URL",
          price:
            (price && price.length > 0 && price[0].replace(/[\$\,]/g, "")) ||
            "0.00",
        });
      }
    }

    return data;
  });

  // Close page and browser
  await page.close();
  await browser.close();

  return getData;
};

// Endpoints
// ----------------------------------------
app.get("/", (_req, res) => res.send({ version: VERSION }));

app.get("/search", async (req, res) => {
  const { q } = req.query;
  // Validate if query is empty
  if (!q || q.length === 0) {
    return res.status(422).send({
      message: "Missing or invalid 'q' value for search.",
    });
  }

  // Amazon's Query Formatted
  const amazonQuery = q.replace(" ", "+");

  return res.send({ data: await SearchAmazon(amazonQuery) });
});

// Start Server
// ----------------------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

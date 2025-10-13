// require("dotenv").config({ path: ".env.local" });
import "dotenv/config";

import { spaceImport } from "contentful-import";
import exportFile from "./export.json" assert { type: "json" };

// const spaceImport = require("contentful-import");
// const exportFile = require("./export.json");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN } = process.env;

console.log(CONTENTFUL_MANAGEMENT_TOKEN);
console.log(CONTENTFUL_SPACE_ID);

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
  throw new Error(
    [
      "Parameters missing...",
      "Please run the setup command as follows",
      "CONTENTFUL_SPACE_ID=XXX CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-XXX npm run setup",
    ].join("\n"),
  );
}

spaceImport({
  spaceId: CONTENTFUL_SPACE_ID,
  managementToken: CONTENTFUL_MANAGEMENT_TOKEN,
  content: exportFile,
})
  .then(() => console.log("The content model of your space is set up!"))
  .catch((e) => console.error(e));

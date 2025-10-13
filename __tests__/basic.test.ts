// import dependencies
import React, { ReactElement } from "react";

// import react-testing methods
import { render, screen } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

import Page from "@/app/page";

jest.mock("@/lib/api", () => ({
  getAllPosts: jest.fn(() => Promise.resolve([])),
}));

jest.mock("next/headers", () => ({
  draftMode: jest.fn(() => Promise.resolve({ isEnabled: false })),
}));

const SyncPageWrapper = (): ReactElement => {
  const [content, setContent] = React.useState<ReactElement | null>(null);

  React.useEffect(() => {
    (async () => {
      const pageContent = await Page();
      if (typeof pageContent === "object" && pageContent !== null) {
        setContent(pageContent as ReactElement);
      }
    })();
  }, []);

  return content || React.createElement("div", null, "Loading...");
};

test("Checks if 'No posts found' is rendered in homepage", async () => {
  render(React.createElement(SyncPageWrapper));
  expect(
    await screen.findByText(
      "No posts found. Please check your Contentful configuration.",
    ),
  ).toBeInTheDocument();
});

test("Checks if the word 'Blog' is rendered on the homepage", async () => {
  render(React.createElement(SyncPageWrapper));
  expect(await screen.findByText(/Blog/)).toBeInTheDocument();
});

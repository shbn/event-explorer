import React from "react";
import { render } from "@testing-library/react";
import ShortlistEventCard from "../ShortlistEventCard";

test("renders shortlist event card", () => {
  const event = {
    id: 1,
    name: "Sample Event",
    images: [{ ratio: "3_2", url: "sample-url" }],
  };

  const { getByAltText, getByText } = render(
    <ShortlistEventCard event={event} />
  );

  const eventImage = getByAltText(/Sample Event/i);
  const eventName = getByText(/Sample Event/i);

  expect(eventImage).toBeInTheDocument();
  expect(eventName).toBeInTheDocument();
});

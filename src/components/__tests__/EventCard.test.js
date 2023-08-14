import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import EventCard from "../EventCard";

test("renders event card", () => {
  const event = {
    id: 1,
    name: "Sample Event",
    images: [{ ratio: "3_2", url: "sample-url" }],
    classifications: [
      {
        genre: {
          name: "Sample Genre",
        },
      },
    ],
    dates: {
      start: {
        localDate: "2023-08-13",
        localTime: "10:00 AM",
      },
    },
    _embedded: {
      venues: [{ name: "Sample Venue" }],
    },
  };

  const { getByText } = render(<EventCard event={event} />);
  const eventName = getByText(/Sample Event/i);
  expect(eventName).toBeInTheDocument();
});

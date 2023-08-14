import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import EventModal from "../EventModal";

test("renders event modal", () => {
  const event = {
    id: 1,
    name: "Sample Event",
    images: [{ ratio: "16_9", url: "sample-url" }],
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
    pleaseNote: "Sample note",
  };

  const isOpen = true;
  const onClose = jest.fn();
  const onShortlist = jest.fn();

  const { getByText, getByAltText } = render(
    <EventModal
      event={event}
      isOpen={isOpen}
      onClose={onClose}
      onShortlist={onShortlist}
    />
  );

  const eventName = getByText(/Sample Event/i);
  const eventImage = getByAltText(/Sample Event/i);
  const genreText = getByText(/Genre: Sample Genre/i);
  const startDateText = getByText(/Start Date: 2023-08-13/i);
  const startTimeText = getByText(/Start Time: 10:00 AM/i);
  const venueText = getByText(/Venue: Sample Venue/i);
  const pleaseNoteText = getByText(/Please Note: Sample note/i);
  const shortlistButton = getByText(/Shortlist/i);

  expect(eventName).toBeInTheDocument();
  expect(eventImage).toBeInTheDocument();
  expect(genreText).toBeInTheDocument();
  expect(startDateText).toBeInTheDocument();
  expect(startTimeText).toBeInTheDocument();
  expect(venueText).toBeInTheDocument();
  expect(pleaseNoteText).toBeInTheDocument();
  expect(shortlistButton).toBeInTheDocument();

  // Simulate clicking the Shortlist button
  fireEvent.click(shortlistButton);
  expect(onShortlist).toHaveBeenCalled();
});

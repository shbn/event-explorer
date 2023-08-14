import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShortlistPopup from "../ShortlistPopup";

describe("ShortlistPopup", () => {
  const shortlistedEvents = [
    {
      id: 1,
      name: "Sample Event 1",
      images: [{ ratio: "3_2", url: "sample-url" }],
    },
    {
      id: 2,
      name: "Sample Event 2",
      images: [{ ratio: "3_2", url: "sample-url" }],
    },
  ];

  it("renders without errors", () => {
    render(
      <ShortlistPopup
        isOpen={true}
        onClose={() => {}}
        shortlistedEvents={shortlistedEvents}
      />
    );

    // Check that the component renders without errors
    expect(screen.getByText("Shortlisted Events")).toBeInTheDocument();
    expect(screen.getByText("Sample Event 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Event 2")).toBeInTheDocument();
  });

  it("displays 'You have not shortlisted any events yet' when there are no shortlisted events", () => {
    render(
      <ShortlistPopup isOpen={true} onClose={() => {}} shortlistedEvents={[]} />
    );

    expect(
      screen.getByText("You have not shortlisted any events yet")
    ).toBeInTheDocument();
  });
});

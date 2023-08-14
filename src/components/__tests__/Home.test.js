import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Home";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { searchEvents } from "../../redux/actions/eventActions";
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../redux/actions/CategoryActions.js", () => ({
  fetchCategories: jest.fn(),
}));

jest.mock("../../redux/actions/eventActions.js", () => ({
  searchEvents: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
  });

  it("renders the component correctly", () => {
    render(<Home />);
    const titleElement = screen.getByText("Event Explorer");
    expect(titleElement).toBeInTheDocument();

    const shortlistButton = screen.getByText("Shortlisted Events (0)");
    expect(shortlistButton).toBeInTheDocument();

    const searchInput = screen.getByLabelText("Search Events");
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();

    const shortlistPopup = screen.queryByText("Shortlisted Events");
    expect(shortlistPopup).not.toBeInTheDocument();

    const noEventsMessage = screen.getByText("No events found");
    expect(noEventsMessage).toBeInTheDocument();
  });

  test("calls searchEvents when search form is submitted", () => {
    render(<Home />);

    const searchInput = screen.getByLabelText("Search Events");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "New keyword" } });
    fireEvent.click(searchButton);

    expect(searchEvents).toHaveBeenCalledWith("New keyword", "");
  });
});

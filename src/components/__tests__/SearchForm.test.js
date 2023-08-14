import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../SearchForm";

describe("SearchForm", () => {
  const searchKeyword = "Sample keyword";
  const setSearchKeyword = jest.fn();
  const selectedCategory = "Category A";
  const setSelectedCategory = jest.fn();
  const handleSearch = jest.fn();
  const categoryNames = ["Category A", "Category B", "Category C"];

  it("renders without errors", () => {
    render(
      <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleSearch={handleSearch}
        categoryNames={categoryNames}
      />
    );

    expect(screen.getByLabelText("Search Events")).toBeInTheDocument();
    expect(screen.getByLabelText("Category A")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("calls setSearchKeyword and setSelectedCategory when input values change", () => {
    const setSearchKeyword = jest.fn();
    const setSelectedCategory = jest.fn();

    render(
      <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleSearch={handleSearch}
        categoryNames={categoryNames}
      />
    );

    const searchInput = screen.getByLabelText("Search Events");
    fireEvent.change(searchInput, { target: { value: "New keyword" } });
    expect(setSearchKeyword).toHaveBeenCalledWith("New keyword");
  });

  it("calls handleSearch when the search button is clicked", () => {
    render(
      <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleSearch={handleSearch}
        categoryNames={categoryNames}
      />
    );

    const searchButton = screen.getByRole("button", { name: "Search" });
    userEvent.click(searchButton);

    expect(handleSearch).toHaveBeenCalled();
  });
});

import { render, screen, logRoles } from "@testing-library/react";
import React, { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
const AppContext = React.createContext();

describe("Search component", () => {
    test("Renders Search Component", () => {
        // Arrange
    const {searchRender}=render(
        <Search />
    );
    logRoles(searchRender);
    // Act
    // ... nothing

    // Assert
    const mySearchComponent = screen.getByTestId("mysearch", { exact: false });
    expect(mySearchComponent).toBeInTheDocument();
      });
  test("Renders Search Component Heading", () => {
    const onSubmit = jest.fn();
    var query="titanic";
    var isError={ show: "false", msg: "" };
    // Arrange
    const component= render(
      <AppContext.Provider
        value={{
          isError,
          query
        }}
      >
        <Search onSubmit={onSubmit} />
      </AppContext.Provider>
    );

    
    // Act
    // ... nothing
    // Assert
    component.find('input').simulate('change', { target: { value: 'titanic' } });
    const searchHeadingElement = screen.getByText(
      "Search Your Favourite Movie",
      { exact: true }
    );
    expect(searchHeadingElement).toBeInTheDocument();
  });
});

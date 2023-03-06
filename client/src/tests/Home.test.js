import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("Home component", () => {
  test("Renders Home Component Add", () => {
    // Arrange
    render(
        <Home />
    );
    // Act
    // ... nothing

    // Assert
    const homeAddElement = screen.getByText("Add Movie", { exact: false });
    expect(homeAddElement).toBeInTheDocument();
  });
});

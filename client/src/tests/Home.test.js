import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("Home component", () => {
  test("Renders Home Component", () => {
    // Arrange
    render(
        <Home />
    );
    // Act
    // ... nothing

    // Assert
    const myHomeComponent = screen.getByTestId("myhome", { exact: false });
    expect(myHomeComponent).toBeInTheDocument();
  });
});

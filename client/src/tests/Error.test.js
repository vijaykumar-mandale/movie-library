import { render, screen } from "@testing-library/react";
import Error from "../components/Error";

describe("Error component", () => {
    test("Renders Error Component Heading", () => {
        // Arrange
        render(
            <Error />
        );
        // Act
        // ... nothing
        
        // Assert
        const errorHeadingElement = screen.getByText(
            "Error",
            { exact: false }
          );
        expect(errorHeadingElement).toBeInTheDocument();
  });
});

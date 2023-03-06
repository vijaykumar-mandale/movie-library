import { render, screen } from "@testing-library/react";
import EditMovie from "../components/EditMovie";

describe("EditMovie component", () => {
    test("Renders EditMovie Component Heading", () => {
        // Arrange
        render(
            <EditMovie />
        );
        // Act
        // ... nothing
        
        // Assert
        const editMovieHeadingElement = screen.getByText(
            "Edit Movie",
            { exact: false }
          );
        expect(editMovieHeadingElement).toBeInTheDocument();
  });
});

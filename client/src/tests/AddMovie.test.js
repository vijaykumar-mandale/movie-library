import { fireEvent,render, screen } from "@testing-library/react";
import AddMovie from "../components/AddMovie";

describe("AddMovie component", () => {
    test("Renders AddMovie Component Heading", () => {
        // Mockup functions
    const handleSubmit = jest.fn();

    const { queryByText } = render(
      <AddMovie
      handleSubmit={handleSubmit}
      />
    );

    // Test by query by text click fireEvent to have called times
    const submit = queryByText("Submit");
    fireEvent.click(submit);
    expect(handleSubmit).toHaveBeenCalledTimes(0);
        
        // Assert
        // const addMovieHeadingElement = screen.getByText(
        //     "Add Movie",
        //     { exact: false }
        //   );
        // expect(addMovieHeadingElement).toBeInTheDocument();
  });
});

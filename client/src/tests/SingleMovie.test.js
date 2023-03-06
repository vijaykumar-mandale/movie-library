import { render, fireEvent, screen } from "@testing-library/react";
import SingleMovie from "../components/SingleMovie";
import React, { useContext, useEffect, useState } from "react";
const AppContext = React.createContext();


describe("SingleMovie component", () => {
  test("Renders SingleMovie Component", () => {
    const isLoading=true;
    const movie = [{"id":5,"name":"Jurassic Park","released":"1993-05-11","genre":"Action, Adventure, Sci-Fi","director":"Steven Spielberg","actors":"Sam Neill, Laura Dern, Jeff Goldblum","details":"Jurassic Park Movie details","photo":"1678085135264-jurassic-park.jpg"},{"id":4,"name":"Superman","released":"2000-12-15","genre":"Action, Adventure, Sci-Fi","director":"Richard Donner","actors":"Christopher Reeve, Margot Kidder, Gene Hackman","details":"Superman Movie details","photo":"1678085118704-superman.jpg"},{"id":3,"name":"Batman","released":"1999-05-23","genre":"Action, Adventure","director":"Tim Burton","actors":"Michael Keaton, Jack Nicholson, Kim Basinger","details":"Batman Movie details","photo":"1678085078849-batman.jpg"},{"id":2,"name":"Titanic: The Legend Goes On...","released":"2000-10-15","genre":"Animation, Family, Fantasy","director":"Camillo Teti","actors":"Lisa Russo, Mark Thompson-Ashworth, Gisella Mathews","details":"Titanic Movie details","photo":"1678085061136-titanic-the.jpg"},{"id":1,"name":"Titanic","released":"1997-12-19","genre":"Drama, Romance","director":"James Cameron","actors":"Leonardo DiCaprio, Kate Winslet, Billy Zane","details":"Titanic Movie details","photo":"1678084970020-titanic.jpg"}];
  const handleDelete = jest.fn();
  const movieDelete = jest.fn();
  const { queryByText } = render(
    <AppContext.Provider
    value={{
      isLoading,
      movie
    }}
  >
      <SingleMovie handleDelete={handleDelete} movieDelete={movieDelete}/>
      </AppContext.Provider>
  );

  const deleteMovie = queryByText("Delete");
  fireEvent.click(deleteMovie);
  expect(handleDelete).toHaveBeenCalledTimes(0);
  });
});

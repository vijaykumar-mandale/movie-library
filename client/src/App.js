import React from "react";
import Home from "./components/Home";
import SingleMovie from "./components/SingleMovie";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<SingleMovie />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;

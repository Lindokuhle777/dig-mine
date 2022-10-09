import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { AuthContextProvider } from "./Authentication";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

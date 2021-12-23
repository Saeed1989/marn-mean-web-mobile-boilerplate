import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layout/MainLayout";
import { AppProvider } from "./contexts/app";

function App() {
  return (
    <div className="container-fluid">
      <header class="p-3 mb-2 bg-dark text-white">
        <div className="container d-flex" style={{ maxWidth: 960 }}>
          <div className="row justify-content-center align-self-center">
            <div className="logo">
              <h1 className="header">MERN Boilerplate</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container d-flex bg-light" style={{ maxWidth: 960 }}>
        <div className="row justify-content-center align-self-center">
          <AppProvider>
            <Router>
              <MainLayout />
            </Router>
          </AppProvider>
        </div>
      </div>

      <footer></footer>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Main } from "./Pages/Main";
import { AppProvider } from "./contexts/app";

export function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header className="container p-3 mb-2 bg-dark text-white">
        <div className="container d-flex flex-column" style={{ maxWidth: 960 }}>
          <div className="row justify-content-center align-self-center">
            <div className="logo">
              <h1 className="header">MERN Boilerplate</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container flex-fill bg-light" style={{ maxWidth: 960 }}>
        <AppProvider>
          <Router>
            <Main />
          </Router>
        </AppProvider>
      </main>

      <footer className="container">
        <div className="d-flex flex-column">
          <div className="row justify-content-center align-self-center">
            This is footer
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layout/MainLayout";
import { AppProvider } from "./contexts/app";
const { Header, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <div className="container d-flex" style={{ maxWidth: 960 }}>
          <div className="row justify-content-center align-self-center">
            <div className="logo">
              <h1 className="header">MERN Boilerplate</h1>
            </div>
          </div>
        </div>
      </Header>

      <div className="container d-flex" style={{ maxWidth: 960 }}>
        <div className="row justify-content-center align-self-center">
          <AppProvider>
            <Router>
              <MainLayout />
            </Router>
          </AppProvider>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

export default App;

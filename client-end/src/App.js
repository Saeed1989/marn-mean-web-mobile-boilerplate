import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layout/MainLayout";
const { Header, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <div class="container d-flex" style={{ maxWidth: 960 }}>
          <div class="row justify-content-center align-self-center">
            <div className="logo">
              <h1 className="header">MERN Boilerplate</h1>
            </div>
          </div>
        </div>
      </Header>

      <div class="container d-flex" style={{ maxWidth: 960 }}>
        <div class="row justify-content-center align-self-center">
          <Router>
            <MainLayout />
          </Router>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

export default App;

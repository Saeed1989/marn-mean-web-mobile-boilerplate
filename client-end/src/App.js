import React from "react";
import { Layout, Space } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layout/MainLayout";
const { Header, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Space>
          <div className="logo">
            <h1 className="header">MERN Boilerplate</h1>
          </div>
        </Space>
      </Header>
      <Router>
        <MainLayout />
      </Router>
      <Footer />
    </Layout>
  );
}

export default App;

import React from "react";
import { Layout } from "antd";
import { Container, Row } from "react-bootstrap";

export const MainLayout = () => {
  return (
    <Layout>
      <Container>
        <Row>First row</Row>
        <Row>Second row</Row>
      </Container>
    </Layout>
  );
};

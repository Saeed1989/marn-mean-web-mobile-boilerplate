import React from "react";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

export const MainLayout = () => {
  return (
    <Layout>
      <Layout style={{ minHeight: "90vh" }}>
        <Sider width={300} style={{ background: "#fff" }}>
          <Menu mode="inline" style={{ height: "90vh", borderRight: 5 }}>
            Menu works
          </Menu>
        </Sider>

        <Layout style={{ padding: "6px" }}>
          <Content className="main-content">Content works</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

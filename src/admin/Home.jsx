import "antd/dist/antd.css";
import { Image } from "antd";
import { Layout, Menu } from "antd";
import SideBar from "./SideBar";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie, Column } from "@ant-design/plots";
import Header from "./Header";

const { Content, Footer, Sider } = Layout;

const DemoColumn = () => {
  const data = [
    {
      type: "Tháng 1-2",
      value: 270,
    },
    {
      type: "Tháng 3-4",
      value: 200,
    },
    {
      type: "Tháng 5-6",
      value: 300,
    },
    {
      type: "Tháng 7-8",
      value: 400,
    },
    {
      type: "Tháng 9-10",
      value: 250,
    },
    {
      type: "Tháng 11-12",
      value: 150,
    },
  ];
  const paletteSemanticRed = "#F4664A";
  const brandColor = "#5B8FF9";
  const config = {
    data,
    xField: "type",
    yField: "value",
    seriesField: "",
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};

const DemoPie = () => {
  const data = [
    {
      type: "B1",
      value: 30,
    },
    {
      type: "B2",
      value: 25,
    },
    {
      type: "C1",
      value: 28,
    },
    {
      type: "Toeic",
      value: 17,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 12,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

const DemoPie1 = () => {
  const data = [
    {
      type: "B1",
      value: 40,
    },
    {
      type: "B2",
      value: 20,
    },
    {
      type: "C1",
      value: 10,
    },
    {
      type: "Toeic",
      value: 30,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    colorField: "type",
    angleField: "value",
    color: ["#FA5B48", "#A88CAF", "#F09016", "#15976D "],
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 12,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default function Home() {
  return (
    <Layout style={{ position: "relative", bottom: 400 }}>
      <SideBar />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: "0px 16px 0", overflow: "initial" }}>
          <Header />
          <div
            className="column"
            style={{ width: 600, height: 350, margin: "20px 180px" }}
          >
            <h3
              style={{
                margin: "20px 0",
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Statistics on the number of registered students
            </h3>
            <DemoColumn />
          </div>
          <div
            className="list-column"
            style={{
              margin: "100px",
            }}
          >
            <h3
              style={{
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Statistics on the number of students who are studying and have
              obtained certificates
            </h3>
            <div className="d-flex">
              <div className="studing" style={{ width: 400, height: 350 }}>
                <DemoPie />
                <h6
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Studying
                </h6>
              </div>
              <div className="complete" style={{ width: 400, height: 350 }}>
                <DemoPie1 />
                <h6
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  Certificated
                </h6>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

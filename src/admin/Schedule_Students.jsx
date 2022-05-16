import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import {
  Modal,
  Button,
  notification,
  Table,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Radio,
  Popconfirm,
  message,
  Tag,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  BrowserRouter as Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Header from "./Header";

// const [form] = Form.useForm();

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const { Content, Footer } = Layout;

export default function Schedule_Students() {
  const [scheduleList, setScheduleList] = useState([]);
  const navigate = useNavigate();
  const { classId } = useParams();

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/schedule_students/${classId}`
        );
        const studentScheduleList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setScheduleList(studentScheduleList);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getSchedule();
  }, []);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const columns = [
    { title: "#", dataIndex: "key" },
    {
      title: "Fullname",
      dataIndex: "studentName",
    },
    { title: "Gender", dataIndex: "gender" },
    { title: "DOB", dataIndex: "DOB" },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  return (
    <>
      <SideBar />
      <Layout
        className="site-layout"
        style={{ marginLeft: 200, position: "relative", bottom: 300 }}
      >
        <Content style={{ margin: "0 16px 0", overflow: "initial" }}>
          <Header />
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <Table
              columns={columns}
              dataSource={scheduleList}
              onChange={onChange}
            />
          </div>
        </Content>
      </Layout>
    </>
  );
}

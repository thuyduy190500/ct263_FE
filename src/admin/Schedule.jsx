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

export default function Schedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const res = await axios.get("http://localhost:8000/schedule");

        setScheduleList(res.data);
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
    { title: "#", dataIndex: "" },
    {
      title: "Class",
      dataIndex: "class",
    },
    { title: "Schoolday", dataIndex: "schoolday" },
    {
      title: "Session Start",
      dataIndex: "sessionStart",
    },

    {
      title: "Session End",
      dataIndex: "sessionEnd",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
    },
    { title: "Classroom", dataIndex: "classroom" },
    // {
    //   title: "Level",
    //   dataIndex: "level",
    //   filters: [
    //     {
    //       text: "B1",
    //       value: "B1",
    //     },
    //     {
    //       text: "B2",
    //       value: "B2",
    //     },
    //     {
    //       text: "C1",
    //       value: "C1",
    //     },
    //     {
    //       text: "Toeic",
    //       value: "Toeic",
    //     },
    //   ],
    //   onFilter: (value, record) => record.levelName.startsWith(value),
    //   filterSearch: true,
    // },

    // {
    //   title: "Classtype",
    //   dataIndex: "classtype",
    //   filters: [
    //     {
    //       text: "Basic 1",
    //       value: "Basic 1",
    //     },
    //     {
    //       text: "Basic 2",
    //       value: "Basic 2",
    //     },
    //     {
    //       text: "Review",
    //       value: "Review",
    //     },
    //   ],
    //   onFilter: (value, record) => record.classtypeName.startsWith(value),
    //   filterSearch: true,
    // },
    {
      title: "View",
      dataIndex: "index",
      render: (set, record) => (
        <>
          <div className="d-flex">
            <Button>
              <Link to={"../schedule_students/" + record.classId}>
                <EyeOutlined />
              </Link>
            </Button>
          </div>
        </>
      ),
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

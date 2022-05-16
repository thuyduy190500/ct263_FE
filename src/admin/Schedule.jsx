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
import ReactHTMLTableToExcel from "react-html-table-to-excel";

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

  //   const [classView, setClassView] = useState();
  //   const viewStudents = async (e) => {
  //     setClassView(e.target.id);
  //     // navigate("../schedule_students/" + classView);
  //   };
  //   console.log("aaaa", classView);

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
      <div className="a">
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
              {/* <Table
              columns={columns}
              dataSource={scheduleList}
              onChange={onChange}
            /> */}
              <div
                style={{
                  fontSize: 15,
                  position: "relative",
                  bottom: 30,
                }}
              >
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table_excel"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="Export"
                />
              </div>

              <table className="table table-striped" id="table_excel">
                <thead className="thead-dark">
                  <tr style={{ textTransform: "uppercase", fontSize: 14 }}>
                    <th scope="col">#</th>
                    <th scope="col">Class</th>
                    <th scope="col">Schoolday</th>
                    <th scope="col">Session Start</th>
                    <th scope="col">Session End </th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Classroom</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleList.map((schedule, index) => {
                    return (
                      <>
                        <tr
                          style={{
                            fontSize: 16,
                            fontFamily: "Times New Roman",
                          }}
                        >
                          <th>{index + 1}</th>
                          <th>{schedule.class}</th>
                          <th>{schedule.schoolday}</th>
                          <th>{schedule.sessionStart}</th>
                          <th>{schedule.sessionEnd}</th>
                          <th>{schedule.teacher}</th>
                          <th>{schedule.classroom}</th>
                          <th>
                            <Button>
                              <Link
                                to={"../schedule_students/" + schedule.classId}
                              >
                                <EyeOutlined />
                              </Link>
                            </Button>
                          </th>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
}

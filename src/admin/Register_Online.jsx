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

export default function Register_Online() {
  const [registerList, setRegisterList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/registerOnline_list"
        );
        const lastUser = res.data[res.data.length - 1];
        const aUser = res.data.slice(0, res.data.length - 1);
        const tempArr = [lastUser, ...aUser];
        console.log(tempArr);
        console.log(res.data);

        setRegisterList(tempArr);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getUsers();
  }, []);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  // UPDATE STATUS IN REGISTERONLINE
  const text = "Are you sure to change this status to 'Confirmed'?";
  const [updateStatusId, setupdateStatusId] = useState();

  function updateStatus(record) {
    setupdateStatusId(record.id);
  }
  const handleOkUpdateStatus = async () => {
    const status = "Confirmed";
    const res = await axios.put(
      `http://localhost:8000/registeronline/update/status/${updateStatusId}`,
      {
        status: status,
      }
    );
    if (res.status === 200) {
      message.info("Change status successful");
    } else {
      message.info("Change status fail");
    }
    window.location.reload();
  };

  const columns = [
    { title: "#", dataIndex: "" },
    { title: "Fullname", dataIndex: "fullName" },
    {
      title: "Level",
      dataIndex: "levelName",
      filters: [
        {
          text: "B1",
          value: "B1",
        },
        {
          text: "B2",
          value: "B2",
        },
        {
          text: "C1",
          value: "C1",
        },
        {
          text: "Toeic",
          value: "Toeic",
        },
      ],
      onFilter: (value, record) => record.levelName.startsWith(value),
      filterSearch: true,
    },

    {
      title: "Classtype",
      dataIndex: "classtypeName",
      filters: [
        {
          text: "Basic 1",
          value: "Basic 1",
        },
        {
          text: "Basic 2",
          value: "Basic 2",
        },
        {
          text: "Review",
          value: "Review",
        },
      ],
      onFilter: (value, record) => record.classtypeName.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Class",
      dataIndex: "className",
      // filters: [
      //   {
      //     text: "hihi",
      //     value: "hi",
      //   },
      //   {
      //     text: "haha",
      //     value: "ha",
      //   },
      // ],
      onFilter: (value, record) => record.className.startsWith(value),
      filterSearch: true,
    },
    { title: "Created at", dataIndex: "createAt" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        if (text === "Unprocess") {
          return <Tag color="red">{text}</Tag>;
        } else {
          return <Tag color="blue">{text}</Tag>;
        }
      },
    },
    {
      title: "Setting",
      dataIndex: "index",
      render: (set, record) => (
        <>
          <div className="d-flex">
            <Popconfirm
              placement="top"
              title={text}
              onConfirm={handleOkUpdateStatus}
              okText="OK"
              cancelText="Cancel"
            >
              <Button onClick={(e) => updateStatus(record)}>
                Change Status
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              onClick={(e) => deleteStudent(record)}
            ></Button>
          </div>
        </>
      ),
    },
  ];

  // DELETE
  const [form] = Form.useForm();

  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
  };
  const [idDelete, setIdDelete] = useState();

  function deleteStudent(record) {
    setIsModalVisibleDelete(true);
    setIdDelete(record.id);
  }

  const successNotificationDelete = (type) => {
    notification[type]({
      message: "Successfully",
      description: "Delete student success",
    });
  };

  const errorNotificationDelete = (type) => {
    notification[type]({
      message: "Fail",
      description: "Delete student fail",
    });
  };

  const handleOkDelete = async () => {
    const res = await axios.delete(
      `http://localhost:8000/registeronline/delete/${idDelete}`
    );
    setIsModalVisibleDelete(false);
    if (res.status === 200) {
      successNotificationDelete("success");
      //   navigate("/registeronline");
      window.location.reload();
    } else {
      errorNotificationDelete("error");
      window.location.reload();
    }
  };

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
              dataSource={registerList}
              onChange={onChange}
            />
          </div>
        </Content>
      </Layout>
      {/* FORM DELETE */}
      <Modal
        title="Basic Modal"
        visible={isModalVisibleDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Form form={form}></Form>
        <p> Are you sure to delete the this student </p>
      </Modal>
    </>
  );
}

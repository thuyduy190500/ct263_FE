import "antd/dist/antd.css";
import { Layout } from "antd";
import { Modal, Button, notification, Form, Input } from "antd";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHome,
  faCommenting,
} from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Header from "./Header";

const { Content, Footer } = Layout;

export default function HocVien() {
  const [userList, setUserList] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDel, setIsModalVisibleDel] = useState(false);
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users");
        const lastUser = res.data[res.data.length - 1];
        const aUser = res.data.slice(0, res.data.length - 1);
        const tempArr = [lastUser, ...aUser];
        // console.log(tempArr);
        setUserList(tempArr);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getUsers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (event) => {
    // setIsModalVisible(false);
    const usernameAdd = form.getFieldValue("username");
    const passwordAdd = form.getFieldValue("password");
    const res = await axios.post(`http://localhost:8000/user`, {
      username: usernameAdd,
      pass: passwordAdd,
    });
    setIsModalVisible(false);
    if (res.status === 201) {
      successNotification("success");
      form.resetFields();
    } else {
      errorNotification("error");
      form.resetFields();
    }
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const username = values.username;
    const pass = values.password;
    const res = await axios.post("http://localhost:8000/user", {
      username,
      pass,
    });
    navigate("/hocvien");
    window.location.reload();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteUser = async (e) => {
    setIdDelete(e.target.id);
    setIsModalVisibleDel(true);
  };

  const handleOkDel = async () => {
    const res = await axios.delete(
      `http://localhost:8000/user/delete/${idDelete}`
    );
    setIsModalVisibleDel(false);
    window.location.reload();
  };

  const handleCancelDel = () => {
    setIsModalVisibleDel(false);
  };

  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState();
  useEffect(() => {
    async function fetchDataUser() {
      const res = await axios.get(`http://localhost:8000/user/${updateId}`);
      const user = res.data;
      form.setFieldsValue({ username1: user.username, password: user.pass });
    }
    fetchDataUser();
  }, [updateId]);

  const updateUser = async (e) => {
    setIsModalVisibleUpdate(true);

    const id = e.target.id;
    console.log(id);
    setUpdateId(id);
  };

  const successNotification = (type) => {
    notification[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  const errorNotification = (type) => {
    notification[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  const handleOkUpdate = async () => {
    const usernameUpdate = form.getFieldValue("username1");
    const passwordUpdate = form.getFieldValue("password");
    const res = await axios.put(
      `http://localhost:8000/user/update/${updateId}`,
      {
        username: usernameUpdate,
        pass: passwordUpdate,
      }
    );
    setIsModalVisibleUpdate(false);
    if (res.status === 200) {
      successNotification("success");
    } else {
      errorNotification("error");
    }
    window.location.reload();

    console.log("status", res.status);
  };

  const handleCancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };

  // useEffect(() => {
  //   form.setFieldsValue(defaultValues);
  // }, [form, defaultValues]);
  return (
    <>
      <SideBar />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: "0 16px 0", overflow: "initial" }}>
          <Header />
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <Button type="primary" onClick={showModal}>
              Thêm
            </Button>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">stt</th>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user, index) => {
                  return (
                    <>
                      <tr>
                        <th>{index + 1} </th>
                        <th scope="row" key={user.id}>
                          {user.id}
                        </th>
                        <td>{user.username}</td>
                        <td>
                          <button id={user.id} onClick={deleteUser}>
                            Xóa
                          </button>
                          <button id={user.id} onClick={updateUser}>
                            Sửa
                          </button>
                        </td>
                      </tr>
                      {/* delete */}
                      <Modal
                        title="Basic Modal"
                        visible={isModalVisibleDel}
                        onOk={handleOkDel}
                        onCancel={handleCancelDel}
                      >
                        <p id={user.id}> bạn có muốn xóa {user.id}</p>
                      </Modal>
                      {/* update */}
                      <Modal
                        title="Basic Modal"
                        visible={isModalVisibleUpdate}
                        onOk={handleOkUpdate}
                        onCancel={handleCancelUpdate}
                      >
                        <Form
                          form={form}
                          name="basic"
                          labelCol={{
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 16,
                          }}
                          initialValues={{
                            remember: true,
                            // username1: username,
                          }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Username"
                            name="username1"
                            rules={[
                              {
                                required: true,
                                message: "Please input your username!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            wrapperCol={{
                              offset: 8,
                              span: 16,
                            }}
                          >
                            {/* <Button type="primary" htmlType="submit">
                              Submit
                            </Button> */}
                          </Form.Item>
                        </Form>
                      </Modal>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Content>
      </Layout>
      <>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {/* <Button type="primary" htmlType="submit">
                Submit
              </Button> */}
            </Form.Item>
          </Form>
        </Modal>
      </>
    </>
  );
}

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
} from "antd";
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
const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const { Content, Footer } = Layout;

export default function HocVien() {
  const [userList, setUserList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [classtypeList, setClassTypeList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [checked, setChecked] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const [dateForm, setDateForm] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/students");

        // const lastUser = res.data[res.data.length - 1];
        // const aUser = res.data.slice(0, res.data.length - 1);
        // const tempArr = [lastUser, ...aUser];
        // console.log(tempArr);
        // console.log(res.data);
        setUserList(res.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getUsers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const onFinish = async (values) => {
  //   console.log("Success:", values);
  //   const fullname = values.fullname;
  //   const dob = values.dob;
  //   const gender = values.gender;
  //   const address = values.address;
  //   const phonenumber = values.phonenumber;
  //   const level = values.level;
  //   const classtype = values.classtype;
  //   const classes = values.class;
  //   console.log(
  //     "day ne",
  //     fullname,
  //     dob,
  //     gender,
  //     address,
  //     phonenumber,
  //     level,
  //     classtype,
  //     classes
  //   );

  // };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();

  const handleOk = async () => {
    const studentName = form.getFieldValue("fullname");
    const DOB = dateForm;
    const gender = form.getFieldValue("gender");
    const address = form.getFieldValue("address");
    const phoneNumber = form.getFieldValue("phonenumber");
    const levelId = form.getFieldValue("level");
    const classtypeId = form.getFieldValue("classtype");
    const classId = form.getFieldValue("class");
    const res = await axios.post("http://localhost:8000/students/create", {
      studentName,
      DOB,
      gender,
      address,
      phoneNumber,
      levelId,
      classtypeId,
      classId,
    });
    navigate("/students");
    window.location.reload();
  };

  const { Option } = Select;

  function handleChangeLevel(value) {
    console.log(`selected ${value}`);
  }
  useEffect(() => {
    const getLevels = async () => {
      try {
        const res = await axios.get("http://localhost:8000/levels");
        setLevelList(res.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getLevels();
  }, []);

  function handleChangeClasstype(value) {
    console.log(`selected ${value}`);
  }
  useEffect(() => {
    const getClasstypes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/classtypes");
        setClassTypeList(res.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getClasstypes();
  }, []);

  function handleChangeClass(value) {
    console.log(`selected ${value}`);
  }
  useEffect(() => {
    const getClass = async () => {
      try {
        const res = await axios.get("http://localhost:8000/classes");
        setClassList(res.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getClass();
  }, []);

  function onChangeRadio(e) {
    setChecked(e.target.value);
  }

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
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const columns = [
    { title: "STT", dataIndex: "index+1" },
    { title: "Họ tên", dataIndex: "studentName" },
    { title: "Giới tính", dataIndex: "gender" },
    { title: "DOB", dataIndex: "DOB" },
    { title: "Address", dataIndex: "address" },
    { title: "Phone Number", dataIndex: "phoneNumber" },

    {
      title: "Trình độ",
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
      ],
      onFilter: (value, record) => record.levelName.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Loại lớp",
      dataIndex: "classtypeName",
      filters: [
        {
          text: "Căn bản 1",
          value: "cb",
        },
        {
          text: "OT",
          value: "ot",
        },
      ],
      onFilter: (value, record) => record.classtypeName.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Tên lớp",
      dataIndex: "className",
      filters: [
        {
          text: "hihi",
          value: "hi",
        },
        {
          text: "haha",
          value: "ha",
        },
      ],
      onFilter: (value, record) => record.className.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Setting",
      dataIndex: "index",
      render: (set, record) => (
        <>
          <Button type="primary" onClick={(e) => deleteStudent(record)}>
            Delete
          </Button>
          <Button
            type="primary"
            // id={record.index}
            onClick={(e) => updateStudent(record)}
          >
            Update
          </Button>
        </>
      ),
    },
  ];

  function onChangeDate(date, dateString) {
    console.log("hihi", date, dateString);
    setDateForm(dateString);
  }

  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  // const updateStudent = async (e) => {
  //   setIsModalVisibleUpdate(true);
  //   // const id = e.target.id;
  //   console.log("id ne", e);
  //   // setUpdateId(id);
  // };
  const handleCancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };

  const [updateId, setUpdateId] = useState();
  const [idChekedFromRequest, setIdChekedFromRequest] = useState();
  const [dateFromRequest, setDateFromRequest] = useState();

  function updateStudent(record) {
    setIsModalVisibleUpdate(true);
    // console.log("params", record.DOB);
    form.setFieldsValue({
      fullname: record.studentName,
      gender: record.gender,
      dob: record.DOB,
      address: record.address,
      phonenumber: record.phoneNumber,
      level: record.levelName,
      class: record.className,
      classtype: record.classtypeName,
    });
    setIdChekedFromRequest(record.gender);
    setDateFromRequest(record.DOB);
    setUpdateId(record.id);
  }

  const handleOkUpdate = async () => {
    const studentName = form.getFieldValue("fullname");
    const DOB = dateForm;
    const gender = form.getFieldValue("gender");
    const address = form.getFieldValue("address");
    const phoneNumber = form.getFieldValue("phonenumber");
    const levelId = form.getFieldValue("level");
    const classtypeId = form.getFieldValue("classtype");
    const classId = form.getFieldValue("class");
    const res = await axios.put(
      `http://localhost:8000/student/update/${updateId}`,
      {
        studentName,
        gender,
        address,
        phoneNumber,
        classtypeId,
        classId,
      }
    );
    setIsModalVisibleUpdate(false);
    if (res.status === 200) {
      successNotification("success");
    } else {
      errorNotification("error");
    }
    window.location.reload();
  };

  // DELETE
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
  };
  function deleteStudent(record) {
    setIsModalVisibleDelete(true);
    // console.log("params", record.DOB);
    form.setFieldsValue({
      fullname: record.studentName,
      gender: record.gender,
      dob: record.DOB,
      address: record.address,
      phonenumber: record.phoneNumber,
      level: record.levelName,
      class: record.className,
      classtype: record.classtypeName,
    });
    setIdChekedFromRequest(record.gender);
    setDateFromRequest(record.DOB);
    setUpdateId(record.id);
  }
  const handleOkDelete = async () => {
    window.location.reload();
  };

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
            <Table
              columns={columns}
              dataSource={userList}
              onChange={onChange}
            />
          </div>
        </Content>
      </Layout>

      {/* FORM CREATE*/}

      <Modal
        title="Create Student"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        style={{ marginTop: "-50px" }}
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
          // onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input your fullname !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="DOB"
            name="dob"
            rules={[
              {
                required: true,
                message: "Please input your DOB !",
              },
            ]}
          >
            <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={moment("2015/01/01", dateFormat)}
                onChange={onChangeDate}
                format={dateFormat}
              />
            </Space>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input check gender !",
              },
            ]}
          >
            <Radio.Group name="radiogroup" onChange={onChangeRadio}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: "Please input your level!",
              },
            ]}
          >
            <Select placeholder="Choose level" onChange={handleChangeLevel}>
              {levelList.map((level) => {
                return <Option value={level.id}>{level.levelName}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Classtype"
            name="classtype"
            rules={[
              {
                required: true,
                message: "Please input your classtype!",
              },
            ]}
          >
            <Select
              placeholder="Choose Classtype"
              onChange={handleChangeClasstype}
            >
              {classtypeList.map((classtype) => {
                return (
                  <Option value={classtype.id}>
                    {classtype.classtypeName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[
              {
                required: true,
                message: "Please input your class!",
              },
            ]}
          >
            <Select placeholder="Choose Class" onChange={handleChangeClass}>
              {classList.map((classes) => {
                return <Option value={classes.id}>{classes.className}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </Modal>

      {/* FORM UPDATE */}

      <Modal
        title="Update Student"
        visible={isModalVisibleUpdate}
        onOk={handleOkUpdate}
        onCancel={handleCancelUpdate}
        width={800}
        style={{ marginTop: "-50px" }}
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
          // onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input your fullname !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="DOB"
            name="dob"
            rules={[
              {
                required: true,
                message: "Please input your DOB !",
              },
            ]}
          >
            <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={moment(dateFromRequest, dateFormat)}
                onChange={onChangeDate}
                format={dateFormat}
              />
            </Space>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input check gender !",
              },
            ]}
          >
            <Radio.Group
              name="radiogroup"
              onChange={onChangeRadio}
              checked={idChekedFromRequest}
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: "Please input your level!",
              },
            ]}
          >
            <Select placeholder="Choose level" onChange={handleChangeLevel}>
              {levelList.map((level) => {
                return <Option value={level.id}>{level.levelName}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Classtype"
            name="classtype"
            rules={[
              {
                required: true,
                message: "Please input your classtype!",
              },
            ]}
          >
            <Select
              placeholder="Choose Classtype"
              onChange={handleChangeClasstype}
            >
              {classtypeList.map((classtype) => {
                return (
                  <Option value={classtype.id}>
                    {classtype.classtypeName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[
              {
                required: true,
                message: "Please input your class!",
              },
            ]}
          >
            <Select placeholder="Choose Class" onChange={handleChangeClass}>
              {classList.map((classes) => {
                return <Option value={classes.id}>{classes.className}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </Modal>

      {/* FORM DELETE */}
      <Modal
        title="Basic Modal"
        visible={isModalVisibleDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p> bạn có muốn xóa</p>
      </Modal>
    </>
  );
}

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
        const customUserList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setUserList(customUserList);
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
  const [studentId, setStudentId] = useState();

  const handleOk = async () => {
    const studentName = form.getFieldValue("fullname");
    const DOB = dateForm;
    const gender = form.getFieldValue("gender");
    const address = form.getFieldValue("address");
    const phoneNumber = form.getFieldValue("phonenumber");
    const levelId = form.getFieldValue("level");
    const classtypeId = form.getFieldValue("classtype");
    const classId = form.getFieldValue("class");
    const total = form.getFieldValue("total1");
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
    if (res.status === 201) {
      // successNotificationCreate("success");
      // navigate("/students");
      handleCancel();
      showModalBill();
      console.log("debug");
      form.setFieldsValue({ fullname1: studentName });
      form.setFieldsValue({ level1: levelId });
      form.setFieldsValue({ classtype1: classtypeId });
      form.setFieldsValue({ class1: classId });

      const resFetchApi = await axios.get("http://localhost:8000/fees");
      console.log(resFetchApi.data);
      const totalFee = resFetchApi.data.record.fee;
      console.log("total", totalFee);

      form.setFieldsValue({ total1: totalFee });
      setStudentId(resFetchApi.data.studentId);
      // const res = get("Ssss",resStudent.classtype1,resStudent.levelId)
      // const billingDay = form.getFieldValue("reason1");
      // console.log("billing", billingDay);
      // console.log("total 1  ", total);

      // window.location.reload();
    } else {
      errorNotificationCreate("error");
    }
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

  const successNotificationCreate = (type) => {
    notification[type]({
      message: "Successfully",
      description: "Create  success",
    });
  };

  const errorNotificationCreate = (type) => {
    notification[type]({
      message: "Fail",
      description: "Create  fail",
    });
  };
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const columns = [
    { title: "#", dataIndex: "key" },
    { title: "Fullname", dataIndex: "studentName" },
    // { title: "Giới tính", dataIndex: "gender" },
    // { title: "DOB", dataIndex: "DOB" },
    // { title: "Address", dataIndex: "address" },
    // { title: "Phone Number", dataIndex: "phoneNumber" },

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
    {
      title: "Setting",
      dataIndex: "index",
      render: (set, record) => (
        <>
          <div className="d-flex">
            <Button>
              <Link to={"../detail_student/" + record.id}>
                <EyeOutlined />
              </Link>
            </Button>
            <Button
              // id={record.index}
              icon={<EditOutlined />}
              onClick={(e) => updateStudent(record)}
            ></Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={(e) => deleteStudent(record)}
            ></Button>
          </div>
        </>
      ),
    },
  ];

  function onChangeDate(date, dateString) {
    // console.log("hihi", date, dateString);
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
    const gender = form.getFieldValue("gender");
    const DOB = dateForm;
    const address = form.getFieldValue("address");
    const phoneNumber = form.getFieldValue("phonenumber");
    const levelId = form.getFieldValue("level");
    const classtypeId = form.getFieldValue("classtype");
    const classId = form.getFieldValue("class");
    const res = await axios.put(
      `http://localhost:8000/student/update/${updateId}`,
      {
        studentName: studentName,
        gender,
        DOB,
        address,
        phoneNumber,
        levelId,
        classtypeId,
        classId,
      }
    );
    setIsModalVisibleUpdate(false);
    if (res.status === 200) {
      successNotificationCreate("success");
      window.location.reload();
    } else {
      errorNotificationCreate("error");
    }
    console.log("fullname", studentName);
  };

  // DELETE
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
      `http://localhost:8000/student/delete/${idDelete}`
    );

    setIsModalVisibleDelete(false);
    if (res.status === 200) {
      successNotificationDelete("success");
      // navigate("/students");
      window.location.reload();
    } else {
      errorNotificationDelete("error");
      window.location.reload();
    }
  };
  // BILL
  const [isModalVisibleBill, setIsModalVisibleBill] = useState(false);
  const showModalBill = () => {
    setIsModalVisibleBill(true);
  };
  const handleCancelBill = () => {
    setIsModalVisibleBill(false);
  };

  const handleOkBill = async () => {
    const studentName = form.getFieldValue("fullname1");
    const billingday = dateForm;
    const levelId = form.getFieldValue("level1");
    const classtypeId = form.getFieldValue("classtype1");
    const classId = form.getFieldValue("class1");
    const total = form.getFieldValue("total1");
    const reason = form.getFieldValue("reason1");

    console.log(
      "bill",
      studentName,
      billingday,
      levelId,
      classtypeId,
      classId,
      total,
      reason
    );
    const res = await axios.post("http://localhost:8000/bill/create", {
      studentName,
      billingday,
      levelId,
      classtypeId,
      classId,
      total,
      reason,
      studentId,
    });
    if (res.status === 201) {
      successNotificationCreate("success");
      window.location.reload();
    } else {
      errorNotificationCreate("error");
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
            <Button
              type="primary"
              onClick={showModal}
              style={{ position: "relative", left: 250, bottom: 20 }}
            >
              Add
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
                // defaultValue={moment("", dateFormat)}
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
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
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
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
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
        title="Delete"
        visible={isModalVisibleDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Form form={form}></Form>
        <p> Are you sure to delete this student </p>
      </Modal>

      {/* FORM CREATE BILL */}
      <Modal
        title="Create Bill"
        visible={isModalVisibleBill}
        onOk={handleOkBill}
        onCancel={handleCancelBill}
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
            name="fullname1"
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
            label="Billing day"
            name="billingDay1"
            rules={[
              {
                required: true,
                message: "Please input your Billing day !",
              },
            ]}
          >
            <Space direction="vertical" size={12}>
              <DatePicker
                // defaultValue={moment("2015/01/01", dateFormat)}
                onChange={onChangeDate}
                format={dateFormat}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Level"
            name="level1"
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
            name="classtype1"
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
            name="class1"
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
          <Form.Item
            label="Total"
            name="total1"
            rules={[
              {
                required: true,
                message: "Please input your total !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason1"
            rules={[
              {
                required: true,
                message: "Please input your reason !",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

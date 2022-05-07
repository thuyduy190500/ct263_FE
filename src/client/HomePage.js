import React from "react";
import "./main.css";
import "antd/dist/antd.css";

import author1 from "./images/author-image1.jpg";
import author2 from "./images/author-image2.jpg";
import author3 from "./images/author-image3.jpg";
import author4 from "./images/author-image4.jpg";
import course1 from "./images/courses-image1.jpg";
import course2 from "./images/courses-image2.jpg";
import course3 from "./images/courses-image3.jpg";
import course4 from "./images/courses-image4.jpg";
import course5 from "./images/courses-image5.jpg";
import banner from "./images/banner.jpg";
import contact from "./images/contact-image.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import {
  Card,
  Col,
  Row,
  Avatar,
  Rate,
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
import {
  BrowserRouter as Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
const { Meta } = Card;
const { RangePicker } = DatePicker;

export default function HomePage() {
  const [userList, setUserList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [classtypeList, setClassTypeList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [checked, setChecked] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const dateFormat = "YYYY/MM/DD";

  const navigate = useNavigate();
  const [dateForm, setDateForm] = useState();
  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChangeDate(date, dateString) {
    // console.log("hihi", date, dateString);
    setDateForm(dateString);
  }

  function onChangeRadio(e) {
    setChecked(e.target.value);
  }

  function handleChangeLevel(value) {
    console.log(`selected ${value}`);
  }

  function handleChangeClasstype(value) {
    console.log(`selected ${value}`);
  }

  function handleChangeClass(value) {
    console.log(`selected ${value}`);
  }

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

  const handleRegister = async () => {
    const fullName = form.getFieldValue("fullname");
    const dob = dateForm;
    const gender = form.getFieldValue("gender");
    const address = form.getFieldValue("address");
    const phoneNumber = form.getFieldValue("phonenumber");
    const levelId = form.getFieldValue("level");
    const classtypeId = form.getFieldValue("classtype");
    const classId = form.getFieldValue("class");
    const res = await axios.post("http://localhost:8000/registeronline", {
      fullName,
      dob,
      gender,
      address,
      phoneNumber,
      levelId,
      classtypeId,
      classId,
    });
    if (res.status === 201) {
      successNotification("success");
      navigate("/homepage");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const successNotification = (type) => {
    notification[type]({
      message: "Successfully!",
      description: "You have successfully registered for the class",
    });
  };

  const errorNotification = (type) => {
    notification[type]({
      message: "Failed",
      description: "Fegistration Failed",
    });
  };

  return (
    <>
      <body
        id="top"
        data-spy="scroll"
        data-target=".navbar-collapse"
        data-offset="50"
      >
        <section
          className="navbar custom-navbar navbar-fixed-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
              </button>

              <a href="#" className="navbar-brand">
                Known
              </a>
            </div>

            <div className="navbar navbar-expand-lg navbar-light">
              <ul
                className="nav navbar-nav navbar-nav-first"
                style={{ fontSize: 15 }}
              >
                <li>
                  <a href="#top" className="smoothScroll">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#about" className="smoothScroll">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#team" className="smoothScroll">
                    Giảng viên
                  </a>
                </li>
                <li>
                  <a href="#courses" className="smoothScroll">
                    Khóa học
                  </a>
                </li>
                <li>
                  <a href="#testimonial" className="smoothScroll">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="smoothScroll">
                    Liên hệ
                  </a>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#">
                    <i className="fa fa-phone"></i> +65 2244 1100
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* <section id="home">
          <div className="row">
            <div className="owl-carousel owl-theme home-slider">
              <div className="item item-first">
                <div className="caption">
                  <div className="container">
                    <div className="col-md-6 col-sm-12">
                      <h1>Distance Learning Education Center</h1>
                      <h3>
                        Our online courses are designed to fit in your industry
                        supporting all-round with latest technologies.
                      </h3>
                      <a
                        href="#feature"
                        className="section-btn btn btn-default smoothScroll"
                      >
                        Discover more
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item item-second">
                <div className="caption">
                  <div className="container">
                    <div className="col-md-6 col-sm-12">
                      <h1>Start your journey with our practical courses</h1>
                      <h3>
                        Our online courses are built in partnership with
                        technology leaders and are designed to meet industry
                        demands.
                      </h3>
                      <a
                        href="#courses"
                        className="section-btn btn btn-default smoothScroll"
                      >
                        Take a course
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item item-third">
                <div className="caption">
                  <div className="container">
                    <div className="col-md-6 col-sm-12">
                      <h1>Efficient Learning Methods</h1>
                      <h3>
                        Nam eget sapien vel nibh euismod vulputate in vel nibh.
                        Quisque eu ex eu urna venenatis sollicitudin ut at
                        libero. Visit{" "}
                        <a
                          rel="nofollow"
                          href="https://www.facebook.com/templatemo"
                        >
                          templatemo
                        </a>{" "}
                        page.
                      </h3>
                      <a
                        href="#contact"
                        className="section-btn btn btn-default smoothScroll"
                      >
                        Let's chat
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <div className="image">
          <img src={banner} style={{ width: "100%", height: "600px" }} />
        </div>

        <section id="feature">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>01</span>
                  <h3>Giảng viên</h3>
                  <p>
                    Với đội ngũ giáo viên đầy nhiệt huyết cùng kinh nghiệm giảng
                    dạy chuẩn quốc tế
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>02</span>
                  <h3>Phương pháp</h3>
                  <p>
                    Với phương pháp học tập năng động, mang sứ mệnh truyền cảm
                    hứng cho những học viên
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>03</span>
                  <h3>Khóa học</h3>
                  <p>
                    Nhiều khoá học dành riêng cho từng độ tuổi và trình độ giúp
                    học viên có nền tảng vững chắc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="about-info">
                  <h1 style={{ fontWeight: "bold" }}>
                    3 yếu tố tạo nên chất lượng
                  </h1>
                  <br />
                  <figure>
                    <span>
                      <i className="fa fa-users"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>
                        Cơ sở vật chất hiện đại
                      </h3>
                      <p>
                        Trung tâm xây dựng với nhiều trang thiết bị hiện đại
                        mang lại sự thoải mái cho học viên.
                      </p>
                    </figcaption>
                  </figure>

                  <figure>
                    <span>
                      <i className="fa fa-certificate"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>
                        Chương trình học phong phú
                      </h3>
                      <p>
                        Tất cả chương trình học đều được nghiên cứu và xây dựng
                        dựa trên khung tham chiếu năng lực ngoại ngữ Châu Âu
                      </p>
                    </figcaption>
                  </figure>

                  <figure>
                    <span>
                      <i className="fa fa-bar-chart-o"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>
                        Đội ngũ giảng viên chuyên nghiệp
                      </h3>
                      <p>
                        Với bằng cấp chuyên môn và kinh nghiệm làm việc và tính
                        chuyên nghiệp nhằm đảm bảo chất lượng đầu ra cho học
                        viên.
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="col-md-offset-1 col-md-4 col-sm-12">
                <div className="entry-form">
                  <form action="#" method="post">
                    <h2>Để lại thông tin tư vấn</h2>
                    <input
                      type="text"
                      name="full name"
                      className="form-control"
                      placeholder="Họ tên"
                      required=""
                    />

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required=""
                    />

                    <button
                      className="submit-btn form-control"
                      id="form-submit"
                    >
                      Gửi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title">
                  <h2>
                    Giảng viên xuất sắc
                    {/* <small>Đảm bảo chất lượng giảng dạy</small> */}
                  </h2>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="team-thumb">
                  <div className="team-image">
                    <img
                      src={author1}
                      className="img-responsive"
                      alt=""
                      style={{ height: 220 }}
                    />
                  </div>
                  <div className="team-info">
                    <h3>Nguyễn Thị C</h3>
                    <span>I love Teaching</span>
                  </div>
                  <ul className="social-icon">
                    <li>
                      <a
                        href="#"
                        className="fa fa-facebook-square"
                        attr="facebook icon"
                      ></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-instagram"></a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="team-thumb">
                  <div className="team-image">
                    <img
                      src={author2}
                      className="img-responsive"
                      alt=""
                      style={{ height: 220 }}
                    />
                  </div>
                  <div className="team-info">
                    <h3>Alex</h3>
                    <span>Education is the key!</span>
                  </div>
                  <ul className="social-icon">
                    <li>
                      <a href="#" className="fa fa-google"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-instagram"></a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="team-thumb">
                  <div className="team-image">
                    <img
                      src={author3}
                      className="img-responsive"
                      alt=""
                      style={{ height: 220 }}
                    />
                  </div>
                  <div className="team-info">
                    <h3>Trần Văn E</h3>
                    <span>I like Online Courses</span>
                  </div>
                  <ul className="social-icon">
                    <li>
                      <a href="#" className="fa fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-envelope-o"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-linkedin"></a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="team-thumb">
                  <div className="team-image">
                    <img
                      src={author4}
                      className="img-responsive"
                      alt=""
                      style={{ height: 220 }}
                    />
                  </div>
                  <div className="team-info">
                    <h3>Võ Thị F</h3>
                    <span>Learning is fun</span>
                  </div>
                  <ul className="social-icon">
                    <li>
                      <a href="#" className="fa fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-google"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-behance"></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="courses">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title">
                  <h2>
                    Khóa học <small>Nâng cấp kỹ năng tiếng anh cho bạn</small>
                  </h2>
                </div>
                <div
                  className="site-card-wrapper"
                  style={{ textAlign: "center" }}
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card
                        style={{ width: 350, fontSize: 16 }}
                        cover={<img alt="example" src={course1} />}
                      >
                        <Meta
                          title="Trình độ B1"
                          description="3.000.000 - 4.500.000"
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        style={{ width: 350 }}
                        cover={<img alt="example" src={course2} />}
                      >
                        <Meta
                          title="Trình độ B2"
                          description="4.000.000 - 5.500.000"
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        style={{ width: 350 }}
                        cover={<img alt="example" src={course3} />}
                      >
                        <Meta
                          title="Trình độ C1"
                          description="5.000.000 - 6.500.000"
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonial">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title">
                  <h2>Student Reviews</h2>
                </div>
                <div className="site-card-wrapper">
                  <Row gutter={16}>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title="Anna Phạm"
                        description="Trying something new is exciting! Thanks for the amazing law course and the great teacher who was able to make it interesting."
                      />
                      <span>
                        <Rate value={4} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/jana" />
                        }
                        title="John Vũ"
                        description="You really do help young creative minds to get quality education and professional job search assistance. I’d recommend it to everyone!"
                      />
                      <span>
                        <Rate value={5} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/jon" />
                        }
                        title="David Trương"
                        description="Trying something new is exciting! Thanks for the amazing law course and the great teacher who was able to make it interesting."
                      />
                      <span>
                        <Rate value={4} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/jess" />
                        }
                        title="Lisa "
                        description="You really do help young creative minds to get quality education and professional job search assistance. I’d recommend it to everyone!"
                      />
                      <span>
                        <Rate value={5} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <Form
                  form={form}
                  name="basic"
                  id="contact-form"
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
                  <div className="col-md-12 col-sm-12" style={{ width: 700 }}>
                    <Form.Item
                      name="fullname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your fullname !",
                        },
                      ]}
                    >
                      <Input placeholder="Họ tên" style={{ borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item
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
                          // defaultValue={moment("2015/01/01", dateFormat)}
                          placeholder="Ngày sinh"
                          onChange={onChangeDate}
                          format={dateFormat}
                          style={{ borderRadius: 5 }}
                        />
                      </Space>
                    </Form.Item>
                    <Form.Item
                      // label="Gender"
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
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your address !",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Địa chỉ"
                        style={{ borderRadius: 5 }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phonenumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number !",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Số điện thoại"
                        style={{ borderRadius: 5 }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="level"
                      rules={[
                        {
                          required: true,
                          message: "Please input your level!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Trình độ"
                        onChange={handleChangeLevel}
                      >
                        {levelList.map((level) => {
                          return (
                            <Option value={level.id}>{level.levelName}</Option>
                          );
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="classtype"
                      rules={[
                        {
                          required: true,
                          message: "Please input your classtype!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Loại lớp"
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
                      name="class"
                      rules={[
                        {
                          required: true,
                          message: "Please input your class!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Lớp học"
                        onChange={handleChangeClass}
                      >
                        {classList.map((classes) => {
                          return (
                            <Option value={classes.id}>
                              {classes.className}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    ></Form.Item>
                  </div>
                  <div
                    class="col-md-4 col-sm-12"
                    style={{ position: "relative", bottom: 50, left: 150 }}
                  >
                    <Button onClick={handleRegister}>Đăng ký</Button>
                  </div>
                </Form>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="contact-image">
                  <img
                    src={contact}
                    className="img-responsive"
                    alt="Smiling Two Girls"
                    style={{ height: 520 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="footer-info">
                  <div className="section-title">
                    <h2>Địa chỉ</h2>
                  </div>
                  <address>
                    <p>
                      62/7 đường 3/2, phường Xuân Khánh
                      <br />
                      quận Ninh Kiều, tp Cần Thơ
                    </p>
                  </address>

                  <ul className="social-icon">
                    <li>
                      <a
                        href="#"
                        className="fa fa-facebook-square"
                        attr="facebook icon"
                      ></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-instagram"></a>
                    </li>
                  </ul>

                  <div className="copyright-text">
                    <p>Copyright &copy; 2019 Company Name</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="footer-info">
                  <div className="section-title">
                    <h2>Liên hệ</h2>
                  </div>
                  <address>
                    <p>+65 2244 1100, +66 1800 1100</p>
                    <p>
                      <a href="#">green@gmail.com</a>
                    </p>
                  </address>

                  <div className="footer_menu">
                    <h2>Quick Links</h2>
                    <ul>
                      <li>
                        <a href="#">Career</a>
                      </li>
                      <li>
                        <a href="#">Investor</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                      <li>
                        <a href="#">Refund Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="footer-info newsletter-form">
                  <div className="section-title">
                    <h2>Newsletter Signup</h2>
                  </div>
                  <div>
                    <div className="form-group">
                      <form action="#" method="get">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          name="email"
                          id="email"
                          required=""
                        />
                        <input
                          type="submit"
                          className="form-control"
                          name="submit"
                          id="form-submit"
                          value="Send me"
                        />
                      </form>
                      <span>
                        <sup>*</sup> Please note - we do not spam your email.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </>
  );
}

import "antd/dist/antd.css";
import { Layout, Collapse } from "antd";
import SideBar from "./SideBar";
import Header from "./Header";
import { CaretRightOutlined } from "@ant-design/icons";
import Students from "./Students";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../assets/css/Detail_Student.css";

const { Content, Footer } = Layout;

const { Panel } = Collapse;

export default function Detail_Students() {
  const [studentList, setStudentList] = useState([]);
  const [studentBill, setStudentBill] = useState();
  const [studentBill1, setStudentBill1] = useState();

  const { id } = useParams();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/student/${id}`);
        if (res.status == 200) {
          setStudentList(res.data);
          const resBill = await axios.get(`http://localhost:8000/bill/${id}`);
          // setStudentBill(resBill);
          if (resBill.data.length == 0) {
            setStudentBill1("No");
          } else {
            setStudentBill1("Yes");
          }
        } else {
        }
      } catch (error) {
        console.log(error.massage);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <SideBar />
      <Layout
        className="site-layout"
        style={{ marginLeft: 200, position: "relative", bottom: 300 }}
      >
        <Content style={{ margin: "0 16px ", overflow: "initial" }}>
          <Header />
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <Collapse
              bordered={false}
              //   defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header="PERSONAL "
                key="1"
                className="site-collapse-custom-panel"
                style={{ textAlign: "left" }}
              >
                {studentList.map((student) => {
                  return (
                    <>
                      <div className="">
                        <strong>Fullname:</strong>
                        <span>{student.studentName}</span>
                      </div>
                      <div className="">
                        <strong>Gender:</strong>
                        <span>{student.gender}</span>
                      </div>

                      <div className="">
                        <strong>DOB:</strong>
                        <span>{student.DOB}</span>
                      </div>
                      <div className="">
                        <strong>Address:</strong>
                        <span>{student.address}</span>
                      </div>
                      <div className="">
                        <strong>Phone Number:</strong>
                        <span> {student.phoneNumber}</span>
                      </div>
                    </>
                  );
                })}
              </Panel>
              <Panel
                header="CLASS "
                key="2"
                className="site-collapse-custom-panel"
                style={{ textAlign: "left" }}
              >
                {studentList.map((student) => {
                  return (
                    <>
                      <div className="">
                        <strong>Level:</strong>
                        <span>{student.levelName}</span>
                      </div>
                      <div className="">
                        <strong>Classtype :</strong>
                        <span>{student.classtypeName}</span>
                      </div>

                      <div className="">
                        <strong>Class :</strong>
                        <span>{student.className}</span>
                      </div>
                    </>
                  );
                })}
              </Panel>
              <Panel
                header="TUITION"
                key="3"
                className="site-collapse-custom-panel"
                style={{ textAlign: "left" }}
              >
                {studentList.map((student) => {
                  return (
                    <>
                      <div className="">
                        <strong>Fee: {studentBill1} </strong>
                      </div>
                    </>
                  );
                })}
              </Panel>
            </Collapse>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </>
  );
}

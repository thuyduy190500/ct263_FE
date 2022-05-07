import "antd/dist/antd.css";
import { Image } from "antd";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  BrowserRouter as Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
export default function SideBar() {
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" style={{ height: "80px" }}>
          <Image
            src="https://locksmithmissouricity.com/locksmith-services/review3.jpg"
            alt=""
            width={60}
            style={{ borderRadius: "50%" }}
          />
          <span style={{ color: "white" }}> Admin</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ textDecoration: "none" }}
          defaultSelectedKeys={["4"]}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink
              to="/"
              activeClassName="active"
              exact="true"
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <NavLink
              to="/students"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Quản lý học viên
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <NavLink
              to="/hocphi"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Quản lý lịch học
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="4" icon={<BarChartOutlined />}>
            <NavLink
              to="/lophoc"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Quản lý lớp học
            </NavLink>
          </Menu.Item> */}
          <Menu.Item key="5" icon={<CloudOutlined />}>
            <NavLink
              to="/diem"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Quản lý điểm
            </NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            <NavLink
              to="/phieudatcho"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Phiếu đặt chỗ
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            <NavLink
              to="/registeronline"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Đăng ký online
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="6" icon={<AppstoreOutlined />}>
            nav 6
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            nav 7
          </Menu.Item>
          <Menu.Item key="8" icon={<ShopOutlined />}>
            nav 8
          </Menu.Item> */}
        </Menu>
      </Sider>
    </Layout>
  );
}

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
import { Input, Space } from "antd";
const { Search } = Input;
export default function Header() {
  return (
    <>
      <nav
        className="navbar navbar-light bg-white "
        style={{
          marginLeft: -16,
          marginRight: -16,
          height: 80,
          position: "relative",
          top: 0,
        }}
      >
        <div className="listIcon" style={{ position: "relative", left: 300 }}>
          <Link to="./homepage">
            <FontAwesomeIcon
              icon={faHome}
              style={{
                marginRight: "30px",
                fontSize: "19px",
                color: "#C6C1C1 ",
              }}
            />
          </Link>
          <Link to="">
            <FontAwesomeIcon
              icon={faCommenting}
              style={{
                marginRight: "30",
                fontSize: "19px",
                color: "#C6C1C1 ",
              }}
            />
          </Link>
          <Link to="">
            <FontAwesomeIcon
              icon={faBell}
              style={{
                fontSize: "19px",
                marginRight: "50px",
                color: "#C6C1C1 ",
              }}
            />
          </Link>
          <Search placeholder="input search text" style={{ width: 200 }} />
        </div>
      </nav>
    </>
  );
}

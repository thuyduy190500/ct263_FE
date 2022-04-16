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
export default function Header() {
  return (
    <>
      <nav
        className="navbar navbar-light bg-white "
        style={{ marginLeft: -16, marginRight: -16 }}
      >
        <div className="listIcon" style={{ marginRight: 0 }}>
          <Link to="">
            <FontAwesomeIcon icon={faHome} style={{ marginRight: 13 }} />
          </Link>
          <Link to="">
            <FontAwesomeIcon icon={faCommenting} style={{ marginRight: 13 }} />
          </Link>
          <Link to="">
            <FontAwesomeIcon icon={faBell} />
          </Link>
        </div>
      </nav>
    </>
  );
}

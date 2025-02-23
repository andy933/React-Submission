import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { notificationChange } from "../reducers/notificationReducer";
import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationHandler = (notification, result) => {
    dispatch(notificationChange(notification, result));
    setTimeout(() => {
      dispatch(notificationChange("", ""));
    }, 20000);
  };

  const handleLogout = async () => {
    dispatch(logoutUser());
    notificationHandler(`User logged out.`, "success");
    navigate("/");
  };

  return (
    /*         <div className="d-flex justify-content-center nav">
            <div className='px-2'><Link to="/blogs">blogs</Link></div>
            <div className='px-2'><Link to="/users">users</Link></div>
            <div className='px-2'>{`${user?.name} logged in `}</div>
            <div className='px-2'><button onClick={handleLogout}>Logout</button></div>
        </div> */
    <Navbar collapseOnSelect expand="lg" className="nav">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span" className="pb-1">
            <Link className="link" to="/blogs">
              blogs
            </Link>
          </Nav.Link>

          <Nav.Link href="#" as="span" className="pb-1">
            <Link className="link" to="/users">
              users
            </Link>
          </Nav.Link>

          <Nav.Link href="#" as="span" className="pt-1">
            {`${user?.name} logged in `}
            <Button size="sm" variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

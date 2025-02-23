import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notify = useSelector((state) => state.notification);

  return notify.info ? (
    <div>
      <Alert variant={notify.result}>{notify.info}</Alert>
    </div>
  ) : null;
};

export default Notification;

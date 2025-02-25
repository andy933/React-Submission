import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IndividualView = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const findUser = users.find((u) => u.id === id);

  return (
    <div>
      <h1>{findUser?.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {findUser?.blogs.map((b) => (
          <li key={b.id}>{b?.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndividualView;

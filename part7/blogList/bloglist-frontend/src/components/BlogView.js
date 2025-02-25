import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <Table striped className="mt-3">
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogView;

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import View from "./View";
function Tableshow(props) {
  const [users, setUsers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "Employees"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(data);
    };

    fetchEmployees();
  }, []);

  const showData = users.map((item, index) => (
    <tr
      key={item.id}
      onClick={() => setSelectedEmployee(item)} // Click the row to select employee
      style={{ cursor: "pointer" }} // Add a pointer cursor to indicate that the row is clickable
    >
      <td>{index + 1}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.Email}</td>
      <td>{item.salary}</td>
      <td>{item.Date}</td>

      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          <FontAwesomeIcon
            onClick={() => props.delete(item.id)}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
            icon={faTrash}
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Salary</td>
            <td>Date</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{showData}</tbody>
      </Table>
      {selectedEmployee && (
        <View
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)} // Close modal
        />
      )}
    </>
  );
}

export default Tableshow;

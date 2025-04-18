import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";  // Add missing imports
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table } from "react-bootstrap";

function Tableshow(props) {
  const [users, setUsers] = useState([]);

  // Fetch employees from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "Employees"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setUsers(data); 
    };

    fetchEmployees();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      // Deleting the document from Firestore
      await deleteDoc(doc(db, "Employees", id));

      // Remove the deleted user from the state to update UI
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Render data in table rows
  const showData = users.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.Email}</td>
      <td>{item.Date}</td>
      <td>{item.salary}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          <FontAwesomeIcon
            onClick={() => handleDelete(item.id)}
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
      <tbody>
        {showData}
      </tbody>
    </Table>
  );
}

export default Tableshow;

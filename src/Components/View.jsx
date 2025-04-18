import React from "react";
import "./View.css";

const View = ({ employee, onClose }) => {
  if (!employee) return null; // If no employee is passed, don't render anything.

  return (
    <div>
      <h1>Employee Details</h1>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Employee Details</h2>
          <div className="modal-content">
            <p>
              <strong>Name:</strong> {employee.firstName} {employee.lastName}
            </p>
            <p>
              <strong>Email:</strong> {employee.Email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {employee.address || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {employee.city || "N/A"}
            </p>
            <p>
              <strong>Zip Code:</strong> {employee.zipCode || "N/A"}
            </p>
            <p>
              <strong>Salary:</strong> ${employee.salary}
            </p>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default View;

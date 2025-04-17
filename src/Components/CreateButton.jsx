import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateButton = () => {
    return (
        <Button as={Link} to="/create" variant="primary">
            Add New Employee
        </Button>
    );
};

export default CreateButton;

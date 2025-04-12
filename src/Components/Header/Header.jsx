import React from 'react';
import './Header.css';
import { Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <>
      <Row className="header">
        <div className="redCircle"></div>
        <div className="yellowCircle"></div>
        <div className="greenCircle"></div>
      </Row>
      <Container className='headerBody'>
        <h1 className="title">Employee Management Software</h1>
        <Button className='addBtn'>Add Employee</Button>
        <Button className='logoutBtn' onClick={handleLogout}>Logout</Button>
      </Container>
    </>
  );
}

export default Header;

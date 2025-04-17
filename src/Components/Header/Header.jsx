import React from 'react';
import style from './Header.module.css';
import {useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleAdd = () => {
    navigate('/create');
  };

  return (
    <>
      <div className={style.header}>
        <div className={style.redCircle}></div>
        <div className={style.yellowCircle}></div>
        <div className={style.greenCircle}></div>
      </div>

      <div className={style.headerBody}>
        <h1 className={style.title}>Employee Management Software</h1>
        <button className={style.addBtn} onClick={handleAdd}>
          Add Employee
        </button>
        <button className={style.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Header;

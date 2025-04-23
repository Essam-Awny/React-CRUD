import React, { useEffect } from 'react';
import Header from '../../Components/Header/Header';
import style from './Dashboard.module.css';
import { Container } from 'react-bootstrap';
<<<<<<< HEAD
import Tableshow from './../../Components/Tableshow';
=======
import Tableshow from '../../Components/Tableshow/Tableshow';
>>>>>>> f817fce (....)

function Dashboard() {
    useEffect(() => {
        document.body.style.backgroundColor = 'rgba(0, 183, 255, 0.533)';
        return () => {
            document.body.style.backgroundColor = ''; 
        };
    }, []);

    return (
        <>
            <Container className={style.Container}>
                <Header />
                <Tableshow />
            </Container>
        </>
    );
}

export default Dashboard;

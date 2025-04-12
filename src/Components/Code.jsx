import React, { useEffect, useState } from 'react';
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore';

function Code() {
    const [employees, setEmployees] = useState([]); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => { 
            try {
                const querySnapshot = await getDocs(collection(db, "Employees"));
                const employeesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setEmployees(employeesList); 
            } catch (err) {
                console.error("Error fetching data", err);
                setError("Error fetching data");
            }
        };

        fetchEmployees(); 
    }, []);

    return (
        <>
            <h1>Login Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {employees.map(employee => ( 
                    <li key={employee.id}>
                        {employee.firstName} - {employee.lastName} - {employee.Email} - {employee.Date} - {employee.salary}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Code;

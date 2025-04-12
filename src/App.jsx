import './App.css'
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Header from './Components/Header/Header';
import Table from './Components/Table';
import Edit from './Components/Edit';
import Create from './Components/Create';
import View from './Components/View';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import UserContextProvider from './Components/Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoutes';
import Login from './Components/Login';
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <UserContextProvider>
    <Router>
      <Routes>
        <Route path="/table" element={<ProtectedRoute element={<Table />} />} />
        <Route path="/edit" element={<ProtectedRoute element={<Edit />} />} />
        <Route path="/create" element={<ProtectedRoute element={<Create />} />} />
        <Route path="/view" element={<View />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/table" element={<Table />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </UserContextProvider>
  );
}

export default App;



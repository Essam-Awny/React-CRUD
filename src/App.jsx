import './App.css'
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Header from './Components/Header/Header';
import Table from './Components/Table';
import Edit from './Components/Edit';
import Create from './Components/Create';
import View from './Components/View';
import Login from './Components/Login';
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/table" element={<Table />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;



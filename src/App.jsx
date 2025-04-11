import './App.css'
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Header from './Components/Header';
import Table from './Components/Table';
import Edit from './Components/Edit';
import Create from './Components/Create';
import View from './Components/View';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/table" element={<Table />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;



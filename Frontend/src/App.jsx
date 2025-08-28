import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import List from './Components/List';
import Update from './Components/Update';
import Add from './Components/Add';

function App() {
  return (
    <Router>
      <div className='container mt-4'>
        <h1 className='text-center mb-4'>Book Management</h1>

        <nav className='mb-4'>
          <Link to="/" className='btn btn-primary me-2'>Book List</Link>
          <Link to="/create" className='btn btn-success'>Add Book</Link>
        </nav>

        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Add/>} />
          <Route path="/Update/:id" element={<Update />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

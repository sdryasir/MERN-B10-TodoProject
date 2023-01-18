import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';

function App() {



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/:id?' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { Link, Route,  Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <>
        <header className="">
          <span>
            <Link to="/">Accueil</Link>
          </span>
        </header>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/" element={<App />} /> */}
      </Routes>
    </>
  );
}

export default App;

import { Link, Route,  Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <>
        <header className="">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">Home</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Link</Link>
                  </li>               
                </ul>
              </div>
            </div>
          </nav>
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

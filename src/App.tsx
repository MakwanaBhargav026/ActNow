import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import ProjectDetailsPage from './components/ProjectDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
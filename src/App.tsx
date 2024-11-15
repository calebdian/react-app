import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import Dashboard from './components/dashboard';
import Login from './components/Login';
import Recommendations from './components/Recommendations';
import SalesRegistration from './components/SalesRegistration';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/sales-registration" element={<SalesRegistration />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

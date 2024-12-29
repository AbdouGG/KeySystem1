import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { KeySystem } from './components/KeySystem';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<KeySystem />} />
        <Route path="/checkpoint/:id" element={<KeySystem />} />
      </Routes>
    </Router>
  );
}
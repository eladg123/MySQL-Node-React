import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//SCREENS:
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<LoginScreen />} />
        <Route path={'/signup'} element={<SignupScreen />} />
        <Route path={'/home'} element={<HomeScreen />} />

      </Routes>
    </div>
  );
}

export default App;

import { Route, HashRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
import BottomMenu from './BottomMenu/BottomMenu';
import Login from './Login/Login';
import Main from './Main/Main';
import SignUp from './SignUp/SignUp';

export default function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
      <Router basename="/bottom-menu">
        <Routes>
          <Route path="/" element={<BottomMenu />} />
        </Routes>
      </Router>
    </>
  );
}

import { Route, HashRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
import BottomMenu from './BottomMenu/BottomMenu';
import Login from './Login/Login';
import Main from './Main/Main';
import SideMenu from './SideMenu/SideMenu';
import TopMenu from './TopMenu/TopMenu';

export default function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
      <Router basename="/top-menu">
        <Routes>
          <Route path="/" element={<TopMenu />} />
        </Routes>
      </Router>
      <Router basename="/side-menu">
        <Routes>
          <Route path="/" element={<SideMenu />} />
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

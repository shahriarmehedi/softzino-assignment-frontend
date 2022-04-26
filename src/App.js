import './App.css';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Dashboard/Users';
import Products from './pages/Dashboard/Products';
import DashboardMain from './pages/Dashboard/DashboardMain';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} >
              <Route exact path="/dashboard/main" element={< DashboardMain />}></Route>
              <Route exact path="/dashboard/users" element={< Users />}></Route>
              <Route exact path="/dashboard/products" element={< Products />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

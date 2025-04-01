import './App.css'
import LoginPage from './pages/login-page/login-page';
import AdminDashboard from './pages/admin-dashboard/admin-dashboard';
import SellerDashboard from './pages/seller-dashboard/seller-dashboard';

function App() {
  const getUserRole = () => {
    const roll = sessionStorage.getItem("roll");
    return roll;
};
  const userRole = getUserRole();
    if (userRole === "admin") {
      return <AdminDashboard />;
  } else if (userRole === "säljare") {
      return <SellerDashboard />;
  } else {
      return <LoginPage />;
  }
}

export default App

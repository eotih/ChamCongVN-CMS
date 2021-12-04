import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
// Employee
import Recruitment from './pages/employee/Recruitment';
import AddRecruit from './pages/employee/AddRecruit';
// Organization
import Account from './pages/organization/Account';
import Profile from './pages/Profile';
import Shift from './pages/organization/Shift';
import Role from './pages/organization/Role';
import Position from './pages/organization/Position';
// Component
import State from './pages/component/State';
import Work from './pages/component/Work';
import Group from './pages/component/Group';
import Department from './pages/component/Department';
import Degree from './pages/component/Degree';
import Specialty from './pages/component/Specialities';
// Salary
import Salary from './pages/salary/Salary';
import SalaryTable from './pages/salary/SalaryTable';
import SalaryDeduct from './pages/salary/SalaryDeduct';
import Laudatory from './pages/salary/Laudatory';
import Overtime from './pages/salary/OvertimeSalary';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'profile', element: <Profile /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/employee',
      element: <DashboardLayout />,
      children: [
        // { path: 'employeelist', element: <Profile /> },
        { path: 'Recruitments', element: <Recruitment /> },
        { path: 'Recruitments/AddRecruit', element: <AddRecruit /> }
      ]
    },
    {
      path: '/organization',
      element: <DashboardLayout />,
      children: [
        { path: 'account', element: <Account /> },
        { path: 'profile', element: <Profile /> },
        { path: 'shift', element: <Shift /> },
        { path: 'role', element: <Role /> },
        { path: 'position', element: <Position /> }
      ]
    },
    {
      path: '/component',
      element: <DashboardLayout />,
      children: [
        { path: 'state', element: <State /> },
        { path: 'work', element: <Work /> },
        { path: 'group', element: <Group /> },
        { path: 'department', element: <Department /> },
        { path: 'degree', element: <Degree /> },
        { path: 'specialities', element: <Specialty /> }
      ]
    },
    {
      path: '/salary',
      element: <DashboardLayout />,
      children: [
        { path: 'salaries', element: <Salary /> },
        { path: 'salarytable', element: <SalaryTable /> },
        { path: 'salarydeduct', element: <SalaryDeduct /> },
        { path: 'laudatory', element: <Laudatory /> },
        { path: 'overtimesalary', element: <Overtime /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

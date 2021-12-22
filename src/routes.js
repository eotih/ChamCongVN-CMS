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
import Employee from './pages/employee/Employee';
import EmployeeEdit from './pages/employee/EmployeeEdit';
import EmployeeDetails from './pages/employee/EmployeeDetails';
// Organization
import Account from './pages/organization/Account';
import Profile from './pages/Profile';
import Shift from './pages/organization/Shift';
import Overtime from './pages/organization/Overtime';
import Role from './pages/organization/Role';
import Position from './pages/organization/Position';
import Organization from './pages/organization/Organization';
import Level from './pages/organization/Level';
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
import Advance from './pages/salary/Advance';
import OvertimeSalary from './pages/salary/OvertimeSalary';
import TimeKeeper from './pages/timekeeper/TimeKeeper';
import OTTimeKeeper from './pages/timekeeper/OTTimekeeper';
// Principle
import Laudatory from './pages/principle/Laudatory';
import Regulation from './pages/principle/Regulation';
// Application
import AsbentApp from './pages/application/AsbentApp';
import OvertimeApp from './pages/application/OvertimeApp';
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
        { path: 'recruitments', element: <Recruitment /> },
        { path: 'recruitments/add_recruit/:id', element: <AddRecruit /> },
        { path: 'employeelist', element: <Employee /> },
        { path: 'employeelist/editemployee/:id', element: <EmployeeEdit /> },
        { path: 'employeelist/details/:id', element: <EmployeeDetails /> }
      ]
    },
    {
      path: '/organization',
      element: <DashboardLayout />,
      children: [
        { path: 'organization', element: <Organization /> },
        { path: 'account', element: <Account /> },
        { path: 'profile', element: <Profile /> },
        { path: 'shift', element: <Shift /> },
        { path: 'overtime', element: <Overtime /> },
        { path: 'role', element: <Role /> },
        { path: 'level', element: <Level /> },
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
        { path: 'advance', element: <Advance /> },
        { path: 'overtimesalary', element: <OvertimeSalary /> }
      ]
    },
    {
      path: '/principle',
      element: <DashboardLayout />,
      children: [
        { path: 'laudatory', element: <Laudatory /> },
        { path: 'regulation', element: <Regulation /> }
      ]
    },
    {
      path: '/application',
      element: <DashboardLayout />,
      children: [
        { path: 'asbent_application', element: <AsbentApp /> },
        { path: 'overtime_application', element: <OvertimeApp /> }
      ]
    },
    {
      path: '/timekeeper',
      element: <DashboardLayout />,
      children: [
        { path: 'timekeeper', element: <TimeKeeper /> },
        { path: 'ottimekeeper', element: <OTTimeKeeper /> }
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

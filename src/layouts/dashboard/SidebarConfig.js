import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import peopleOutline from '@iconify/icons-eva/people-outline';
import lockFill from '@iconify/icons-eva/lock-fill';
import roundAttachMoney from '@iconify/icons-ic/round-attach-money';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Employee',
    path: '/employee',
    icon: getIcon(peopleOutline),
    children: [
      { title: 'Employee List', path: '/employee/employeelist' },
      { title: 'Recruitments', path: '/employee/recruitments' }
    ]
  },
  {
    title: 'Organization',
    path: '/organization',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Organization',
        path: '/organization/organization'
      },
      {
        title: 'Shift',
        path: '/organization/shift'
      },
      {
        title: 'Overtime',
        path: '/organization/overtime'
      },
      {
        title: 'Account',
        path: '/organization/account'
      },
      {
        title: 'Role',
        path: '/organization/role'
      },
      {
        title: 'Level',
        path: '/organization/level'
      },
      {
        title: 'Position',
        path: '/organization/position'
      }
    ]
  },
  {
    title: 'Component',
    path: '/component',
    position: 'Quản Lý',
    icon: getIcon(briefcaseFill),
    children: [
      { title: 'State', path: '/component/state' },
      {
        title: 'Work',
        path: '/component/work'
      },
      {
        title: 'Group',
        path: '/component/group'
      },
      {
        title: 'Department',
        path: '/component/department'
      },
      {
        title: 'Degree',
        path: '/component/degree'
      },
      {
        title: 'Specialities',
        path: '/component/specialities'
      }
    ]
  },
  {
    title: 'Salary',
    path: '/salary',
    position: 'Kế Toán',
    icon: getIcon(roundAttachMoney),
    children: [
      { title: 'Salary Table', path: '/salary/salarytable' },
      { title: 'Deduct', path: '/salary/deduct' },
      { title: 'Advance', path: '/salary/advance' },
      { title: 'Standard', path: '/salary/standard' }
    ]
  },
  {
    title: 'Principle',
    path: '/principle',
    position: 'Quản Lý',
    icon: getIcon(bookOpenFill),
    children: [
      { title: 'Laudatory', path: '/principle/laudatory' },
      { title: 'Regulation', path: '/principle/regulation' }
    ]
  },
  {
    title: 'Application',
    path: '/application',
    position: 'Quản Lý',
    icon: getIcon(archiveFill),
    children: [
      { title: 'Asbent', path: '/application/asbent' },
      { title: 'Overtime', path: '/application/overtime' }
    ]
  },
  {
    title: 'TimeKeeper',
    path: '/timekeeper',
    position: 'Quản Lý',
    icon: getIcon(lockFill),
    children: [
      { title: 'Standard', path: '/timekeeper/standard' },
      { title: 'Overtime', path: '/timekeeper/overtime' }
    ]
  }
];

export default sidebarConfig;

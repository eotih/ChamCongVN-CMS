import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import peopleOutline from '@iconify/icons-eva/people-outline';
import lockFill from '@iconify/icons-eva/lock-fill';
import roundAttachMoney from '@iconify/icons-ic/round-attach-money';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';

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
        title: 'Shift',
        path: '/organization/shift'
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
        title: 'Position',
        path: '/organization/position'
      }
    ]
  },
  {
    title: 'Component',
    path: '/component',
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
    title: 'Salary Management',
    path: '/salary',
    icon: getIcon(roundAttachMoney),
    children: [
      { title: 'Salary Table', path: '/salary/salarytable' },
      { title: 'Salary Deduct', path: '/salary/salarydeduct' },
      { title: 'laudatory', path: '/salary/laudatory' },
      { title: 'Overtime Salary', path: '/salary/overtimesalary' },
      { title: 'Salary', path: '/salary/salaries' }
    ]
  },
  {
    title: 'TimeKeeper',
    path: '/timekeeper',
    icon: getIcon(lockFill)
  }
];

export default sidebarConfig;

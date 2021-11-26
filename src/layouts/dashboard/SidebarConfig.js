import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import roundAttachMoney from '@iconify/icons-ic/round-attach-money';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Organization',
    path: '/organization',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Department',
        path: '/organization/department'
      },
      {
        title: 'Shift',
        path: '/organization/shift'
      },
      {
        title: 'Group',
        path: '/organization/group'
      },
      {
        title: 'Role',
        path: '/organization/role'
      },
      {
        title: 'Degree',
        path: '/organization/degree'
      },
      {
        title: 'Specialities',
        path: '/organization/specialities'
      },
      {
        title: 'Work',
        path: '/organization/work'
      }
    ]
  },
  {
    title: 'Salary Management',
    path: '/salary',
    icon: getIcon(roundAttachMoney),
    children: [
      { title: 'Salary Table', path: '/salary/salarytable' },
      { title: 'Salary Days', path: '/salary/salarydays' },
      { title: 'Salary Deduct', path: '/salary/salarydeduct' },
      { title: 'Overtime Salary', path: '/salary/overtimesalary' },
      { title: 'Bonus Salary', path: '/salary/bonussalary' },
      { title: 'Salary', path: '/salary/salaries' }
    ]
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;

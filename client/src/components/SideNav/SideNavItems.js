import { OrderedListOutlined } from '@ant-design/icons';
import AccountBalanceWalletSharpIcon from '@material-ui/icons/AccountBalanceWalletSharp';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';

export default [
  {
    id: 1,
    title: 'Accounts Management',
    icon: OrderedListOutlined,
    parent: true,
    children: [
      {
        id: 1.1,
        title: 'Accounts Head',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 1.2,
        title: 'Account Ledger',
        icon: OrderedListOutlined,
        parent: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Work Contracts',
    icon: OrderedListOutlined,
    parent: true,
    children: [
      {
        id: 2.1,
        title: 'Add New Work',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 2.2,
        title: 'View All Works',
        icon: OrderedListOutlined,
        parent: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Client Payment Receipts',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 4,
    title: 'Other Income Receipts',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 5,
    title: 'Loan Management',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 6,
    title: 'User Payments',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 7,
    title: 'Purchase Orders',
    icon: OrderedListOutlined,
    parent: true,
    children: [
      {
        id: 7.1,
        title: 'Create Purchase Order',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 7.2,
        title: 'View Purchase Orders',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 7.3,
        title: 'View Purchase Order Payments',
        icon: OrderedListOutlined,
        parent: false,
      },
    ],
  },
  {
    id: 8,
    title: 'Purchase Bills',
    icon: OrderedListOutlined,
    parent: true,
  },
  {
    id: 9,
    title: 'Stock Management',
    icon: OrderedListOutlined,
    parent: true,
    children: [
      {
        id: 9.1,
        title: 'Stock Register',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 9.2,
        title: 'Stock Transfer',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 9.3,
        title: 'Stock Locations',
        icon: OrderedListOutlined,
        parent: false,
      },
    ],
  },
  {
    id: 10,
    title: 'Warehouse Sales',
    icon: OrderedListOutlined,
    parent: true,
    children: [
      {
        id: 10.1,
        title: 'New Sales Invoice',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 10.2,
        title: 'View Sales Invoice',
        icon: OrderedListOutlined,
        parent: false,
      },
    ],
  },
  {
    id: 11,
    title: 'Expenses',
    icon: OrderedListOutlined,
    parent: true,
  },
  {
    id: 12,
    title: 'Labour Management',
    icon: GroupOutlinedIcon,
    parent: true,
    children: [
      {
        id: 12.1,
        title: 'Labours',
        icon: PeopleSharpIcon,
        parent: false,
      },
      {
        id: 12.2,
        title: 'Wage Slips & Paymets',
        icon: AccountBalanceWalletSharpIcon,
        parent: false,
      },
    ],
  },
  {
    id: 13,
    title: 'Vehicle Management',
    icon: OrderedListOutlined,
    parent: true,
  },
  {
    id: 14,
    title: 'HR',
    icon: OrderedListOutlined,
    parent: true,
  },
  {
    id: 15,
    title: 'Subcontract Works',
    icon: OrderedListOutlined,
    parent: true,
  },
  {
    id: 16,
    title: 'Tools Management',
    icon: OrderedListOutlined,
    parent: true,
    children: [
      {
        id: 16.1,
        title: 'Tools & Equipment',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 16.2,
        title: 'Rent Tools',
        icon: OrderedListOutlined,
        parent: false,
      },
      {
        id: 16.3,
        title: 'Tools Transfers',
        icon: OrderedListOutlined,
        parent: false,
      },
    ],
  },
  {
    id: 17,
    title: 'Project Documents',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 18,
    title: 'Daily Tasks & Activities',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 19,
    title: 'Daily Notes',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 20,
    title: 'Daily Attendance Report',
    icon: OrderedListOutlined,
    parent: false,
  },
  {
    id: 21,
    title: 'Reports',
    icon: OrderedListOutlined,
    parent: true,
  },
];

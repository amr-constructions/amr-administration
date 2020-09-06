import AccountLedger from '../AccountsManagement/AccountLedger/AccountLedger';
import AccountsHead from '../AccountsManagement/AccountsHead/AccountsHead';
import UnderConstruction from '../UnderConstruction/UnderConstruction';
import AddNewWork from '../WorkContracts/AddNewWork/AddNewWork';
import ViewwAllWorks from '../WorkContracts/ViewAllWorks/ViewAllWorks';

export default [
  {
    key: 'other_income_receipts',
    component: UnderConstruction,
  },
  {
    key: 'accounts_management/accounts_head',
    component: AccountsHead,
  },
  {
    key: 'accounts_management/account_ledger/:id',
    component: AccountLedger,
  },
  {
    key: 'accounts_management/account_ledger',
    component: AccountLedger,
  },
  {
    key: 'work_contracts/add_new_work',
    component: AddNewWork,
  },
  {
    key: 'work_contracts/view_all_works',
    component: ViewwAllWorks,
  },
  {
    key: 'client_payment_receipts',
    component: UnderConstruction,
  },
  {
    key: 'other_income_receipts',
    component: UnderConstruction,
  },
  {
    key: 'loan_management',
    component: UnderConstruction,
  },
  {
    key: 'user_payments',
    component: UnderConstruction,
  },
  {
    key: 'purchase_orders/create_purchase_order',
    component: UnderConstruction,
  },
  {
    key: 'purchase_orders/view_purchase_orders',
    component: UnderConstruction,
  },
  {
    key: 'purchase_orders/view_purchase_order_payments',
    component: UnderConstruction,
  },
  {
    key: 'purchase_bills',
    component: UnderConstruction,
  },
  {
    key: 'stock_management/stock_register',
    component: UnderConstruction,
  },
  {
    key: 'stock_management/stock_transfer',
    component: UnderConstruction,
  },
  {
    key: 'stock_management/stock_locations',
    component: UnderConstruction,
  },
  {
    key: 'warehouse_sales/new_sales_invoice',
    component: UnderConstruction,
  },
  {
    key: 'warehouse_sales/view_sales_invoice',
    component: UnderConstruction,
  },
  {
    key: 'expenses',
    component: UnderConstruction,
  },
  {
    key: 'labour_management/labours',
    component: UnderConstruction,
  },
  {
    key: 'labour_management/wage_slips_&_paymets',
    component: UnderConstruction,
  },
  {
    key: 'vehicle_management',
    component: UnderConstruction,
  },
  {
    key: 'hr',
    component: UnderConstruction,
  },
  {
    key: 'subcontract_works',
    component: UnderConstruction,
  },
  {
    key: 'tools_management/tools_&_equipment',
    component: UnderConstruction,
  },
  {
    key: 'tools_management/rent_tools',
    component: UnderConstruction,
  },
  {
    key: 'tools_management/tools_transfers',
    component: UnderConstruction,
  },
  {
    key: 'project_documents',
    component: UnderConstruction,
  },
  {
    key: 'daily_tasks_&_activities',
    component: UnderConstruction,
  },
  {
    key: 'daily_notes',
    component: UnderConstruction,
  },
  {
    key: 'daily_attendance_report',
    component: UnderConstruction,
  },
  {
    key: 'reports',
    component: UnderConstruction,
  },
];

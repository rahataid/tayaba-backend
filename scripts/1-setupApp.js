// node ./play/setup.js
require('../modules/services');
const config = require('config');
const { username, password, database } = config.get('db');
const SequelizeDB = require('@rumsan/core').SequelizeDB;
SequelizeDB.init(database, username, password, config.get('db'));
const { db } = SequelizeDB;
const { UserController, RoleController } = require('@rumsan/user');
const ProjectController = require('../modules/project/project.controller');
const { PERMISSIONS } = require('../constants');
const User = new UserController();
const Role = new RoleController();
const projectController = new ProjectController();
require('../modules/models');

// const projectData = {
//   name: 'H20 Wheels',
//   startDate: '2023-01-24',
//   endDate: '2023-01-24',
//   owner: 1,
//   budget: 0,
//   disbursed: 0,
//   contractAddress: '',
// };

db.authenticate()
  .then(async () => {
    console.log('Database connected...');
    // await db.query(dropTables);
    await db.sync();
    console.log('setting up users');
    await setupAdmin();
    console.log('setting up project');
    // await projectController.add(projectData);
    console.log('Done');
    process.exit(0);
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });
const setupAdmin = async () => {
  await Role.add({
    name: 'donor',
    permissions: [
      PERMISSIONS.APP_MANAGE,
      PERMISSIONS.USER_MANAGE,
      PERMISSIONS.ROLE_MANAGE,
      PERMISSIONS.USER_DELETE,
      PERMISSIONS.USER_READ,
      PERMISSIONS.USER_WRITE,
      PERMISSIONS.ROLE_READ,
      PERMISSIONS.ROLE_WRITE,
      PERMISSIONS.BENEFICIARY_READ,
      PERMISSIONS.BENEFICIARY_WRITE,
      PERMISSIONS.BENEFICIARY_DELETE,
      PERMISSIONS.BENEFICIARY_LIST,
      PERMISSIONS.PROJECT_READ,
      PERMISSIONS.PROJECT_WRITE,
      PERMISSIONS.PROJECT_DELETE,
      PERMISSIONS.PROJECT_LIST,
      PERMISSIONS.REPORT_READ,
      // PERMISSIONS.VENDOR_WRITE,
      // PERMISSIONS.VENDOR_DELETE,
      // PERMISSIONS.VENDOR_LIST,
      // PERMISSIONS.VENDOR_READ,
      // PERMISSIONS.TRANSACTIONS_READ,
    ],
  });
  await Role.add({
    name: 'admin',
    permissions: [
      PERMISSIONS.BENEFICIARY_READ,
      PERMISSIONS.BENEFICIARY_WRITE,
      PERMISSIONS.BENEFICIARY_DELETE,
      PERMISSIONS.BENEFICIARY_LIST,
      PERMISSIONS.PROJECT_READ,
      PERMISSIONS.PROJECT_WRITE,
      PERMISSIONS.PROJECT_DELETE,
      PERMISSIONS.PROJECT_LIST,
      PERMISSIONS.REPORT_READ,
      // PERMISSIONS.VENDOR_LIST,
      // PERMISSIONS.VENDOR_READ,
      // PERMISSIONS.VENDOR_DELETE,
      // PERMISSIONS.TRANSACTIONS_READ,
    ],
  });

  await Role.add({
    name: 'manager',
    permissions: [
      PERMISSIONS.BENEFICIARY_READ,
      PERMISSIONS.BENEFICIARY_WRITE,
      PERMISSIONS.BENEFICIARY_DELETE,
      PERMISSIONS.BENEFICIARY_LIST,
      PERMISSIONS.PROJECT_READ,
      PERMISSIONS.PROJECT_WRITE,
      PERMISSIONS.PROJECT_DELETE,
      PERMISSIONS.PROJECT_LIST,
      PERMISSIONS.REPORT_READ,
    ],
  });
  await Role.add({
    name: 'stakeholder',
    permissions: [
      PERMISSIONS.BENEFICIARY_READ,
      PERMISSIONS.BENEFICIARY_WRITE,
      PERMISSIONS.BENEFICIARY_DELETE,
      PERMISSIONS.BENEFICIARY_LIST,
      PERMISSIONS.PROJECT_READ,
      PERMISSIONS.PROJECT_WRITE,
      PERMISSIONS.PROJECT_DELETE,
      PERMISSIONS.PROJECT_LIST,
      PERMISSIONS.REPORT_READ,
    ],
  });
  const user1 = await User.signupUsingEmail({
    name: 'Donor',
    email: 'donor@mailinator.com',
    password: 'T$mp9670',
    roles: ['donor'],
    wallet_address: '0x462C2fd10c0196aFd959a09eC6eB005e7Fd6D67d',
  });

  const user2 = await User.signupUsingEmail({
    name: 'Rahat Manager',
    email: 'manager@mailinator.com',
    password: 'T$mp9670',
    roles: ['admin'],
    wallet_address: '0xE2df378A2F1E7031f734fB946B3B4990Ae0Ec2C6',
  });

  const userSrso = await User.signupUsingEmail({
    name: 'Hamadullah [SRSO]',
    email: 'hamadullah@srso.org.pk',
    password: 'T$mp9670',
    roles: ['admin'],
    wallet_address: '0xE2df378A2F1E7031f734fB946B3B4990Ae0Ec2C6',
  });

  const user4 = await User.signupUsingEmail({
    name: 'stakeholders',
    email: 'stakeholders@mailinator.com',
    password: 'T$mp9670',
    roles: ['stakeholder'],
  });
  console.log(`Users created`);
  return user1, user2, user4, userSrso;
};

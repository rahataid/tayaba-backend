const Controller = require('./beneficiaries.controller');
const Validator = require('./beneficiaries.validators');
const { AbstractRouter } = require('@rumsan/core/abstract');
const { PERMISSIONS } = require('../../constants');

module.exports = class extends AbstractRouter {
  constructor(options = {}) {
    options.name = options.name || 'beneficiaries';
    options.controller = new Controller(options);
    options.validator = new Validator(options);
    super(options);
  }
  routes = {
    add: {
      method: 'POST',
      path: '',
      description: 'Add new beneficiaries',
      permissions: [PERMISSIONS.BENEFICIARY_WRITE],
    },

    list: {
      method: 'GET',
      path: '',
      description: 'List all beneficiaries',
      // permissions: [PERMISSIONS.BENEFICIARY_LIST],
    },

    getByWalletAddress: {
      method: 'GET',
      path: '/{walletAddress}',
      description: 'get beneficiaries by wallet address',
      permissions: [PERMISSIONS.BENEFICIARY_READ],
    },

    update: {
      method: 'PATCH',
      path: '/{walletAddress}',
      description: 'update beneficiaries by walletAddress',
      permissions: [PERMISSIONS.BENEFICIARY_WRITE],
    },

    updateStatus: {
      method: 'PATCH',
      path: '/{address}/status',
      description: 'update beneficiaries status by address',
    },

    updateUsingWalletAddress: {
      method: 'PATCH',
      path: '/wallet-address/{walletAddress}',
      description: 'update beneficiaries by wallet address',
      permissions: [PERMISSIONS.BENEFICIARY_WRITE],
    },

    overrideBenBalance: {
      method: 'PATCH',
      path: '/wallet-address/{walletAddress}/override-balance',
      description: 'override beneficiaries balance by wallet address',
      // permissions: [PERMISSIONS.BENEFICIARY_WRITE],
    },

    assignProject: {
      method: 'PATCH',
      path: '/project/{id}',
      description: 'Assign project to beneficary ',
      // permissions: [PERMISSIONS.BENEFICIARY_WRITE],
    },

    delete: {
      method: 'PATCH',
      path: '/{walletAddress}/delete',
      description: 'delete beneficiaries',
      permissions: [PERMISSIONS.BENEFICIARY_DELETE],
    },

    getVillagesName: {
      method: 'GET',
      path: '/get-villages',
      description: 'List all beneficiary villages',
      permissions: [PERMISSIONS.BENEFICIARY_LIST],
    },
  };
};

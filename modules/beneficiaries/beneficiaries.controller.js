const { AbstractController } = require('@rumsan/core/abstract');
const {
  BeneficiariesModel,
  VillageModel,
  ProjectModel,
  ProjectBeneficiariesModel,
} = require('../models');

module.exports = class extends AbstractController {
  constructor(options) {
    super(options);
    this.table = BeneficiariesModel;
    this.villageTable = VillageModel;
    this.projectTable = ProjectModel;
  }

  registrations = {
    add: (req) => this.add(req.payload),
    list: (req) => this.list(req.query),
    getById: (req) => this.getById(req.params.id),
    update: (req) => this.update(req.params.id, req.payload),
    updateUsingWalletAddress: (req) =>
      this.updateUsingWalletAddress(req.params.walletAddress, req.payload),
    delete: (req) => this.delete(req.params.id),
    getVillagesName: (req) => this.getVillagesName(),
  };

  async add(payload) {
    try {
      const benData = await this.table.create(payload);
      const {
        dataValues: { id: beneficiaryId },
      } = benData;
      await ProjectBeneficiariesModel.create({ beneficiaryId, projectId: payload.projectId });
      return benData;
    } catch (err) {
      return err;
    }
  }

  async list(query) {
    let { limit, start, projectId, id: beneficiaryId, ...restQuery } = query;
    if (!limit) limit = 50;
    if (!start) start = 0;

    const projectQuery = {};

    if (projectId) {
      projectQuery.id = projectId;
    }

    let { rows: list, count } = await this.table.findAndCountAll({
      include: [
        {
          model: this.villageTable,
          where: beneficiaryId,
          as: 'village_details',
        },
        {
          model: this.projectTable,
          where: projectQuery,
          as: 'beneficiary_project_details',
        },
      ],
      where: { ...restQuery },
      order: [['name', 'ASC']],
      limit: limit || 100,
      offset: start || 0,
    });

    return {
      data: list,
      count,
      limit,
      start,
      totalPage: Math.ceil(count / limit),
    };
  }

  async getById(id) {
    return await this.table.findByPk(id, {
      include: [
        {
          model: this.projectTable,
          through: {
            attributes: [],
          },
          as: 'beneficiary_project_details',
        },
        {
          model: this.villageTable,
          as: 'village_details',
        },
      ],
    });
  }

  async update(id, payload) {
    try {
      return await this.table.update(payload, { where: { id } });
    } catch (err) {
      console.log(err);
    }
  }

  async updateUsingWalletAddress(walletAddress, payload) {
    try {
      const update = await this.table.update(payload, {
        where: { walletAddress },
        returning: true,
        raw: true,
      });
      console.log('update', update);
      return update;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    return this.table.destroy({ where: { id } });
  }

  async getVillagesName() {
    const villageData = await this.table.findAll({
      include: [
        {
          model: this.villageTable,
          as: 'village_details',
        },
      ],
    });
    const uniqueVillages = [...new Set(villageData.map((item) => item?.village_details.name))];
    return uniqueVillages;
  }
};

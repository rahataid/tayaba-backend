const Controller = require("./reporting.controller");
const Validator = require("./reporting.validator");
const { AbstractRouter } = require("@rumsan/core/abstract");

module.exports = class extends AbstractRouter {
  constructor(options = {}) {
    options.name = options.name || "reports";
    options.controller = new Controller(options);
    options.validator = new Validator(options);
    super(options);
  }
  routes = {
    // Demographics
    getBeneficiaryDemographicsSummary: {
      method: "GET",
      path: "/demographics/summary",
      description: "Get Beneficiary Demographics Summary",
    },

    // #region Piechart
    getBeneficiaryPiechartByProject: {
      method: "GET",
      path: "/piechart/{type}",
      description: "Get report piechart",
    },
    //  #endregion

    //beneficiaryPerVillage
    getBeneficiaryPerVillage: {
      method: "GET",
      path: "/beneficiary/village/{type}",
      description: "Get get Beneficiary Per Village",
    },
  };
};

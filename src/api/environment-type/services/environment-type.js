'use strict';

/**
 * environment-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::environment-type.environment-type');

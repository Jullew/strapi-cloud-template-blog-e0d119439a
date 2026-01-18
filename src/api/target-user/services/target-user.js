'use strict';

/**
 * target-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::target-user.target-user');

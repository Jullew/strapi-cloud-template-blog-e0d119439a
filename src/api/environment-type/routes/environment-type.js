'use strict';

/**
 * environment-type router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::environment-type.environment-type');

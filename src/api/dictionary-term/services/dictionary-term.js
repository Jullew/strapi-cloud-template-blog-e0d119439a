'use strict';

/**
 * dictionary-term service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dictionary-term.dictionary-term');

/**
 * Shared config and hooks for all tests.
 */
const path = require('path');

process.env.DOT_ENV_PATH = path.join(__dirname, '.env');
process.env.DYNAMODB_TABLE = 'members-api-dev';
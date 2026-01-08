import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('../../generated/prisma/client/index.js');
export { PrismaClient };
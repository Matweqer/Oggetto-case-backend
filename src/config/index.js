import 'dotenv/config';

export const config = {
  PORT: parseInt(process.env.API_PORT, 10) || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
  ADMIN_MAIL: process.env.ADMIN_MAIL || 'test@mail.ru',
  ADMIN_PASS: process.env.ADMIN_PASS || 'qwerty',
};

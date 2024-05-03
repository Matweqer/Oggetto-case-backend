import app from './app';
import { config } from './config';
import { sequelize } from './models';
import { AuthController } from './controllers';

async function start() {
  await sequelize.authenticate();
  console.log('Database module initialized');
}

async function createAdmin() {
  const user = {
    email: config.ADMIN_MAIL,
    password: config.ADMIN_PASS,
    name: 'Admin',
    birthday: '1992-02-14',
    position: 'HR',
    grade: 'Lead',
    workProject: 'Human Resources',
    phone: '123456789',
    telegram: 'https://t.me/test',
    office: 'Работает удалённо',
  };
  try {
    await AuthController.register(user);
    console.log('Super admin created');
  } catch (e) {
    console.log('Super admin already exists');
  }
}

async function listeningServer() {
  app.listen(config.PORT, () => {
    console.log(`Server listened on port: ${config.PORT}`);
  });
}
start()
  .then(createAdmin)
  .then(listeningServer)
  .catch((error) => {
    console.error(error);
  });

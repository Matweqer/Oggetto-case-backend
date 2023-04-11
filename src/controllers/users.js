import { NotFound } from 'http-errors';
import { User } from '../models';
import { hashPassword } from '../utils';

async function getUsers() {
  const users = await User.scope('data').findAll();
  if (!users) throw new NotFound('no_users_in_base');
  return users;
}

async function getRandomUser() {
  const users = await User.scope('data').findAll();
  if (!users) throw new NotFound('no_users_in_base');

  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

async function getImportant() {
  const [director, leadHr, teamLead, projectManager] = await Promise.all([
    User.findOneOrFail({ position: 'main mentor' }),
    User.findOneOrFail({ position: 'lead hr' }),
    User.findOneOrFail({ position: 'team lead' }),
    User.findOneOrFail({ position: 'project manager' }),
  ]);

  return {
    director, leadHr, teamLead, projectManager,
  };
}

async function createUser({
  email, password, name, birthday, position, grade, workProject, phone, telegram, office,
}) {
  const hashedPassword = hashPassword(password);
  birthday = new Date(birthday);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    birthday,
    position,
    grade,
    workProject,
    phone,
    telegram,
    office,
  });
  user.password = undefined;
  return user;
}

async function getUserById({ id }) {
  const user = await User.findByPk(id);
  if (!user) throw new NotFound('no_user_in_base');
  return user;
}

async function updateUser({
  params: { id },
  body: {
    email, name, birthday, position, grade,
    workProject, phone, hobbies, hardSkills, description, telegram, office,
  },
}) {
  const user = await User.findByPk(id);
  if (!user) throw new NotFound('no_user_in_base');

  await user.update({
    email,
    name,
    birthday,
    position,
    grade,
    workProject,
    phone,
    hobbies,
    hardSkills,
    description,
    telegram,
    office,
  });

  return user;
}

async function deleteUser({ id }) {
  const user = await User.findByPk(id);
  if (!user) throw new NotFound('no_user_in_base');

  await user.destroy();
}

async function updateProgress({ params: { id }, body: { progress } }) {
  const user = await User.findOneOrFail({ id });
  user.progress = progress;
  await user.save();
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  updateProgress,
  getRandomUser,
  getImportant,
};

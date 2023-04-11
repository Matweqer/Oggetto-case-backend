import { Router } from 'express';

import { wrap } from '../utils';
import { UsersController } from '../controllers';
import { roles } from '../constants';
import { authenticateToken, validateRequest } from '../middlewares';
import { progress, update } from '../requests';

const usersRouter = Router();

usersRouter
  .get(
    '/',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const users = await UsersController.getUsers();
      res.json(users);
    }),
  )
  .get(
    '/random',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const users = await UsersController.getRandomUser();
      res.json(users);
    }),
  )
  .get(
    '/important',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const users = await UsersController.getImportant();
      res.json(users);
    }),
  )
  .get(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const users = await UsersController.getUserById(req.params);
      res.json(users);
    }),
  )
  .patch(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(update),
    wrap(async (req, res) => {
      const user = await UsersController.updateUser(req);
      res.json(user);
    }),
  )
  .delete(
    '/:id',
    authenticateToken([roles.admin]),
    wrap(async (req, res) => {
      await UsersController.deleteUser(req.params);
      res.status(200);
    }),
  )
  .patch(
    '/:id/progress',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(progress),
    wrap(async (req, res) => {
      await UsersController.updateProgress(req);
      res.status(200).end();
    }),
  );

export { usersRouter };

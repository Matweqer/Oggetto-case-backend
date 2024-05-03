import { Router } from 'express';

import { wrap } from '../utils';
import { UsersController } from '../controllers';

const viewsRouter = Router();

viewsRouter
  .get(
    '/',
    wrap(async (req, res) => {
      const users = await UsersController.getUsers();
      console.log(users.length);
      res.render('index', { users });
    }),
  );

export { viewsRouter };

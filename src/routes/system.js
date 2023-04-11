import { Router } from 'express';

import { wrap } from '../utils';
import { SystemController } from '../controllers';
import { sendMail } from '../services';
import { authenticateToken } from '../middlewares';
import { roles } from '../constants';

const systemRouter = Router();

systemRouter
  .get(
    '/',
    wrap(async (req, res) => {
      res.json(SystemController.getAppData());
    }),
  )
  .get(
    '/notification/potentialFriend',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      sendMail(req.user.email, 'potentialFriend');
      res.status(200).end();
    }),
  );

export { systemRouter };

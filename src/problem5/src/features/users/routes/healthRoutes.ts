import express, { Request, Response, Router } from 'express';
import HTTP_STATUS from 'http-status-codes';
import moment from 'moment';


class HealthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  //to check whether ther server is healthy or not?
  public health(): Router {
    this.router.get('/health', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.OK).json(`Health: Server instance is healthy with process id ${process.pid} on ${moment().format('LL')}`);
    });
    return this.router;
  }
}

export const healthRoutes: HealthRoutes = new HealthRoutes();
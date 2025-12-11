import 'express-async-errors';
import HTTP_STATUS from 'http-status-codes';
import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import { config } from '@root/config';
import Logger from 'bunyan';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import applyRoutes from '@root/routes';
import swaggerStats from 'swagger-stats';
import { CustomError, IErrorResponse } from '@global/helpers/error-handler';


const logger: Logger = config.createLogger('server');

export class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }


    public start(): void {
        this.securityMiddleWare(this.app);
        this.standardMiddleWare(this.app);
        this.applyRoutes();
        this.apiMonitoring(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private securityMiddleWare(app: Application): void {
        app.use(helmet());
        app.use(hpp());
        app.use(cors({
            origin: config.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
          })
        );
    }

    private standardMiddleWare(app: Application): void {
        app.use(compression());
        app.use(json({ limit: '50mb' }));
        app.use(urlencoded({ limit: '50mb', extended: true }));
    }

    private  applyRoutes(): void {
        applyRoutes(this.app);
    }

    private apiMonitoring(app: Application): void {
        app.use(swaggerStats.getMiddleware({
          uriPath: '/api-monitoring',
        }));
    }

    private globalErrorHandler(app: Application): void {
        app.use((err: IErrorResponse, req: Request, res: Response, next: NextFunction): void => {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json(err.serializeErrors());
            } else if(err instanceof Error) {
                logger.error(err.message);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });

        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
        });
    }
    
    private startServer(app: Application): void {
        const PORT = config.PORT || 5001;
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    }
}
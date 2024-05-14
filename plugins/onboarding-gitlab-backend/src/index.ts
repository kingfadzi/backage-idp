import express, { Request, Response, NextFunction } from 'express';
import { createRouter } from './service/router';
import * as winston from 'winston';

// Function to create a logger
function createLogger(): winston.Logger {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            }),
        ],
    });
}

async function main() {
    const app = express();

    // Initialize the logger
    const logger = createLogger();

    // Create the router with the required logger
    const myRouter = await createRouter({
        logger: logger,
    });

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Register the router under the '/api/onboarding' path
    app.use('/api/onboarding', myRouter);

    // Basic error handling middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err) {
            logger.error('Unhandled error in the API', err);
            res.status(500).send('Internal Server Error');
        } else {
            next();
        }
    });

    // Determine the port from environment variables or use default
    const port = process.env.PORT || 7000;
    app.listen(port, () => {
        logger.info(`Backstage backend listening on port ${port}`);
    });
}

// Run the main function and catch any unhandled exceptions
main().catch(error => {
    console.error('Failed to start the backend', error);
});

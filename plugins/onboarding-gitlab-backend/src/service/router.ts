import { errorHandler } from '@backstage/backend-common';
import { LoggerService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import fetch from 'node-fetch';  // ensure 'node-fetch' is installed

export interface RouterOptions {
  logger: LoggerService;
}

export async function createRouter(
    options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  // Route to handle user onboarding by calling a custom API endpoint
  router.post('/onboard', async (req, res) => {
    const { username, password, appName } = req.body;
    try {
      const apiResponse = await fetch('http://localhost:8080/api/gitlab/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          appName
        })
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        res.status(200).json(data);
      } else {
        const errorData = await apiResponse.json();
        logger.error('Error from custom API:', errorData);
        res.status(apiResponse.status).json(errorData);
      }
    } catch (error) {
      logger.error('Failed to onboard user via custom API', error);
      res.status(500).send('Internal server error');
    }
  });

  router.use(errorHandler());
  return router;
}

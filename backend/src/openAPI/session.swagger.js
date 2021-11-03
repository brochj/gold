import { responses } from './components';

export const postSession = {
  tags: ['Sessions'],
  summary: 'Create a new session',
  description: 'Create a new session',
  operationId: 'postSession',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            password: {
              type: 'string',
              example: '123456',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'New session created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 120,
                  },
                  name: {
                    type: 'string',
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    example: 'johndoe@gmail.com',
                  },
                },
              },
              token: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE2LCJpYXQiOjE2MzUzNzU0MjgsImV4cCI6MTYzNTk4MDIyOH0.0R9GfpRtUmUngL2Hc_46Sz9vn8BiwY3sxDF-1Z__Qy0',
              },
            },
          },
        },
      },
    },
    '400': responses.BadRequest400,
    '401': responses.Unauthorized401,
  },
};

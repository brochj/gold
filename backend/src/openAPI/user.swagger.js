import { schemas, responses, securitySchemes } from './components';

export const postUser = {
  tags: ['Users'],
  summary: 'Create a new user',
  description: 'Create a new user passing all required fields',
  operationId: 'postUser',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: schemas.User,
      },
    },
  },
  responses: {
    '200': {
      description: 'New user created successfully',
      content: {
        'application/json': {
          schema: {
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
              birthday: {
                type: 'string',
                example: '1994-06-20T03:00:00.000Z',
              },
              height: {
                type: 'integer',
                example: 175,
              },
              weight: {
                type: 'string',
                example: '70.00',
              },
              gender: {
                type: 'string',
                example: 'male',
              },
            },
          },
        },
      },
    },
    '400': responses.BadRequest400,
  },
};

export const putUser = {
  tags: ['Users'],
  description: 'Update a user',
  operationId: 'putUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['email'],
          properties: {
            ...schemas.User.properties,
            oldPassword: schemas.User.properties.password,
            confirmPassword: schemas.User.properties.password,
          },
        },
      },
    },
  },
  responses: {
    '200': {},
    '400': responses.BadRequest400,
    '401': responses.Unauthorized401,
  },
};

export const deleteUser = {
  tags: ['Users'],
  description: 'Delete a user',
  operationId: 'deleteUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': responses.NoResponseBody200,
    '400': responses.BadRequest400,
    '401': responses.Unauthorized401,
  },
};

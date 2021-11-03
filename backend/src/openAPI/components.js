// -------------------------------
//  Reusable schemas (data models)
// -------------------------------
export const schemas = {
  User: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'John Doe',
      },
      email: {
        type: 'string',
        format: 'email',
        example: 'johndoe@gmail.com',
      },
      password: {
        type: 'string',
        format: 'password',
        example: '123456',
      },
      birthday: {
        type: 'string',
        format: 'date-time',
        example: '1994-06-20T03:00:00.000Z',
      },
      height: {
        type: 'integer',
        example: '175',
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
  Error: {
    type: 'object',
    properties: {
      error: {
        type: 'string',
        example: 'Token invalid',
      },
    },
  },
};

export const responses = {
  NoResponseBody200: {
    description: 'OK',
  },
  BadRequest400: {
    description: 'Wrong/Missing requestBody properties',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'gender field is required',
            },
          },
        },
      },
    },
  },
  Unauthorized401: {
    description: 'Access token is missing or invalid',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Token invalid',
            },
          },
        },
      },
    },
  },
};

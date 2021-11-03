import { postSession } from './openAPI/session.swagger';
import { postUser, putUser, deleteUser } from './openAPI/user.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.2',
    title: 'Diet App',
    description: 'Diet App API',
    termsOfService: '',
    contact: {
      name: 'Oscar Broch',
      email: 'brochj@gmail.com',
      url: 'https://github.com/brochj/gold',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: 'localhost:3333',
  basePath: '/',
  tags: [
    {
      name: 'Users',
      description: 'API for users in the system',
    },
    {
      name: 'Sessions',
      description: "Create JWT for user's session",
    },
  ],
  paths: {
    '/users': {
      post: postUser,
      put: putUser,
      delete: deleteUser,
    },
    '/sessions': {
      post: postSession,
    },
  },
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [
    {
      url: 'http://localhost:{port}/',
      description: 'Local server',
      variables: {
        port: {
          enum: ['3333', '3000'],
          default: '3333',
        },
      },
    },
    {
      url: 'https://app-dev.herokuapp.com/',
      description: 'Production',
    },
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        // "bearerAuth" is an arbitrary name for the security scheme
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // optional, arbitrary value for documentation purposes
      },
    },
  },
};

import { createUserEndpoint } from './endpoints/createUserEndpoint.js'
import { exampleEndpoint } from './endpoints/exampleEndpoint.js'
import {createTestEndpoint} from './endpoints/createTestEndpoint.js'
import {getTestEndpoint} from './endpoints/getTestEndpoint.js'

import express from 'express'

export const apiRouter = express.Router()
apiRouter.use(express.json())

apiRouter.get('/', exampleEndpoint)
apiRouter.post('/users', createUserEndpoint)
apiRouter.post('/test', createTestEndpoint)
apiRouter.get('/test', getTestEndpoint)
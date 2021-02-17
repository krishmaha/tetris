import { ApiRouterBuilder } from './apiRouterBuilder.js'
import { createUserEndpoint } from './endpoints/addUser.js'
import { exampleEndpoint } from './endpoints/exampleEndpoint.js'

const routerBuilder = new ApiRouterBuilder()
routerBuilder.addGetEndpoint('/', exampleEndpoint)
routerBuilder.addGetEndpoint('/users', createUserEndpoint)

export const apiRouter = routerBuilder.router
import { ApiRouterBuilder } from './apiRouterBuilder.js'
import { getUserEndpoint } from './endpoints/addUser.js'
import { exampleEndpoint } from './endpoints/exampleEndpoint.js'

const routerBuilder = new ApiRouterBuilder()
routerBuilder.addGetEndpoint('/', exampleEndpoint)
routerBuilder.addGetEndpoint('/users', getUserEndpoint)

export const apiRouter = routerBuilder.router
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";

import { Inject } from "typescript-ioc";

import RatingRoutes from "./routes/RatingRoutes";

export default class RatingApi
{
    constructor(@Inject private ratingRoutes: RatingRoutes) { }

    private async createApp()
    {
        const app: Koa = new Koa();
        const router: Router = new Router();

        this.ratingRoutes.register(router);

        app.use(logger());
        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());

        return Promise.resolve(app);
    }

    public async start()
    {
        const app = await this.createApp();
        console.log("Started listening on port 3000...");
        const server = app.listen(3000);
        return Promise.resolve(server);
    }
}
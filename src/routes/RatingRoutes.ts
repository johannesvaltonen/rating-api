import { IMiddleware, IRouterContext } from "koa-router";
import { Container, Inject } from "typescript-ioc";
import RatingController from "../controllers/RatingController";
import Route from "../model/Route";
import IRoutes from "./IRoutes";

export default class RatingRoutes extends IRoutes
{
    constructor( @Inject private ratingController: RatingController)
    {
        super();
    }

    protected getRoutes(): Route[]
    {
        return [
            Route.create("/ratings/default", "get", (ctx: IRouterContext) => this.ratingController.getDefaultRating(ctx)),
            Route.create("/ratings", "post", (ctx: IRouterContext) => this.ratingController.updateRatings(ctx))
        ];
    }
}
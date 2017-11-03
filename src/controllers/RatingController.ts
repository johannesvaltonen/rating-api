import { IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import Rating from "../model/Rating";
import RatingService from "../services/RatingService"

@Singleton
export default class RatingController
{
    constructor(@Inject private ratingService: RatingService) { }

    public async updateRatings(ctx: IRouterContext)
    {
        try
        {
            const rating: Rating = ctx.request.body;
            const result: Rating = await this.ratingService.updateRatings(rating);
            ctx.body = result;
        }
        catch (e)
        {
            ctx.throw(400, e.message);
        }
    }
}
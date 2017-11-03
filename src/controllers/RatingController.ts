import { IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import MatchRatings from "../model/MatchRatings";
import PlayerRating from "../model/PlayerRating";
import RatingService from "../services/RatingService"

@Singleton
export default class RatingController
{
    constructor(@Inject private ratingService: RatingService) { }

    public getDefaultRating(ctx: IRouterContext)
    {
        try
        {
            const result: PlayerRating = this.ratingService.getDefaultPlayerRating();
            ctx.body = result;
        }
        catch (e)
        {
            ctx.throw(400, e.message);
        }
    }

    public updateRatings(ctx: IRouterContext)
    {
        try
        {
            const rating: MatchRatings = ctx.request.body;
            const result: MatchRatings = this.ratingService.updateRatings(rating);
            ctx.body = result;
        }
        catch (e)
        {
            ctx.throw(400, e.message);
        }
    }
}
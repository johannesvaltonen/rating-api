import { Inject, Singleton } from "typescript-ioc";
import RatingCalculationException from "../exceptions/RatingCalculationException";
import Rating from "../model/Rating";

@Singleton
export default class RatingService
{
    constructor() { }

    public async updateRatings(rating: Rating): Promise<Rating>
    {
        try
        {
            return Promise.resolve(rating);
        }
        catch (e)
        {
            // if (e instanceof EntityNotFoundError)
            // {
            //     throw new RatingCalculationException("Calculation failed.");
            // }
            throw e;
        }
    }
}
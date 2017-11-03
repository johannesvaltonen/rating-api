import { Inject, Singleton } from "typescript-ioc";
import RatingCalculationException from "../exceptions/RatingCalculationException";
import MatchRatings  from "../model/MatchRatings";
import PlayerRating  from "../model/PlayerRating";

const glicko2 = require('glicko2');

@Singleton
export default class RatingService
{
    private settings: any;
    private ranking: any;

    constructor()
    {
        this.settings = {
            // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
            //      be tested to decide which value results in greatest predictive accuracy."
            tau : 0.75,
            // rating : default rating
            rating : 1500,
            //rd : Default rating deviation
            //     small number = good confidence on the rating accuracy
            rd : 200,
            //vol : Default volatility (expected fluctation on the player rating)
            vol : 0.06
          };

        this.ranking = new glicko2.Glicko2(this.settings);
    }

    public getDefaultPlayerRating(): PlayerRating
    {
        return {
            rating: this.settings.rating,
            deviation: this.settings.rd,
            volatility: this.settings.vol
        }
    }

    public updateRatings(currentRatings: MatchRatings): MatchRatings
    {
        try
        {
            let winner = this.createRankingPlayer(currentRatings.winnerRating);
            let loser = this.createRankingPlayer(currentRatings.loserRating);

            var matches = [
                [winner, loser, 1]
            ];

            this.ranking.updateRatings(matches);

            return {
                winnerRating: this.getUpdatedPlayerRating(winner),
                loserRating: this.getUpdatedPlayerRating(loser)
            }
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

    private createRankingPlayer(playerRating: PlayerRating)
    {
        return this.ranking.makePlayer(playerRating.rating, playerRating.deviation, playerRating.volatility);
    }

    private getUpdatedPlayerRating(rankingPlayer: any): PlayerRating
    {
        return {
            rating: rankingPlayer.getRating(),
            deviation: rankingPlayer.getRd(),
            volatility: rankingPlayer.getVol()
        }
    }
}
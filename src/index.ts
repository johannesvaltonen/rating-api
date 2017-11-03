
import "reflect-metadata";

import { Container } from "typescript-ioc";

import RatingApi from "./RatingApi";

const app: RatingApi = Container.get(RatingApi);
app.start();

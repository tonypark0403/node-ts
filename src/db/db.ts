import PgPromise from "pg-promise";

const devURL = "postgres://toursapi:toursapi@localhost:5432/toursapi";

export const pgPromise = PgPromise();

export const db = pgPromise(process.env.DATABASE_URL || devURL);

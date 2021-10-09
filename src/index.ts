import "reflect-metadata";
import { COOKIE, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "shop",
    username: "postgres",
    password: "password",
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE,
      store: new RedisStore({
        client: redis,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 Days
        httpOnly: true,
        secure: __prod__, //only https - dont in prod than https true
        sameSite: "lax", //csrf
      },
      saveUninitialized: false,
      secret: "sdssdfsdfsdflkkmdfndsnnnxvcnc",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { origin: "http://localhost:3000", credentials: true },
  });

  const port = 4000;

  app.listen(port, () => {
    console.log("Server started on port", port);
  });
};

main();

import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/index.js";

const secretKey = "chaveSecreta";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new Strategy(opts, (payload, done) => {
    User.findByPk(payload.user_id)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((error) => {
        done(error, false);
      });
  })
);

export default passport;

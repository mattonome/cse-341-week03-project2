const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      if (jwtPayload.userId) {
        return done(null, jwtPayload);
      }
      return done(null, false);
    })
  );
};

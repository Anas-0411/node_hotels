const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (userName, password, done) => {
    // authentication logic
    try {
      // console.log("Received Credentials:", userName, password);
      const user = await Person.findOne({ username: userName });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const isPassword = await user.comparePassword(password);
      if (isPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;

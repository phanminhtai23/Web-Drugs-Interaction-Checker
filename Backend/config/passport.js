const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Client = require('../models/client.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Đảm bảo biến này được lấy từ .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_URL}/auth/google/callback`, // Đường dẫn callback
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Client.findOne({ google_id: profile.id });
        if (!user) {
          user = await Client.create({
            google_id: profile.id,
            full_name: profile.displayName,
            email: profile.emails[0].value,
            profile_picture: profile.photos[0].value,
            auth_provider: 'google',
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
 

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Client.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});



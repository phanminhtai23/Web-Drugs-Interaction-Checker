const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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




passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/facebook/callback`, // Đường dẫn callback
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails, name, photos } = profile;
        let user = await Client.findOne({ facebook_id: id });

        if (!user) {
          user = await Client.create({
            facebook_id: id,
            email: emails[0].value,
            full_name: `${name.givenName} ${name.familyName}`,
            profile_picture: photos[0].value,
            auth_provider: 'facebook',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails, name } = profile;
        let user = await Client.findOne({ facebook_id: id });

        if (!user) {
          user = await Client.create({
            facebook_id: id,
            email: emails[0]?.value || `${id}@facebook.com`,
            full_name: `${name.givenName} ${name.familyName}`,
            auth_provider: 'facebook',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
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



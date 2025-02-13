import dotenv from "dotenv";
import passport from "passport";
import { Strategy as FacebookStrategy, Profile } from "passport-facebook";

dotenv.config();

interface ExtendedProfile extends Profile {
    accessToken?: string;
}

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID as string,
            clientSecret: process.env.FACEBOOK_APP_SECRET as string,
            callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
            profileFields: ["id", "displayName", "emails", "photos"],
        },
        (accessToken, refreshToken, profile: ExtendedProfile, done) => {
            profile.accessToken = accessToken; // Attach access token
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));

export default passport;

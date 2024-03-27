import passport from "passport";
import Strategy from "passport-discord";
import { discordModel } from "../mongoose/schema/discord.mjs";


passport.serializeUser((user, done)=>{
    console.log('inside serialize');
    console.log(user);

    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    
    console.log('inside Deserialize');
    console.log(id);
    try {
        
        const findUser = await discordModel.findById(id);

        // if(!findUser) throw new Error('user not found');

        return findUser ? done(null, findUser) : done(null, null);

        // done(null, findUser);
    } catch (error) {
        done(error, null)
    }
})

export default passport.use(
   new Strategy({
    clientID: '1221388315190886450',
    clientSecret: 'UsN_L-zIhZVcZXywaJg6JIhrwS1aIgVT',
    callBackUrl :'http://localhost:3000/api/auth/discord/redirect',
    scope: ['identify','guilds', 'email']
   }, async(accessToken, refreshToken, profile, done) => {
        console.log(profile);

        let findUser;
        
        try {
            findUser = await discordModel.findOne( { discordId : profile.id } );                        
        } catch (error) {
            done(error, null);
        }

        try {
            if(!findUser){

                const newUser = new discordModel({
                    username: profile.username,
                    discordId: profile.id,
                    email: profile.email
                });

                const newSavedUser = await newUser.save();
                return done(null, newSavedUser);
             }
            return done(null, findUser);
        } catch (error) {
            console.log(error);
           return done(error, null);
        }
    })
)
import passport from "passport";
import { Strategy } from "passport-local";
import { mockUser } from "../utills/constants.mjs";
import { UserModel } from "../mongoose/schema/user.mjs";
import { comparePassword } from "../utills/helpers.mjs";

passport.serializeUser((user, done)=>{
    console.log('inside serialize');
    console.log(user);

    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    
    console.log('inside Deserialize');
    console.log(id);
    try {
        
        const findUser = await UserModel.findById(id);

        if(!findUser) throw new Error('user not found');

        done(null, findUser);
    } catch (error) {
        done(error, null)
    }
})

export default passport.use(
    new Strategy( {usernameField: 'name'}, async (username, password, done)=>{
        console.log(username);
        console.log(password);
        
        try {
            const findUser = await UserModel.findOne({name: username});

            if(!findUser) throw new Error('User not found!');

            if(!comparePassword(findUser.password, password)) throw new Error('Bad credentials');
            // console.log('t' + findUser.password);
            // console.log('f' +password);
            // const findUser = mockUser.find((user)=> user.name === username);

            // if(!findUser) throw new Error('user not found');

            // if(findUser.password !== password) throw new Error('invalid credentials ');

            done(null, findUser);
        } catch (error) {
            done(error, null);
        }

    }));


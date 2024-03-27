import express from "express";
// import * as express from 'express';
import routes from './routes/index.mjs';
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
// import './strategies/local-strategy.mjs';
import './strategies/discord-strategy.mjs';
import mongoose  from "mongoose";
import MongoStore from "connect-mongo";
const app = express();

mongoose
    .connect('mongodb://localhost:27017/express')
    .then(()=>console.log('its connected to a database '))
    .catch((error)=> console.log(`there is ${error}`));

app.use(express.json());
app.use(cookieParser('muky-albany#$5'));

app.use(session({
    secret:'muky-albany', 
    saveUninitialized: true,
    resave : false,
    cookie:{
        maxAge : 60000 * 60
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);


app.post('/api/auth', passport.authenticate('local'),(request, response)=>{
    response.sendStatus(200);
});

const logInMiddleware = (request, response, next) =>{
    console.log(`${request.method} - ${request.url}`);

    next();
};

// app.use(logInMiddleware);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response)=>{

    console.log(request.session)
    console.log(request.sessionID)
    request.session.visted = true
     response.cookie('hello','world', {maxAge: 60000 * 60 * 2, signed: true});
     response.status(201).send({msg:'Assalamu alaikum!'});
});


app.get('/api/auth/status',(request, response)=>{
    
    console.log('/api/auth/status');

    console.log(request.user);
    console.log(request.session);
    
   return request.user ? response.status(200).send(request.user) : response.sendStatus(401);
});

app.get('/api/auth/logout',(request, response)=>{

    if(!request.user) return response.sendStatus(401);

    request.logout((error)=>{
        
        if(error) return response.sendStatus(400);

        response.sendStatus(200);
    });
});


app.get('/api/auth/discord', passport.authenticate('discord'));

app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (request, response)=>{
    
    console.log(request.session);
    console.log(request.user);
    console.log(request.sessionId);
    
    response.sendStatus(200);
});

app.listen(PORT, ()=>{
    console.log(`express app running on ${PORT}`);
});

// CLIENT_ID 1221388315190886450
//CLIENT SEC UsN_L-zIhZVcZXywaJg6JIhrwS1aIgVT
//URL http://localhost:3000/api/auth/discord/redirect

// app.get("/api/prophets", 
// query('filter').isString().notEmpty().withMessage('must not be empty')
// .isLength({min:3, max:10}).withMessage('must be at least 3- 10 characters'), 
// (request, response)=>{
    
//     const result = validationResult(request);
//     console.log(result)
//     const {query :{filter, value}} = request;

//     // console.log(filter, value);
//     // if(!filter && !value) return response.send(mockUser);

//     if(filter && value) return response.send(mockUser.filter((names)=> names[filter].includes(value)))
   
//     return response.send(mockUser);
// });

// app.get('/api/products', (request, response)=>{
//     return response.send([
//         {id:123, name:'rice', price:2000},
//     ]);
// }); 



// app.post('/api/createProphets', 
// checkSchema(createUserValidationSchema),
// // [body('name').notEmpty().withMessage('name cannot be empty')
// // .isLength({min:4, max:32}).withMessage('name must be at least 4-32 character')
// // .isString().withMessage('name must be a string'),body('title').notEmpty().withMessage('title cannot be empty!')],
// (request, response) =>{   

//     const result = validationResult(request);
//     // console.log(result);

//     if(!result.isEmpty())
//         return response.status(400).send({errors : result.array()})
    
    
//     const data = matchedData(request);

//     // console.log(data);

//     const { body} = request;

//     // console.log( mockUser[mockUser.length -1].id)

//     const newUser = {id: mockUser[mockUser.length -1].id +1, ...data}

//     // console.log(newUser)

//     return response.status(201).send(newUser);

// });

// app.put("/api/prophets/:id", resolvedUserId, (request, response)=>{

//     const { body, findUserIndex } = request;

//     // const parseID = parseInt(id);

//     // if(isNaN(parseID)) return response.sendStatus(400).send("invalid request");

//     // const findUserIndex = mockUser.findIndex((users)=> users.id === parseID);

//     // if(findUserIndex == -1) return response.sendStatus(400).send("invalid request");

//      mockUser[findUserIndex] = {id : mockUser[findUserIndex].id, ...body};

//      return response.sendStatus(200);
// });

// app.patch("/api/prophets/:id", resolvedUserId, (request, response)=>{
//     const {body, findUserIndex} = request;

//     // const parseID = parseInt(id);


//     // if(isNaN(parseID)) return response.sendStatus(400);

//     // const findUserIndex = mockUser.findIndex((user)=>user.id === parseID);

//     // if(findUserIndex == -1) return response.sendStatus(404);
    
//     mockUser[findUserIndex] = {...mockUser[findUserIndex], ...body};

//     return response.sendStatus(200);
// })

// app.delete("/api/prophets/:id",resolvedUserId, (request, response)=>{
//     // const {params:{id}} = request;

//     const {findUserIndex} = request;

//     // const passID = parseInt(id);

//     // if(isNaN(passID)) return response.sendStatus(400);

//     // const findUser = mockUser.findIndex((user)=> user.id === passID);

//     // if(findUser === -1) return response.sendStatus(404);

//     mockUser.splice(findUserIndex, 1);

//     return response.sendStatus(200);

// });



// app.post('/api/auth',(request, response)=>{
//     const {body :{name, password}} = request;

//     let findUser = mockUser.find(user => user.name === name);

//     if(!findUser || findUser.password !== password) return response.status(401).send({msg: 'the credentials are in correct'});

//     // if(findUser.password !== password) return response.status(401).send({msg: 'the credentials are in correct'});

//     request.session.user = findUser;

//     response.status(200).send(findUser);

// });


// app.get('/api/auth/status',(request, response)=>{

//     request.sessionStore.get(request.sessionID, (err, session) => {
//         console.log(session)
//     });

//     return request.session.user 
//         ? response.status(200).send(request.session.user) 
//         : response.status(401).send({msg: 'Not authenticated'});
// });



// app.post('/api/cart', (request, response)=>{
//     if(!request.session.user) return response.sendStatus(401);
  
//     const {body: item} = request;   

//     const {cart} =request.session

//     if(cart){
//         cart.push(item);
//     }else{
//         request.session.cart = [item];

//     }

//     return response.status(201).send(item)

     
// });


// app.get('/api/cart', (request, response)=>{

//     if(!request.session.user) return response.sendStatus(401);

//     return response.send(request.session.cart ?? []);

    
// })
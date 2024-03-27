import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashedPassword =(password)=>{
    
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(salt);
    
    return bcrypt.hashSync(password, salt)
};


export const comparePassword = (hashed, plainPass) =>{

    return bcrypt.compareSync(plainPass, hashed)
};

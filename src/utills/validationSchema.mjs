export const createUserValidationSchema = {
    name: {
        isLength:{
            options:{
                min:5,
                max:32
            },
            errorMessage: 'name must be at least 4-32 character'
        },

        notEmpty: {errorMessage: 'name cannot be empty!'},

        isString: {errorMessage: 'name must be a string'},


    },
    title:{
        notEmpty: {errorMessage: 'name cannot be empty!'},
        isString: {errorMessage: 'title must be a string'},
    },
    password:{

        notEmpty: {errorMessage: 'password cannot be empty!'},
        isLength:{
            options:{
                min:4,
                max:9
            },
            errorMessage: 'name must be at least 4-32 character'
        },
    }
}



export const productValidationSchema = {
    name:{
        notEmpty: {errorMessage: 'name cannot be empty!'},

        isString: {errorMessage: 'name must be a string'},

    },
    price:{
        notEmpty: {errorMessage: 'name cannot be empty!'},
    }
}
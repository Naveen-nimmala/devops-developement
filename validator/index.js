exports.createPostValidator = (req, res, next) => {

    req.check('title', "Write a title").notEmpty()
    req.check('title', "Title must be between 4 to 150 characters").isLength({
        min:4,
        max:150
    })

    req.check('body', "Write a body").notEmpty()
    req.check('body', "body must be between 4 to 2000 characters").isLength({
        min:4,
        max:2000
    })

    const errors = req.validationErrors()
    if (errors){
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({error: firstError })
    }
    next();
}

exports.userSignupValidator = (req, res, next) => {

    //Name validator 
    req.check("name", "Name is required").notEmpty()

    //Email validator
    req.check("email", "Email must be between 3 to 32 characters").isEmail().isLength({
        min: 4,
        max: 32
    })
    //Password validator
    req.check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })

    //check errors

    const errors = req.validationErrors()
    if (errors){
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({error: firstError })
    }
    next();

}
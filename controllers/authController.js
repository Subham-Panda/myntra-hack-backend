const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    //Remove password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body; //using the power of es6 destructuring
    //the above is same as writing const email = req.body.email; const password = req.body.password

    //1)Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password',
        });
    }

    //2)Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    //same as writing {email: email}
    //+ is used to select field if it is not selected by default
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or password',
        });
    }

    //3)If everything ok, send token to client
    createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
    //1) Get token and check if its there
    let token = null;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }


    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! Please log in to get access.',
        });
    }

    //2) Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //decoded will be the payload of the JWT

    //3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token does no longer exist.',
        });
    }

    //5)Grant access to protected route
    req.user = currentUser; //storing because it will used during authorization
    next();
});

//Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
    //1) Get token and check if its there
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );
            //decoded will be the payload of the JWT

            //3) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            //4) Check if user change password after JWT was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            //5)THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

import { verify,generateToken } from 'jsonwebtoken';
import { getuser, loginuser,registeruser } from '../services/userservice.js'; // Assuming you have a user model to interact with your database
export const verifytoken = (req,res,next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({success:false,message: 'No token provided' });
        }
        const tokenWithoutBearer = token.split(' ')[1];
        verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({success:false,message: 'Failed to authenticate token' });
            }
        });
        return res.status(200).json({success:true,message: 'Token is valid', user:decoded });
        next();
    };

export const getuserbyid = (req,res,next) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({success:false,message: 'User ID is required' });
    }
    // Assuming you have a function to get user by ID from your database
    getuser(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({success:false,message: 'User not found' });
            }
            res.status(200).json({success:true,user });
        })
        .catch(err => {
            res.status(500).json({success:false,message: 'Internal server error', error: err.message });
        });
}
export const registeruser = (req,res,next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({success:false,message: 'Username and password are required' });
    }
    // Assuming you have a function to register user in your database
    registerUser(username, password)
        .then(user => {
            res.status(201).json({success:true,message: 'User registered successfully', user });
        })
        .catch(err => {
            res.status(500).json({success:false,message: 'Internal server error', error: err.message });
        });
}
export const loginuser = (req,res,next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({success:false,message: 'Username and password are required' });
    }
    // Assuming you have a function to authenticate user in your database
    loginuser(username, password)
        .then(user => {
            if (!user) {
                return res.status(401).json({success:false,message: 'Invalid username or password' });
            }
            const token = generateToken(user); // Assuming you have a function to generate JWT token
            res.status(200).json({success:true,message: 'User logged in successfully', token });
        })
        .catch(err => {
            res.status(500).json({success:false,message: 'Internal server error', error: err.message });
        });
}
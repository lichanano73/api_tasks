const User = require('../models/model.user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.verifyToken = async (req,res,next)=>{
    try {
        const token_user = req.headers["x-access-token"]
        if(!token_user) return res.status(403).json({error: 'Es necesario Token'})

        const token_decode = jwt.verify(token_user,config.api_secret)
        const username = token_decode.username;
        
        const user = await User.findOne({ username });

        if (user) {

            req.user = {
                _id:        user._id,
                username:   user.username,
                name:       user.name,
                email:      user.email,
                rol:        user.rol
            };

            next();
        } else {
            return res.status(401).json({ error: 'No tiene autorización' });
        }

    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ error: 'Error al verificar el token' });
    }
}

exports.isAdmin = async (req, res, next) => {
    
    try { 
        
        const token_user = req.headers["x-access-token"]
        if(!token_user) return res.status(403).json({error: 'Es necesario Token'})

        const token_decode = jwt.verify(token_user, config.api_secret);
        const username = token_decode.username;
        
        const user = await User.findOne({ username });


        if (user && user.rol == 'admin') {
            console.log('\x1b[33m%s\x1b[0m', `========== isAdmin user.rol ${user.username, user.rol}  ==========`);
            req.user = {
                _id:        user._id,
                username:   user.username,
                name:       user.name,
                email:      user.email,
                rol:        user.rol
            };
            
            next();
        } else {
            return res.status(401).json({ error: 'Requiere rol administrador' });
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ error: 'Error al verificar el token' });
    }
};

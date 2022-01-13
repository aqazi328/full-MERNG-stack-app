import jwt from 'jsonwebtoken';
const SECRET_KEY = '7u32897u23wrfhsudby8o43htgo7berbo8@^*#($#@';

const checkAuth = (context) =>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (error) {
                throw "Invalid token... ERROR 3";
            }
        } else throw "Auth must be bearer token, ERROR 2";
    } else throw "Auth header must be provided, ERROR 1";
}

export default checkAuth;
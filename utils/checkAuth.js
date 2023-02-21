import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')

    if(token) {
        try{
            const decoded = jwt.verify(token,process.env.key)

            req.userId = decoded.id;
            req.productId = req.params.id

            next();
        } catch(e) {

            return res.status(403).json({
                messege: 'Not access'
            })
        }
    } else {
        return res.status(403).json({
            messege: 'Not access'
        })
    }
}
import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get<string>("accessTokenPrivateKey")
const publicKey = config.get<string>("accessTokenPublicKey")


export function signJwt(object : Object, options? : jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    })
}

export function verifyJwt(token:string){
    try {
        const decoded = jwt.verify(token,publicKey);
        if(decoded){
            console.log(decoded);
        }

        console.log("Token : ",token);
        console.log("Public Key : ",publicKey);
        
        console.log("decoded (JWT UTILS) : ",decoded);
        
        return {
            valid : true,
            expired : false,
            decoded
        }
    } catch (error:any) {
        return {
            valid : false,
            expired : error.message === "jwt expired",
            decoded : null
        }
    }
}
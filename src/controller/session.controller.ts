import { Request,Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response){
    // Steps to follow to create a session : 
    // * Validate the User's Password
    // * create a session
    // * create an access token
    // * create an refresh token
    // * return access and refresh token

    const user = await validatePassword(req.body);
    
    if(!user)
        res.status(401).send("invalid credentials")
    else{
        const session = await createSession(user._id, req.get("userAgent") || "")
        
        const accessToken = signJwt(
            {...user, session: session._id} ,{expiresIn: config.get("accessTokenTtl")}
        )
        const refreshToken = signJwt(
            {...user, session: session._id} ,{expiresIn: config.get("refreshTokenTtl")}
        )
        
        return res.send({accessToken, refreshToken});
    }
}

export async function getUserSessionsHandler(req:Request, res:Response){
    // Now to pass a user in our request we need to use a middleware (deserializeUser)
    // To verify our user we would need another middleware 
    const userId = res.locals.user._id;
    console.log('User ID : ',userId);
    

    const sessions = await findSessions({user : userId, valid : true})

    res.send(sessions)
}

export async function deleteSessionHandler(req:Request,res:Response){
    const sessionId = res.locals.user.session;

    await updateSession({_id: sessionId}, {valid: false})

    return res.send({
        accessToken:null,
        refreshToken:null
    })
}
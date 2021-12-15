import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {jwtConstants} from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    /**
     * validate will be used to add user object to request.
     * with this implementation the user object will look like
     *
     * req {
     *     user: {
     *         uid: "UUID-HERE",
     *         username: "name of the user"
     *     }
     * }
     * @param payload
     */
    async validate(payload: any) {
        return {uid: payload.sub, username: payload.username};
    }
}

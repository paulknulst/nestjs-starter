import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    async login(username: string, password: string) {
        if (username && username !== '' && password && password !== '') {
            const user = await this.usersService.findUserWithPasswordByUsername(username);
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    return {
                        username: user.name,
                        access_token: this.jwtService.sign({
                            user: {id: user.uid, username: user.name}
                        })
                    };
                } else {
                    throw {message: 'wrong username or password', code: 401};
                }
            } else {
                throw {message: 'wrong username or password', code: 401};
            }
        }
    }
}

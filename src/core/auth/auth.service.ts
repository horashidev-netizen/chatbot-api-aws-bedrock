import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/domains/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        console.log(user)
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        console.log(user)
        const payload = { id: user.id, firstname: user.firstName, lastname: user.lastName, email: user.email, address: user.address, role: user.role};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(user: any) {
        const newUser = await this.usersService.create(user);
        const { password, ...result } = newUser as any;
        return result;
    }
}
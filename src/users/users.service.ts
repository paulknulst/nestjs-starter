import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await UsersService.genPasswordHashFromString(createUserDto.password)
        return await this.userRepository.save(createUserDto);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(uid: string) {
        return await this.userRepository.findOne(uid);
    }

    /**
     * finds user with password field (important because password has select: false
     * @param username
     */
    async findUserWithPasswordByUsername(username: string) {
        return await this.userRepository
            .createQueryBuilder("user")
            .where("user.name = :username", {
                username: username
            })
            .addSelect("user.password")
            .getOne()
    }

    async findOneByUsername(username: string) {
        return await this.userRepository.find({
            where: {
                name: username
            },
            take: 1
        }).then(r => r[0])
    }

    async update(uid: string, updateUserDto: UpdateUserDto) {
        const updateUser = await this.userRepository.findOne(uid);

        if (!updateUser) {
            throw new NotFoundException('cannot find users');
        }

        updateUser.name = updateUserDto.name;
        updateUser.gender = updateUserDto.gender;
        updateUser.password = await UsersService.genPasswordHashFromString(updateUserDto.password)

        await updateUser.save();
        return updateUser;
    }

    remove(uid: string) {
        return `This action removes a #${uid} user`;
    }

    private static async genPasswordHashFromString(password: string) {
        const salt = await bcrypt.genSalt()

        console.log(password)
        console.log(salt)
        return await bcrypt.hash(password, salt);
    }

}

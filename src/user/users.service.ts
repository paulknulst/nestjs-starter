import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.save(createUserDto);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        return await this.userRepository.findOne(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const updateUser = await this.userRepository.findOne(id);

        if (!updateUser) {
            throw new NotFoundException('cannot find user');
        }

        updateUser.name = updateUserDto.name;
        updateUser.gender = updateUserDto.gender;

        await updateUser.save();
        return updateUser;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}

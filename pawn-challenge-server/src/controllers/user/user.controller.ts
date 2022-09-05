import { Body, Controller, Get, HttpException, HttpStatus, Post, Response } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
    constructor (private userService: UserService) {}

    @Post('/register')
    public async createUser(@Body() user: User) {
        return await this.userService.createUser1(user);
    }
    @Get('/all')
    public async findAll() {
        return await this.userService.findAll();
    }

    // @Get('/:userName')
    // public async findByUserName(@Body() userName: string) {
    //     return await this.userService.findByUserName(userName);
    // }
    
    @Post('/login')
    public async checkUserNameAndPassword(@Body() user: User) {
        return await this.userService.loginWithUserNameAndPassword(user);
    }
}

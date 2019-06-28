import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileRO } from './profile.interface';
import { User } from '../user/user.decorator';

import { ApiBearerAuth, ApiUseTags, } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('profiles')
@Controller('profiles')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) {
    }

    @Get(':username')
    async getProfile(@User('id') userId: number, @Param('username') username: string): Promise<ProfileRO> {
        return await this.profileService.findProfile(userId, username);
    }

    @Post(':username/follow')
    async follow(@User('email') email: string, @Param('username') username: string): Promise<ProfileRO> {
        return await this.profileService.follow(email, username);
    }

    @Delete(':username/follow')
    async unFollow(@User('id') userId: number, @Param('username') username: string): Promise<ProfileRO> {
        return await this.profileService.unFollow(userId, username);
    }

}

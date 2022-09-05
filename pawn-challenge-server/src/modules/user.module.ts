import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user/user.controller';
import { UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user/user.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
        ])
    ],
  controllers: [UserController],
  providers: [ UserService],
})

export class UserModule {}
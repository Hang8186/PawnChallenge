import { User, UserDocument } from '../../schemas/user.schema';
import { Injectable, Body, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Model, Collection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MongoClient } from 'mongodb';
import * as env from 'environment';
import * as bcrypt from 'bcrypt';

const client = new MongoClient(env.environment.connectionString);
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
  db = client.db('test');
  collection = this.db.collection('users');

  async loginWithUserNameAndPassword(user: User) {
    try {
      let userIn = await this.collection.findOne({ userName: user.userName });
      let passwordIn = await bcrypt.compare(user.password, userIn.password);
      if (userIn != null && passwordIn) {
        return 'login success';
      }
      return 'username or password is incorrect';
    } catch (error) {
      console.log(error);
    }
  }

  async createUser1(user: User) {
    try {
      const userCount = await this.userModel.countDocuments({ userName: user.userName });
      if (userCount > 0) {
        throw new Error("User not exists");
      } else {
        let createUser = new this.userModel(user);
        createUser.id = createUser._id;
        createUser.createAt = Date.now().toString();
        createUser.password = await bcrypt.hash(user.password, 10);
        await createUser.save();
        return {messs: `User [${user.id}] is created`}
      }
    } catch (error) {
      if(error.message == "User not exists"){
        throw new HttpException('username is exist!', HttpStatus.BAD_REQUEST);
      }else{
        throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async createUser(user: User) {
    try {
      let userIn = await this.collection.findOne({ userName: user.userName });
      if (userIn != null) {
        return new BadRequestException('user already exists');
      } else {
        let createUser = new this.userModel(user);
        createUser.id = createUser._id;
        createUser.createAt = Date.now().toString();
        createUser.password = await bcrypt.hash(user.password, 10);
        return await createUser.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findByUserName(userName: string) {
    return await this.userModel.findOne({ userName: userName }).exec();
  }
}

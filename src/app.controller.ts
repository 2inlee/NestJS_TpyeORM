import { Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUser(){
    return this.userRepository.save({
      role : Role.ADMIN,
    });
  }

  
  @Get('users')
  getUsers(){
    return this.userRepository.find({
      relations:{
        profile: true,
        posts: true,
      }
    });
  }

  @Patch('users/:id')
  async patchUser(
    @Param('id') id: string,
  ){
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      }
    });
    
    return this.userRepository.save({
      ...user,
    });
  }

  @Post('user/profile')
  async createUserAndProfile(){
    const user = await this.userRepository.save({
      email: "asdf@inlee.com"
    });

    const profile = await this.profileRepository.save({
      user,
      profileImg: 'asdf.png',
    });
    return user;
  }

  @Post('user/post')
  async createUserAndPost(){
    const user = await this.userRepository.save({
      email: "postuser@inlee.com",
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });
  
    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });
    return user;
  }

  @Post('posts/tags')
  async createPostsTags(){
    const post1 = await this.postRepository.save({
      title: 'tag test 1',
    });

    const post2 = await this.postRepository.save({
      title: 'tag test 2',
    });

    const tag1 = await this.tagRepository.save({
      name: 'JS',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'TS',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS',
      tags: [tag1, tag2],
    }); 
    return true;
  }
}
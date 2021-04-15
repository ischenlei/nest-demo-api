import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { Post as PostSchema } from './post.model'
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'

class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: '帖子标题' })
  @IsNotEmpty({ message: '请填写标题' })
  title: string
  @ApiProperty({ description: '帖子内容', example: '帖子内容' })
  content: string
}

class UpdatePostDto {
  @ApiProperty({ description: '帖子标题' })
  title: string
  @ApiProperty({ description: '帖子内容' })
  content: string
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(
    @InjectModel(PostSchema)
    private readonly PostModel: ModelType<CreatePostDto>
  ) {}

  @Get()
  @ApiOperation({ description: '显示帖子列表' })
  async index() {
    return await this.PostModel.find()
  }

  @Post()
  @ApiOperation({ description: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDto) {
    await this.PostModel.create(createPostDto)
    return {
      success: true
    }
  }

  @ApiOperation({ description: '帖子详情' })
  @Get(':id')
  async detail(@Param('id') id: string) {
    return await this.PostModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({ description: '编辑帖子' })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.PostModel.findByIdAndUpdate(id, updatePostDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ description: '删除帖子' })
  async remove(@Param('id') id: string) {
    await this.PostModel.findByIdAndDelete(id)
    return {
      success: true
    }
  }
}

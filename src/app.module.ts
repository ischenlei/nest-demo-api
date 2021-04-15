import { Module } from '@nestjs/common'
// import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [
    PostsModule,
    TypegooseModule.forRoot('mongodb://localhost/nest-swagger-api', {
      useNewUrlParser: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

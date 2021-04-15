import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
// import * as mongoose from 'mongoose'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  //直接连接方式
  // await mongoose.connect('mongodb://localhost/nest-swagger-api', {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true
  // })

  const app = await NestFactory.create(AppModule)

  //验证管道
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('NestJs博客API')
    .setDescription('Hello,NestJs')
    .setVersion('1.0')
    // .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(5000)
}

bootstrap()

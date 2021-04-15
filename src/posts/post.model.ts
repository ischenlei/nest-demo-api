import { getModelForClass, prop } from '@typegoose/typegoose'

export class Post {
  @prop()
  title: string

  @prop()
  content: string
}

// export const postModel = getModelForClass(Post)

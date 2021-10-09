import { Post } from "../entities/Post";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { v4 } from "uuid";
import { User } from "src/entities/User";
import { Any, getConnection, Like } from "typeorm";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field(() => [String!]!)
  picture: [string];
  @Field()
  price: number;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }

  @Mutation(() => Boolean, { nullable: true })
  async deletePosts() {
    await Post.delete({});
    return true;
  }

  @Mutation(() => Post, { nullable: true })
  item(@Arg("shopId") shopId: string) {
    return Post.findOne({ shopId });
  }

  @Mutation(() => [Post], { nullable: true })
  async search(@Arg("title") title: string): Promise<Post[]> {
    const searchingQB = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("s")
      .where("s.title ilike :title", { title: `%${title}%` });

    return searchingQB.getMany();
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
  ): Promise<Post> {
    const token = await v4();

    return Post.create({ ...(input as any), shopId: token }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}

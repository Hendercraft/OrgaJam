import {Post} from "./post";
import {User} from "./user";

export interface PostWithUser{
    post:Post;
    user:User;
}
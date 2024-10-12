import { createPost } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject)=>{
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObejct.user; add later

    const post = await createPost(caption, image);

    return post;
}

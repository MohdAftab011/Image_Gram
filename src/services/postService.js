import { countAllPosts, createPost, findAllPosts } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject)=>{
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObejct.user; add later

    const post = await createPost(caption, image);

    return post;
}

export const getAllPostService = async(offset,limit)=>{
    const posts = await findAllPosts(offset,limit);

    const totalDocuments = await countAllPosts();

    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts, totalPages, totalDocuments 
    }
}
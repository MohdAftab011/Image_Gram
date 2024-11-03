import { countAllPosts, createPost, deletePostById, findAllPosts, findPostById, updatePostById } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject)=>{
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    const user = createPostObject.user; 

    const post = await createPost(caption,image,user);

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

export const deletePostService = async(id,user)=>{
    const post = await findPostById(id);
    
    if(post.user!=user){
        throw{
            status : 401,
            message : "Unauthorised"
        }
    }
    const response  = await deletePostById(id);
    return response;
}

export const updatePostService = async (id,updateObject)=>{
    const response = await updatePostById(id,updateObject);
    return response;
}
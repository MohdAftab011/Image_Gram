import { createPostService, deletePostService, getAllPostService, updatePostService } from "../services/postService.js";

export async function createPost(req,res){
    //call service layer
    if(!req.file || !req.file.path) {
        return res.status(400).json({
            success: false,
            message: "Image is required"
        });
    }
    const post  = await createPostService({
        caption : req.body.caption, 
        image:req.file.path
    });

    return res.status(201).json({
        success:true,
        message:"Post created successfully",
        data : post
    });

}

export async function getAllPosts(req,res){
    try{
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const PaginatedPosts = await getAllPostService(offset,limit);

        return res.status(200).json({
            success:true,
            message:"All posts fetched successfully",
            data : PaginatedPosts
        });
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
}

export async function deletePost(req,res){
   try {
    const postId = req.params.id;
    const response = await deletePostService(postId);
    if(!response){
        return res.status(404).json({
            success:false,
            message:"Post Not Found",
        });
    }
    return res.status(200).json({
        success:true,
        message:"Post deleted successfully",
        data : response
    });
   } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
   }
}

export async function updatePost(req,res){
    try {
        console.log("req file", req.file);
        const updateObject = req.body;
        if(req.file) {
            updateObject.image = req.file.path;
        }
        const response = await updatePostService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: response
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
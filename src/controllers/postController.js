import { createPostService, getAllPostService } from "../services/postService.js";

export async function createPost(req,res){
    //call service layer
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

import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    try {
        const {videoId} = req.params
        const allVideoComments = await Comment.find({video: videoId})
        if(allVideoComments.length === 0) {
            throw new ApiError(400, 'no comments found')
        }
        return res.status(200).json(
            new ApiResponse(200, allVideoComments, "all video comments fetched successfully")
        )
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "Error getting video comments")
        
    }
})

const addComment = asyncHandler(async (req, res) => {
    try {
        const { videoId } = req.params
        const { content } = req.body
        const newComment = await Comment.create({content: content, video: videoId, owner: req.user._id})
        if(!newComment){
            throw new ApiError(400, "Comment not created")
        }
        return res.status(200).json(
            new ApiResponse(200, newComment, "comment created successfully")
        )
  
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "Error adding comment")
    }
})

const updateComment = asyncHandler(async (req, res) => {
    try {
        const {content} = req.body
        const { commentId} = req.params
        const oldcomment = await Comment.findById(commentId)
        if(!oldcomment){
            throw new ApiError(400, "Comment not exist")
        }
        oldcomment.content = content
        await oldcomment.save()
        return res.status(200).json(
            new ApiResponse(200, oldcomment, "comment updated successfully")
        )
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "Error while updating comment")
        
    }
})

const deleteComment = asyncHandler(async (req, res) => {
   try {
     const { commentId } = req.params
     await Comment.findByIdAndDelete(commentId)
     return res.status(200).json(
        new ApiResponse(200, "Comment deleted successfully")
     )
   } catch (error) {
    console.log(error.message);
    throw new ApiError(500, "internal error while deleting comment")
    
   }
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
    }

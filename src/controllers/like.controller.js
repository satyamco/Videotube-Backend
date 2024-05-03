import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
   try {
     const {videoId} = req.params

     const isLiked = await Like.findOne({video: videoId})
     if(!isLiked){
        const likedVideo = await Like.create({video: videoId, likedBy: req.user._id})
        if(!likedVideo){
            throw new ApiError(500, "Error while liking the video")
        }
        return res.status(200).json(
            new ApiResponse(200, likedVideo, "video liked this video successfully")
        )
     }
     const deleteLike = await Like.deleteOne({video: videoId})
     if(!deleteLike){
        throw new ApiError(500, "Error while deleting like video")
     }
     return res.status(200).json(
        new ApiResponse(200, " you unliked this video")
     )
   } catch (error) {
    console.log(error.message);
    throw new ApiError(500, "internal error while toggling like")
   }
   
})

const toggleCommentLike = asyncHandler(async (req, res) => {

    try {
        const {commentId} = req.params
   
        const isLiked = await Like.findOne({comment: commentId})
        if(!isLiked){
           const likedComment = await Like.create({comment: commentId, likedBy: req.user._id})
           if(!likedComment){
               throw new ApiError(500, "Error while liking the video")
           }
           return res.status(200).json(
               new ApiResponse(200, likedComment, "video liked this video successfully")
           )
        }
        const deleteLike = await Like.deleteOne({comment: commentId})
        if(!deleteLike){
           throw new ApiError(500, "Error while deleting like video")
        }
        return res.status(200).json(
           new ApiResponse(200, " you unliked this video")
        )
      } catch (error) {
       console.log(error.message);
       throw new ApiError(500, "internal error while toggling like")
      }
      

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    try {
        const {tweetId} = req.params
   
        const isLiked = await Like.findOne({tweet: tweetId})
        if(!isLiked){
           const likedTweet = await Like.create({tweet: tweetId, likedBy: req.user._id})
           if(!likedTweet){
               throw new ApiError(500, "Error while liking the video")
           }
           return res.status(200).json(
               new ApiResponse(200, likedTweet, "video liked this video successfully")
           )
        }
        const deleteLike = await Like.deleteOne({tweet: tweetId})
        if(!deleteLike){
           throw new ApiError(500, "Error while deleting like video")
        }
        return res.status(200).json(
           new ApiResponse(200, " you unliked this video")
        )
      } catch (error) {
       console.log(error.message);
       throw new ApiError(500, "internal error while toggling like")
      }
      
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    try {
        const allLikedVideos = await Like.find({likedBy: req.user._id})
        if(!allLikedVideos){
            throw new ApiError(400, "something went wrong")
        }
        return res.status(200).json(
            new ApiResponse(200, allLikedVideos, "all liked videos fetched successfully") 
        )
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "internal error while getting liked videos")
    }
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
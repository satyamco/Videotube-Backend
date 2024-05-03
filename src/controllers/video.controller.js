import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    //const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    
    const videos = await Video.find()
    if(!videos?.length){
        throw new ApiError(404, "no videos found")
    }
    return res.status(200).json(
        new ApiResponse(200, videos, "all video fetched successfully")
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    try {
        const { title, description} = req.body
        // TODO: get video, upload to cloudinary, create video
         if([title, description].some((feilds) => feilds.trim() === "")){
            throw new ApiError(400, "all feilds are required")
         }
    
         const videofileLocalPath = req.files?.videoFile[0]?.path
         const thumbnaillocalPath = req.files?.thumbnail[0]?.path
    
         if(!videofileLocalPath ){
            throw new ApiError(400, "video is a required file")
         }
         if(!thumbnaillocalPath ){
            throw new ApiError(400, "thumbnail is a required file")
         }
    
         const videofile = await uploadOnCloudinary(videofileLocalPath);
         const thumbnail = await uploadOnCloudinary(thumbnaillocalPath);

         if(!videofile){
            throw new ApiError(500, "error in uploading videofile on cloudinary")
         }
         if(!thumbnail){
            throw new ApiError(500, "error in uploading thumbnail on cloudinary")
         }
          
    
        const video = await Video.create({
            title,
            description,
            videoFile: videofile.url,
            thumbnail: thumbnail.url,
            duration: videofile.duration,
            owner: req.user._id,
            
        })
    
        if(!video){
            throw new ApiError(400, "something went wrong uploading or publishing video")
        }
    
        return res.status(201).json(new ApiResponse(201, video, "video published successfully")) 
    
    
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "error uploading video")
    }
})

const getVideoById = asyncHandler(async (req, res) => {
    
    //TODO: get video by id
    try {
      const { videoId } = req.params;
      if(!videoId){
        throw new ApiError(400, "video not found")
      }
      const video = await Video.findById(videoId);
      if(!video){
        throw new ApiError(400, "something went wrong while fething the vdo")
      }
      video.views += 1;
      await video.save();
      return res.status(200).json(
        new ApiResponse(200, video, "video fetched sucessfully")
      )
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "error getting video") ;
    }
})

const updateVideo = asyncHandler(async (req, res) => {
    
    //TODO: update video details like title, description
    try {
        const { videoId } = req.params
        const updateVideo = await Video.findByIdAndUpdate(videoId, req.body);
        if(updateVideo){
           return res.status(200).json(
                new ApiResponse(200, updateVideo, "video updated successfully")
            )
        }
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "error updating video");
    }
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if(!videoId){
        throw new ApiError(500, "missing video");
    }
    //TODO: delete video
    const video = await Video.findByIdAndDelete(videoId);
    
    return res.status(200).json(
        new ApiResponse(200, video, "video deleted successfully")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(400, "video does not exist")
    }
    if(video?.isPublished === true){
        video.isPublished = false
        await video.save()
        return res.status(200).json(
            new ApiResponse(200, "video unpublished successfully")
        )
    }
        video.isPublished = true
        await video.save()
    
    return res.status(200).json(
        new ApiResponse(200, "video published successfully")
    ) 
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}

import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
        try {
            // Get total video views
            const totalVideoViews = await Video.aggregate([
                { $group: { _id: null, totalViews: { $sum: "$views" } } }
            ]);
    
            // Get total subscribers
            const totalSubscribers = await Subscription.countDocuments({ channel: req.user._id });
    
            // Get total videos
            const totalVideos = await Video.countDocuments({ owner: req.user._id });
    
            // Get total likes
            const totalLikes = await Like.countDocuments({});
    
            return res.status(200).json({
                totalVideoViews: totalVideoViews.length > 0 ? totalVideoViews[0].totalViews : 0,
                totalSubscribers,
                totalVideos,
                totalLikes
            });
            
        } catch (error) {
            console.log(error.message);
            throw new ApiError(500, "Internal error while getting channel stats");
        }
})

const getChannelVideos = asyncHandler(async (req, res) => {
    try {
        const channelVideos = await Video.find({owner: req.user._id})
        if(!channelVideos){
            throw new ApiError(400, "channel does not have videos")
        }
        return res.status(200).json(
            new ApiResponse(200, channelVideos, "all videos fetched successfully")
        )
        
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "internal error while getting channel videos")
        
    }
})
 
export {
    getChannelStats, 
    getChannelVideos
    }
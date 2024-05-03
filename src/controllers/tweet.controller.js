import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    try {
        const { content } = req.body
        if (!content) {
            throw new ApiError(401, "tweet content is requried")
        }
    
        const tweet = await Tweet.create({content, owner: req.user._id})
        if(!tweet){
            throw new ApiError(401, "something went wrong while creating tweet")
        }
        return res.status(201).json(
            new ApiResponse(201, tweet, "tweet created successfully")
        )
    } catch (error) {
        console.log("something went wrong while creating tweet", + error.message);
        throw new ApiError(404, "something went wrong while creating tweet" )
    }
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    try {

        const tweets = await Tweet.find({owner: req.user._id});
        if(!tweets){
            throw new ApiError(404, "can not get tweets somting went wrong")
        }
        return res.status(200).json(
            new ApiResponse(200, tweets, "all fetched user tweet successfully")
        )
       
    } catch (error) {
        console.log("something went wrong while getting user tweets" + error.message);
        throw new ApiError(404, "something went wrong while getting user tweets")
}})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    try {
        const tweetId = req.params.tweetId
        console.log(tweetId);
        const { content } = req.body
        console.log(req.body);
        const updateTweet = await Tweet.findById(tweetId);
        if(!updateTweet){
            throw new ApiError(401, "cannot update tweet something went wrong")
        }
        updateTweet.content = content
        await updateTweet.save()
        return res.status(200).json(
            new ApiResponse(200, updateTweet, "tweet updated sucessfully")
        )    
    } catch (error) {
        console.log("cannot update tweet something went wrong" + error.message);
        throw new ApiError(401, "something went wrong while updating tweet")  
    }
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    try {
        const tweetId = req.params.tweetId
        const tweet = await Tweet.findByIdAndDelete(tweetId)
        return res.status(200).json(
            new ApiResponse(200, "tweet deleted sucessfully")
        )
    } catch (error) {
        console.log("something went wrong while deleting the tweet"+ error.message);
        throw new ApiError(401, "something went wrong while deleting the tweet");
    }
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}

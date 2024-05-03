import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params;
        const subscriberId = req.user._id;
             
        // Check if the user is already subscribed to the channel
        const isSubscribed = await Subscription.find({ channel: channelId, subscriber: subscriberId });
        
        if (isSubscribed.length === 0) {

            // If not subscribed, create a new subscription
            const subscribed = await Subscription.create({ channel: channelId, subscriber: subscriberId });
            if (!subscribed) {
                throw new ApiError(500, "Something went wrong while subscribing to the channel");
            }
            return res.status(201).json( new ApiResponse(201, subscribed, "Channel subscribed successfully"));

        } else { 
            // If already subscribed, unsubscribe
            await Subscription.deleteOne({ channel: channelId, subscriber: subscriberId });
            return res.status(200).json( new ApiResponse(200, null, "Channel unsubscribed successfully"));
        }
    } catch (error) {
        console.log("Something went wrong in toggle subscription: " + error);
        throw new ApiError(500, "Something went wrong in toggle subscription");
    }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    try {
        const {channelId} = req.params
        const subscribers = await Subscription.find({channel: channelId});
        if(!subscribers){
            throw new ApiError(300, "you do not have any subscriber")
        }
        return res.status(200).json(
            new ApiResponse(200, subscribers , "subcriber count fetched successfully")
        )
    } catch (error) {
        console.log("can't subscribe to the channel" + error);
        throw new ApiError(500, "Can't subscribe to the channel")
        
    }
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
   
    try {
        const {subscriberId}  = req.params
        const subscribedChannels = await Subscription.find({subscriber: subscriberId})
        if(!subscribedChannels){
            throw new ApiError(300,  "you have not subscribed any channels")
        }
        return res.status(200).json(
            new ApiResponse(200, subscribedChannels, " subscribed channels fetched successfully")
        )
    } catch (error) {
        console.log("cant get subscribed channels" + error);
        throw new ApiError(500, "Can't get subscribed channels")
        
    }
})


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
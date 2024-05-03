import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const healthcheck = asyncHandler(async (req, res) => {
    try {
        res.status(200).json(
           new ApiResponse(200, "everything is working fine")
        )
    } catch (error) {
        throw new ApiError(500, "Internal Server Error")
    }
})

export {
    healthcheck
    }
    
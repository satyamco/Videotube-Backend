# VideoTube Full API

VideoTube Full API is a RESTful API backend for a video-sharing platform, allowing users to upload, view, like, and comment on videos and user can tweet.


## Introduction

VideoTube Full API serves as the backend for a video-sharing platform, providing various endpoints to handle user authentication, video management, likes, comments, and more. This API is designed to be scalable, secure, and efficient, ensuring a seamless experience for both users and developers.

## Features

- User authentication (register, login, logout)
- Video management (upload, view, update, delete)
- Like and dislike videos
- Comment on videos
- View video statistics (views, likes, comments)
- Secure token-based authentication
- Scalable architecture

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing

## Installation

To run the VideoTube Full API locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/satyamco/VideoTube-full-Api.git

```
2. Install dependencies:

```bash
cd VideoTube-full-Api
npm install
```
3.Set up environment variables:Create a .env file in the root directory and add the following variables:

```bash
PORT=4000
MONGODB_URI=mongodb: YOUR DATABASE URI
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET= YOUR ACCESS TOKEN SECRET
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=UOUR SECRET
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME= YOUR NAME
CLOUDINARY_API_KEY= YOUR APIKEY
CLOUDINARY_API_SECRET= YOUR API SECRET

```

Replace your_mongodb_connection_string with your MongoDB connection string, and your_jwt_secret with a secret key for JWT token generation.

4. Start the server

```bash
npm run dev
```
The API will start running on http://localhost:4000 by default.
 
## Usage
Once the server is running, you can use tools like Postman or curl to interact with the API endpoints. Refer to the API Endpoints section for details on available endpoints and their usage.

# API Endpoints

 ## base URL
 
- Localhost: http://localhost:4000/api/v1
- Public: https://videotube-backend.onrender.com/api/v1/healthcheck

## healthcheck EndPoint

GET  http://localhost:4000/api/v1/healthcheck

## User Routes
 
POST http://localhost:4000/api/v1/users/register : Register a new user.

POST http://localhost:4000/api/v1/users/login: Login with username and password.

GET http://localhost:4000/api/v1/users/current-user: get current user.

PATCH http://localhost:4000/api/v1/users/change-password: FOR changing password.

POST http://localhost:4000/api/v1/users/logout: logout current user.

 ## Video Routes
 
POST http://localhost:4000/api/v1/vidoes : for upload a video.

GET http://localhost:4000/api/v1/vidoes : get all videos.

GET http://localhost:4000/api/v1/videos/:videoID : get video by Id

PATCH  http://localhost:4000/api/v1/videos/:videoID : UPDATE video details

## Tweets Routes 

POST http://localhost:4000/api/v1/tweets : createTweet.

PATCH http://localhost:4000/api/v1/tweets/:tweetId  :updatTweet.

DELETE http://localhost:4000/api/v1/tweets/:tweetId  :deleteTweet.

GET http://localhost:4000/api/v1/tweets/:userId/:tweetId :getUsersTweets.


## Subscription Routes

POST http://localhost:4000/api/v1/subscriptions/c/:channelId   :SubscriptionToggle.

GET  http://localhost:4000/api/v1/subscriptions/c/:channelId   :GetUserChannelSubscribers.

GET http://localhost:4000/api/v1/subscriptions/u/:subscriberId   :GetSubscribedChannel.

## Playlist Routes

Post http://localhost:4000/api/v1/playlist/:playlistId   :CreatePlaylist.

GET http://localhost:4000/api/v1/playlist/:playlistId   :getPlaylistById.

PATCH http://localhost:4000/api/v1/playlist/:playlistId :updatePlaylist.

PATCH http://localhost:4000/api/v1/playlist/add/:videoId/:playlistId :addVideoToPlaylist.

PATCH http://localhost:4000/api/v1/playlist/remove/:videoId/:playlistId :RemoveVideoFromPlaylist

GET http://localhost:4000/api/v1/playlist/user/:userId :GetPlaylistByUserId

## Like Routes

POST http://localhost:4000/api/v1/likes/toggle/v/:videoId :toggleVideoLike.

POST http://localhost:4000/api/v1/likes/toggle/c/:commentId :toggleCommentLike.

POST http://localhost:4000/api/v1/likes/toggle/t/:tweetId :toggleTweetLike

GET http://localhost:4000/api/v1/likes/videos  :getLikedVideos.

## Dasboard Routes

GET http://localhost:4000/api/v1/dashboard/stats  :getTotalLike, totalViews, totalSubscribers, totalVideos.

GET http://localhost:4000/api/v1/dashboard/videos  :getChannelVideos.

## Comments Routes

GET http://localhost:4000/api/v1/comments/:videoId :getVideoComments.

POST http://localhost:4000/api/v1/comments/:videoId :addCommentToVideo.

PATCH http://localhost:4000/api/v1/comments/c/:commentId :upadteComment.

DELETE http://localhost:4000/api/v1/comments/c/:commentId  :DelelteComment.


## Contributing
Contributions to VideoTube Full API are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

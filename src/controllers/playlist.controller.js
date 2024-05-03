
import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(400, "Please provide a name and description. These are required fields.");
  }
  const playlist = await Playlist.create({ name, description, owner: req.user._id });
  if (!playlist) {
    throw new ApiError(500, "Something went wrong while creating playlist.");
  }
  res.status(201).json(new ApiResponse(201, playlist, "Playlist created successfully."));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const playlists = await Playlist.find({ owner: userId });
  if (!playlists || playlists.length === 0) {
    throw new ApiError(404, "User does not have any playlists.");
  }
  res.status(200).json(new ApiResponse(200, playlists, "Playlists fetched successfully."));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!mongoose.isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID.");
  }
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }
  res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched successfully."));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }
  if (playlist.videos.includes(videoId)) {
    throw new ApiError(400, "Video already exists in the playlist.");
  }
  playlist.videos.push(videoId);
  await playlist.save();
  res.status(200).json(new ApiResponse(200, playlist, "Video added to the playlist successfully."));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }
  const index = playlist.videos.indexOf(videoId);
  if (index === -1) {
    throw new ApiError(404, "Video not found in the playlist.");
  }
  playlist.videos.splice(index, 1);
  await playlist.save();
  res.status(200).json(new ApiResponse(200, playlist, "Video removed from the playlist successfully."));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  await Playlist.findByIdAndDelete(playlistId);
  res.status(200).json(new ApiResponse(200, null, "Playlist deleted successfully."));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(400, "Please provide a name and description. These are required fields.");
  }
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { name, description },
    { new: true }
  );
  if (!updatedPlaylist) {
    throw new ApiError(404, "Playlist not found.");
  }
  res.status(200).json(new ApiResponse(200, updatedPlaylist, "Playlist updated successfully."));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};

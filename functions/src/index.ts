import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as firebase from "firebase";
import { firebaseConfig } from "./secret";
import { firebaseAuth } from "./util/middleware";
import {
    deleteWhisper,
    getAllWhispers,
    getWhisper,
    getWhispersByUser,
    isLike,
    likeWhisper,
    postComment,
    postWhisper,
    unLikeWhisper,
} from "./handlers/whispers";
import {
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead,
    uploadImageProfile,
    userForgotPassword,
    userLogIn,
    userLogOut,
    userSignUp,
} from "./handlers/users";
import {
    createNotificationOnComment,
    createNotificationOnLike,
    deleteNotificationsOnUnlike,
    onUserImageChange,
    onWhisperDelete,
} from "./handlers/triggers";

firebase.initializeApp(firebaseConfig);

const app = express();

app.use(cors({ origin: true }));

// WHISPER
// Get all whisper
app.get("/whispers", getAllWhispers);

// Get all whispers by user
app.get("/whispers/:userName", getWhispersByUser);

// Post one whisper
app.post("/whisper", firebaseAuth, postWhisper);

// get one whisper
app.get("/whisper/:whisperID", getWhisper);

// delete whisper
app.delete("/whisper/:whisperID/delete", firebaseAuth, deleteWhisper);

// like a whisper
app.get("/whisper/:whisperID/like", firebaseAuth, likeWhisper);

// is user already like a whisper?
app.get("/whisper/:whisperID/is-like", firebaseAuth, isLike);

// unlike a whisper
app.get("/whisper/:whisperID/unlike", firebaseAuth, unLikeWhisper);

// COMMENT
// comment a whisper
// Post one comment
app.post("/whisper/:whisperID/comment", firebaseAuth, postComment);

// USER
// Forgot password route
app.post("/forgot-password", userForgotPassword);

// SignUp route
app.post("/signup", userSignUp);

// Login route
app.post("/login", userLogIn);

app.post("/logout", firebaseAuth, userLogOut);

// Add user detail
app.post("/user", firebaseAuth, addUserDetails);

// Post image profile
app.post("/user/image", firebaseAuth, uploadImageProfile);

// Get single user
app.get("/user", firebaseAuth, getAuthenticatedUser);

// Get user details
app.get("/user/:userName", getUserDetails);

// get notifications
app.post("/notifications", firebaseAuth, markNotificationsRead);

// exports.api = functions.region('asia-southeast2').https.onRequest(app);
exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = createNotificationOnLike;

exports.deleteNotificationOnUnlike = deleteNotificationsOnUnlike;

exports.createNotificationOnComment = createNotificationOnComment;

exports.onUserImageChange = onUserImageChange;

exports.onWhisperDelete = onWhisperDelete;

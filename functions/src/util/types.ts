// Please arrange the key in alphabetical order
export type Whisper = {
    body: string;
    commentCount: number;
    createdAt: number;
    id?: string;
    lifeTime: number;
    likeCount: number;
    userImage: string;
    userName: string;
};

export type Comment = {
    body: string;
    createdAt: number;
    userName: string;
    userImage: string;
    whisperID: string;
};

export type UserCredentials = {
    bio: string;
    createdAt: number;
    email: string;
    imageURL: string;
    location: string;
    updatedAt: number;
    userID: string;
    userName: string;
    website: string;
};

export type Likes = {
    userName: string;
    whisperID: string;
};

export type User = {
    credentials: UserCredentials;
    likes: Likes;
    notifications: Notifications;
};

// upload user image profile
export type ImgProfile = {
    filepath: string;
    mimetype: string;
};

// Notifications
export type Notifications = {
    createdAt: number;
    read: boolean;
    recipient: string;
    sender: string;
    type: string;
    whisperID: string;
};

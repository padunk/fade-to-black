import { Request, Response } from "express";
import * as firebase from "firebase";
import * as BusBoy from "busboy";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { v4 as uuidV4 } from "uuid";
import { admin, db } from "../util/admin";
import { ImgProfile, UserCredentials } from "../util/types";
import { updateLoginTime } from "../util/helpers";

// SIGN UP
export const userSignUp = (req: Request, res: Response) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
    };

    let userToken: string | undefined;
    let userId: string | undefined;

    db.doc(`users/${newUser.userName}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                throw new Error("auth/username-already-in-use");
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        newUser.email,
                        newUser.password
                    )
                    .catch((err: Error) => {
                        console.log("err1 >>", err);
                        throw new Error(err.message);
                    });
            }
        })
        .then((data) => {
            if (data) {
                userId = data?.user?.uid;
                return data?.user?.getIdToken();
            }
            return;
        })
        .then((token) => {
            if (!token) return;
            userToken = token;
            const time = new Date().getTime();
            const newUserData: UserCredentials = {
                bio: "",
                createdAt: time,
                email: newUser.email,
                imageURL:
                    "https://firebasestorage.googleapis.com/v0/b/fade-to-black-f3f53.appspot.com/o/no-img.png?alt=media&token=53ee1f63-23ca-4537-b14b-ec109719bcf4",
                lastLogin: 0,
                lastLogout: 0,
                userId: userId!,
                userName: newUser.userName,
                website: "",
            };

            return db.doc(`users/${newUser.userName}`).set(newUserData);
        })
        .then(() => {
            return res.status(201).json({ userToken });
        })
        .catch((err) => {
            console.log("err2 >>", err);
            switch (err.code || err.message) {
                case "auth/email-already-in-use":
                    res.status(400).json({ error: err.message });
                    break;
                case "auth/username-already-in-use":
                    res.status(400).json({ error: "Username already taken." });
                    break;
                case "auth/weak-password":
                    res.status(400).json({ error: err.message });
                    break;
                default:
                    res.status(500).json({
                        error: err.message,
                        code: err.code,
                        general: "Something went wrong, please try again",
                    });
                    break;
            }
        });
};

// LOGIN
export const userLogIn = (req: Request, res: Response) => {
    let id: string;
    firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((data) => {
            if (data.user?.uid) {
                id = data.user?.uid;
                // save login time
                updateLoginTime(id);
            }
            return data.user?.getIdToken();
        })
        .then((token) => {
            res.json({ token });
        })
        .catch((err) => {
            console.log("err", err);
            switch (err.code) {
                case "auth/wrong-password":
                    res.status(400).json({ error: "Wrong password." });
                    break;
                case "auth/user-not-found":
                    res.status(400).json({ error: "User not found." });
                    break;
                case "auth/too-many-requests":
                    res.status(400).json({
                        error:
                            "Too many failed login attempts. Try resetting your password or you can try again later.",
                    });
                    break;
                default:
                    res.status(500).json({
                        error: err.message,
                        code: err.code,
                    });
                    break;
            }
        });
};

export const userLogOut = (req: any, res: Response) => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            db.doc(`users/${req.user.userName}`).update({
                lastLogout: new Date().getTime(),
            });
            return res.json({
                logout: "success",
            });
        })
        .catch((error) => {
            return res.json({
                error: error.message,
                code: error.code,
            });
        });
};

export const uploadImageProfile = (req: any, res: Response) => {
    const busboy = new BusBoy({ headers: req.headers });

    let imageToBeUploaded: ImgProfile;

    busboy.on(
        "file",
        (
            _,
            file: NodeJS.ReadableStream,
            filename: string,
            mimetype: string
        ) => {
            if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
                res.status(400).json({
                    error: "Wrong file type, please use either jpg or png",
                });
                return;
            }

            const imageExtension = filename.match(/\w*$/);
            const imageFilename = `${uuidV4()}.${imageExtension![0]}`;
            const filepath = path.join(os.tmpdir(), imageFilename);
            imageToBeUploaded = { filepath, mimetype };
            file.pipe(fs.createWriteStream(filepath));
        }
    );

    // https://firebasestorage.googleapis.com/v0/b/fade-to-black-f3f53.appspot.com/o/no-img.png?alt=media&token=53ee1f63-23ca-4537-b14b-ec109719bcf4
    busboy.on("finish", () => {
        return admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype,
                    },
                },
            })
            .then((data) => {
                // console.log("data", data[0].metadata);
                const { bucket, name } = data[0].metadata;
                const imageURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${name}?alt=media`;
                return db
                    .doc(`/users/${req.user.userName}`)
                    .update({ imageURL });
            })
            .then(() => {
                res.json({ message: "Image uploaded successfully " });
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    });

    busboy.end(req.rawBody);
};

// Add user details
export const addUserDetails = (req: any, res: Response) => {
    const userDetails = req.body;
    userDetails.updatedAt = new Date().getTime();

    db.doc(`/users/${req.user.userName}`)
        .update(userDetails)
        .then(() => {
            res.json({ message: "Details added succesfully" });
            return;
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).json({ error: err.code });
            return;
        });
};

// Get single user details
export const getAuthenticatedUser = (req: any, res: Response) => {
    let userData: any = {};

    db.doc(`/users/${req.user.userName}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db
                    .collection("likes")
                    .where("userName", "==", req.user.userName)
                    .get();
            }
            throw new Error("User doesn't exists");
        })
        .then((data) => {
            userData.likes = [];
            data?.forEach((doc) => {
                userData.likes.push(doc.data());
            });
            return db
                .collection("notifications")
                .where("recipient", "==", req.user.userName)
                .orderBy("createdAt", "desc")
                .limit(10)
                .get();
        })
        .then((data) => {
            userData.notifications = [];
            data.forEach((doc) => {
                userData.notifications.push({
                    createdAt: doc.data().createdAt,
                    notificationID: doc.id,
                    read: doc.data().read,
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    type: doc.data().type,
                    whisperID: doc.data().whisperID,
                });
            });
            res.json(userData);
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).json({ error: err.message });
        });
};

export const getUserDetails = (req: Request, res: Response) => {
    let userData: any = {};

    db.doc(`/users/${req.params.userName}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                res.status(404);
                throw new Error("Users not found");
            }
            userData = doc.data();
            return db
                .collection("whispers")
                .where("userName", "==", req.params.userName)
                .orderBy("createdAt", "desc")
                .get();
        })
        .then((data) => {
            userData.whispers = [];
            data.forEach((d) => {
                userData.whispers.push({
                    body: d.data().body,
                    commentCount: d.data().commentCount,
                    createdAt: d.data().createdAt,
                    id: d.id,
                    lifeTime: d.data().lifeTime,
                    likeCount: d.data().likeCount,
                    userImage: d.data().userImage,
                    userName: d.data().userName,
                });
            });
            res.json(userData);
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).json({ error: err.code });
        });
};

export const markNotificationsRead = (req: Request, res: Response) => {
    const batch = db.batch();

    req.body.forEach((notifID: string) => {
        const notifications = db.doc(`/notifications/${notifID}`);
        batch.update(notifications, { read: true });
    });
    batch
        .commit()
        .then(() => {
            res.json({ message: "Notificatons read" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

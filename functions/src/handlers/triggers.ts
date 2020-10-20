import * as functions from "firebase-functions";
import { db } from "../util/admin";

export const createNotificationOnLike = functions.firestore
    .document("likes/{id}")
    .onCreate((snapshot) => {
        return db
            .doc(`/whispers/${snapshot.data().whisperID}`)
            .get()
            .then((doc) => {
                if (
                    doc.exists &&
                    doc.data()?.userName !== snapshot.data().userName
                ) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().getTime(),
                        read: false,
                        recipient: doc.data()?.userName,
                        sender: snapshot.data().userName,
                        type: "like",
                        whisperID: doc.id,
                    });
                } else {
                    throw new Error("Something went wrong");
                }
            })
            .catch((err) => {
                console.error("err", err);
            });
    });

export const deleteNotificationsOnUnlike = functions.firestore
    .document("likes/{id}")
    .onDelete((snapshot) => {
        return db
            .doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch((err) => {
                console.error("err", err);
            });
    });

export const createNotificationOnComment = functions.firestore
    .document("comments/{id}")
    .onCreate((snapshot) => {
        return db
            .doc(`/whispers/${snapshot.data().whisperID}`)
            .get()
            .then((doc) => {
                if (
                    doc.exists &&
                    doc.data()?.userName !== snapshot.data().userName
                ) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().getTime(),
                        read: false,
                        recipient: doc.data()?.userName,
                        sender: snapshot.data().userName,
                        type: "comment",
                        whisperID: doc.id,
                    });
                } else {
                    throw new Error("Something went wrong");
                }
            })
            .catch((err) => {
                console.error("err", err);
            });
    });

export const onUserImageChange = functions.firestore
    .document("/users/{userId}")
    .onUpdate((change) => {
        const imageBefore = change.before.data().imageURL;
        const imageAfter = change.after.data().imageURL;

        if (imageBefore !== imageAfter) {
            const batch = db.batch();
            return db
                .collection("whispers")
                .where("userName", "==", change.before.data().userName)
                .get()
                .then((datas) => {
                    datas.forEach((data) => {
                        const whisper = db.doc(`/whispers/${data.id}`);
                        batch.update(whisper, {
                            userImage: imageAfter,
                        });
                    });
                    return batch.commit();
                });
        }
        return true;
    });

// when whisper is deleted, all comments, likes and notif must be delete too.
// it is easier in sql with cascading delete I think.
export const onWhisperDelete = functions.firestore
    .document("/whispers/{whisperId}")
    .onDelete((_, context) => {
        const whisperID = context.params.whisperId;
        const batch = db.batch();

        return db
            .collection("comments")
            .where("whisperID", "==", whisperID)
            .get()
            .then((datas) => {
                // delete comments
                datas.forEach((data) => {
                    batch.delete(db.doc(`/comments/${data.id}`));
                });
                return db
                    .collection("likes")
                    .where("whisperID", "==", whisperID)
                    .get();
            })
            .then((datas) => {
                // delete likes
                datas.forEach((data) => {
                    batch.delete(db.doc(`/likes/${data.id}`));
                });
                return db
                    .collection("likes")
                    .where("whisperID", "==", whisperID)
                    .get();
            })
            .then((datas) => {
                // delete notifications
                datas.forEach((data) => {
                    batch.delete(db.doc(`/notifications/${data.id}`));
                });
                batch.commit();
            })
            .catch((err) => {
                console.error(err);
            });
    });

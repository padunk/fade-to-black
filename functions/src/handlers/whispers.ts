import { Request, Response } from "express";
import { db } from "../util/admin";
import { Comment, Whisper } from "../util/types";

export const getAllWhispers = (_: any, res: Response) => {
    db.collection("whispers")
        .orderBy("createdAt", "desc")
        .get()
        .then((data) => {
            const whispers: any = [];
            data.forEach((doc) => {
                whispers.push(Object.assign({}, doc.data(), { id: doc.id }));
            });
            return res.json(whispers);
        })
        .catch((err) => console.log("err", err));
};

export const getWhispersByUser = (req: any, res: Response) => {
    db.collection("whispers")
        .where("userName", "==", req.params.userName)
        .orderBy("createdAt", "desc")
        .get()
        .then((data) => {
            const whispers: any = [];
            data.forEach((doc) => {
                whispers.push(Object.assign({}, doc.data(), { id: doc.id }));
            });
            return res.json(whispers);
        })

        .catch((err) => {
            res.status(500).json({ error: "Something went wrong." });
            console.log("err", err);
        });
};

// POST
// post one whisper
export const postWhisper = (req: any, res: Response) => {
    const newWhisper: Whisper = {
        body: req.body.body,
        commentCount: 0,
        createdAt: new Date().getTime(),
        lifeTime: 300000,
        likeCount: 0,
        userImage: req.user.imageURL,
        userName: req.user.userName,
    };

    db.collection("whispers")
        .add(newWhisper)
        .then((doc) => {
            newWhisper.id = doc.id;
            return res.json(newWhisper);
        })
        .catch((err) => {
            res.status(500).json({ error: "Something went wrong." });
            console.log("err", err);
        });
};

export const getWhisper = (req: Request, res: Response) => {
    let whisperData: any = {};

    db.doc(`/whispers/${req.params.whisperID}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                res.status(404).json({ error: "Whisper not found" });
                return;
            }
            whisperData = doc.data();
            whisperData.id = doc.id;
            return db
                .collection("comments")
                .where("whisperID", "==", req.params.whisperID)
                .orderBy("createdAt", "desc")
                .get();
        })
        .then((data) => {
            whisperData.comments = [];
            data?.forEach((d) => {
                whisperData.comments.push(d.data());
            });
            res.json(whisperData);
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).json({ error: err.message });
        });
};

export const postComment = (req: any, res: Response) => {
    if (req.body.body.trim() === "") {
        res.status(400).json({ error: "Comment must not be empty" });
        return;
    }

    const newComment: Comment = {
        body: req.body.body,
        createdAt: new Date().getTime(),
        userImage: req.user.imageURL,
        userName: req.user.userName,
        whisperID: req.params.whisperID,
    };

    const whisperDoc = db.doc(`/whispers/${req.params.whisperID}`);

    whisperDoc
        .get()
        .then((doc) => {
            if (!doc.exists) {
                res.status(404).json({ error: "Whisper not found" });
                return;
            }
            const whisperData: any = doc.data();
            whisperDoc.update({ commentCount: whisperData.commentCount + 1 });
            return db.collection("comments").add(newComment);
        })
        .then(() => {
            res.json(newComment);
        })
        .catch((err) => {
            res.status(500).json({ error: "Something went wrong" });
        });
};

export const likeWhisper = (req: any, res: Response) => {
    const likeDocument = db
        .collection("likes")
        .where("userName", "==", req.user.userName)
        .where("whisperID", "==", req.params.whisperID)
        .limit(1);

    const whisperDoc = db.doc(`/whispers/${req.params.whisperID}`);

    let whisperData: any;

    whisperDoc
        .get()
        .then((doc) => {
            if (doc.exists) {
                whisperData = doc.data();
                whisperData.id = doc.id;
                return likeDocument.get();
            }
            throw new Error("Whisper doesn't exist");
        })
        .then((data) => {
            if (data?.empty) {
                return db
                    .collection("likes")
                    .add({
                        whisperID: req.params.whisperID,
                        userName: req.user.userName,
                    })
                    .then(() => {
                        whisperData.likeCount = whisperData.likeCount + 1;
                        return whisperDoc.update({
                            likeCount: whisperData.likeCount,
                        });
                    })
                    .then(() => {
                        res.json(whisperData);
                        return;
                    });
            } else {
                res.status(400).json({
                    error: "You already like this whisper",
                });
                return;
            }
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).json({ error: err.message });
        });
};

export const unLikeWhisper = (req: any, res: Response) => {
    const likeDocument = db
        .collection("likes")
        .where("userName", "==", req.user.userName)
        .where("whisperID", "==", req.params.whisperID)
        .limit(1);

    const whisperDoc = db.doc(`/whispers/${req.params.whisperID}`);

    let whisperData: any;

    whisperDoc
        .get()
        .then((doc) => {
            if (doc.exists) {
                whisperData = doc.data();
                whisperData.id = doc.id;
                return likeDocument.get();
            }
            throw new Error("Whisper doesn't exist");
        })
        .then((data) => {
            if (!data?.empty) {
                return db
                    .doc(`/likes/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        whisperData.likeCount = whisperData.likeCount - 1;
                        return whisperDoc.update({
                            likeCount: whisperData.likeCount,
                        });
                    })
                    .then(() => {
                        res.json(whisperData);
                        return;
                    });
            } else {
                res.status(400).json({
                    error: "You already unlike this whisper",
                });
                return;
            }
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).json({ error: err.message });
        });
};

export const deleteWhisper = (req: any, res: Response) => {
    const whisperDoc = db.doc(`/whispers/${req.params.whisperID}`);
    whisperDoc
        .get()
        .then((doc) => {
            if (!doc.exists) {
                res.status(404).json({ err: "Whisper not found" });
                return;
            }
            if (doc.data()?.userName !== req.user.userName) {
                res.status(403).json({ error: "Unauthorized" });
                return;
            } else {
                whisperDoc.delete();
                return;
            }
        })
        .then(() => {
            res.json({ message: "Whisper deleted successfully" });
        })
        .catch((err) => {
            console.log("err :>> ", err);
            res.status(500).json({ error: "Something went wrong" });
            return;
        });
};

import { Response, NextFunction } from "express";
import { admin, db } from "../util/admin";

// middleware
export const firebaseAuth = (req: any, res: Response, next: NextFunction) => {
    let idToken: string;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No token found");
        res.status(403).json({ error: "Unauthorized" });
    }

    admin
        .auth()
        .verifyIdToken(idToken!)
        .then((decodedToken) => {
            req.user = decodedToken;
            return db
                .collection("users")
                .where("userId", "==", req.user.uid)
                .limit(1)
                .get();
        })
        .then((data) => {
            req.user.userName = data.docs[0].data().userName;
            req.user.imageURL = data.docs[0].data().imageURL;
            return next();
        })
        .catch((err) => {
            console.log("err", err);
            res.status(403).json(err);
        });
};

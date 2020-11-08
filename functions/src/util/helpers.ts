import { db } from "./admin";

export const updateLoginTime = (id: string) => {
    db.collection("users")
        .where("userId", "==", id)
        .limit(1)
        .get()
        .then((user) =>
            user.forEach((u) =>
                u.ref.update({
                    lastLogin: new Date().getTime(),
                })
            )
        );
};

import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Notifications, RootState } from "types";
import { markNotificationsRead } from "../../redux/actions/userActions";
import {
    MdComment,
    MdNotificationsNone,
    MdNotificationsActive,
} from "react-icons/md";
import { AiTwotoneFire } from "react-icons/ai";
import { Link } from "react-router-dom";

type INotificationsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const NotificationIcon: React.FC<INotificationsProps> = ({
    markNotificationsRead,
    notifications,
}) => {
    const [openDetailNotif, setOpenDetailNotif] = React.useState<boolean>(
        false
    );

    const readNotif = () => {
        const unreadNotificationIds = notifications.map((notif) =>
            notif.read === false ? notif.notificationID : null
        );

        setOpenDetailNotif(!openDetailNotif);

        if (unreadNotificationIds.length > 0) {
            markNotificationsRead(unreadNotificationIds);
        }
    };

    const isNotifs = (notifs: Notifications[]): boolean =>
        notifs.every((notif) => notif.read);

    const checkNotifs = (notifs: Notifications[]): JSX.Element => {
        if (!isNotifs(notifs)) {
            return (
                <div
                    className="relative text-purple-700 fill-current cursor-pointer"
                    onClick={readNotif}
                >
                    <MdNotificationsActive size={20} className="fill-current" />
                    <span className="w-3 h-3 rounded-full bg-red-600 text-white absolute right-0 bottom-0 text-xs flex justify-center items-center -mr-1">
                        {notifications.length}
                    </span>
                </div>
            );
        } else {
            return (
                <div className="text-gray-600 fill-current">
                    <MdNotificationsNone
                        className="cursor-pointer fill-current"
                        size={20}
                        onClick={() => setOpenDetailNotif(!openDetailNotif)}
                    />
                </div>
            );
        }
    };

    const liSkeleton = (notif: Notifications) => {
        const liStyle: string = isNotifs(notifications)
            ? "px-4 py-2 bg-blue-500"
            : "px-4 py-2 bg-red-500";

        return (
            <li className={liStyle} key={notif.createdAt}>
                <Link
                    to={`/whisper/${notif.whisperID}`}
                    className="flex items-center gap-x-3"
                    onClick={() => setOpenDetailNotif(!openDetailNotif)}
                >
                    <span>
                        {notif.type === "comment" ? (
                            <MdComment />
                        ) : (
                            <AiTwotoneFire />
                        )}
                    </span>
                    <span className="text-sm">
                        New {notif.type} from {notif.sender}
                    </span>
                </Link>
            </li>
        );
    };

    return (
        <>
            {checkNotifs(notifications)}
            {openDetailNotif && (
                <ul className="absolute z-10 top-0 right-0 mt-6 rounded-md w-56 divide-red-400 divide-y-2 overflow-hidden">
                    {notifications.length === 0 ? (
                        <li className="px-4 py-2 bg-purple-300">
                            No notification.
                        </li>
                    ) : notifications.length > 10 ? (
                        notifications.slice(0, 11).map(liSkeleton)
                    ) : (
                        notifications.map(liSkeleton)
                    )}
                </ul>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        notifications: state.user.notifications,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            markNotificationsRead,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon);

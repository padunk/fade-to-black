import React from "react";
import { Redirect, Route } from "react-router-dom";

type IPrivateRouteProps = {
    authenticated: boolean;
    children: React.ReactNode;
    path: string;
};

const PrivateRoute: React.VFC<IPrivateRouteProps> = ({
    authenticated,
    children,
    path,
    ...props
}: any) => {
    return (
        <Route
            path={path}
            {...props}
            render={({ location }) =>
                authenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

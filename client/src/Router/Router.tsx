import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RootState } from "types";
import Layout from "../Layout/Layout";
import NotFound from "../Pages/404";
import About from "../Pages/About";
import Feed from "../Pages/Feed";
import Home from "../Pages/Home";
import WhisperDetail from "../Pages/WhisperDetail";
import UserProfile from "../Pages/UserProfile";
import UserDetail from "../Pages/UserDetail";
import PrivateRoute from "./PrivateRoute";

type IRouterProps = ReturnType<typeof mapStateToProps>;

const Router: React.FC<IRouterProps> = ({ authenticated }) => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <Route
                        path="/user/:userName"
                        exact
                        component={UserDetail}
                    />
                    <PrivateRoute path="/feed" authenticated={authenticated}>
                        <Feed />
                    </PrivateRoute>
                    <PrivateRoute
                        path="/whisper/:whisperID"
                        authenticated={authenticated}
                    >
                        <WhisperDetail />
                    </PrivateRoute>
                    <PrivateRoute
                        path="/profile/:userName"
                        authenticated={authenticated}
                    >
                        <UserProfile />
                    </PrivateRoute>
                    <Route path="*" component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

const mapStateToProps = ({ user }: RootState) => {
    return {
        authenticated: user.authenticated,
    };
};

export default connect(mapStateToProps)(Router);

import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Layout from "../Layout/Layout";
import NotFound from "../Pages/404";
import About from "../Pages/About";
import Feed from "../Pages/Feed";
import Home from "../Pages/Home";
import { RootState } from "types";

function PrivateRoute({ children, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                rest.authenticated ? (
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
}

const Router: React.FC<{ authenticated: boolean }> = ({ authenticated }) => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <PrivateRoute path="/feed" authenticated={authenticated}>
                        <Feed />
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

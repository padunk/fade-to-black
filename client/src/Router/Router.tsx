import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../Layout/Layout";
import About from "../Pages/About";
import Home from "../Pages/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;

import React from "react";
import { Link } from "react-router-dom";
import Container from "../Auth/components/Container/Container";

const NotFound = () => {
    return (
        <Container>
            <div className="text-center text-orange-500">
                <h2 className="text-4xl">Not Found</h2>
                <p>The page you are looking for doesn't exist.</p>
                <p>Error code: 404</p>
                <Link to="/">Back to Home</Link>
            </div>
        </Container>
    );
};

export default NotFound;

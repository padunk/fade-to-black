import React from "react";
import Container from "../components/Container/Container";

const About = () => {
    return (
        <Container className="flex-col px-5 py-3">
            <div className="px-5 py-3 rounded-md bg-gray-700 bg-opacity-25 border border-gray-200 mb-4 hover:bg-opacity-50 transition-all duration-200">
                <h2 className="text-2xl text-orange-500">WHAT IS THIS APP?</h2>
                <p className="mb-2">
                    The Idea of this project is a clone of the <em>Stories</em>{" "}
                    feature of other social media and put it here.
                </p>
                <p>
                    Full repo at{" "}
                    <a
                        className="underline text-purple-400"
                        href="https://github.com/padunk/fade-to-black"
                    >
                        Github
                    </a>
                </p>
            </div>

            <div className="px-5 py-3 rounded-md bg-gray-700 bg-opacity-25 border border-gray-200 hover:bg-opacity-50 transition-all duration-200">
                <h2 className="text-2xl text-orange-500">Projects Detail</h2>
                <ul className="pl-2 divide-y divide-gray-500 grid-cols-3 lg:grid lg:divide-x lg:divide-y-0">
                    <li className="py-2 lg:px-4">
                        <h3 className="text-lg text-purple-500">Feature:</h3>
                        <ul className="pl-2">
                            <li>Login</li>
                            <li>SignUp / Register</li>
                            <li>Forgot Password</li>
                            <li>Read Story</li>
                            <li>Read Story Detail</li>
                            <li>Post Story</li>
                            <li>Delete Story</li>
                            <li>Post Comment</li>
                            <li>Read user profile</li>
                            <li>Update user profile</li>
                            <li>Notifications</li>
                            <li>Digital wellbeing</li>
                        </ul>
                    </li>
                    <li className="py-2 lg:px-4">
                        <h3 className="text-lg text-purple-500">Tech Stack:</h3>
                        <h4 className="text-md text-purple-300">Front End:</h4>
                        <ul className="pl-2">
                            <li>Axios</li>
                            <li>DayJS</li>
                            <li>Formik</li>
                            <li>GSAP</li>
                            <li>ReactJS</li>
                            <li>Redux</li>
                            <li>Styled Component ? (Do I need it?)</li>
                            <li>TailwindCSS</li>
                            <li>Typescript</li>
                            <li>Yup</li>
                        </ul>
                        <h4 className="text-md text-purple-300">Back End:</h4>
                        <ul className="pl-2 lg:px-4">
                            <li>Busboy(for image handling)</li>
                            <li>Express</li>
                            <li>Firebase Auth</li>
                            <li>Firebase Firestore</li>
                            <li>Firebase Functions</li>
                            <li>Firebase Hosting</li>
                            <li>Firebase Storage</li>
                            <li>NodeJS</li>
                            <li>TypeScript</li>
                        </ul>
                    </li>
                    <li className="py-2 lg:px-4">
                        <h3 className="text-lg text-purple-500">TODO:</h3>
                        <ul className="pl-2">
                            <li>Post Image and Video</li>
                            <li>
                                Make the story disappear in 24 hours or less
                            </li>
                            <li>Manage User Sessions</li>
                            <li>Like - unlike button more responsive</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </Container>
    );
};

export default About;

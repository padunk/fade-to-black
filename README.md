# OUR WHISPERS

A Social media app that implement only the _stories_ feature from other famous socmed app.

## Mission

Part of my learning program:

-   Auth
-   Serverless
-   Typescript (Redux)

## How to run

**Requirement**

-   Firebase account (this app used Auth, Firestore, Functions, Storage and Hosting)

Clone the app into your local computer. <br />
In the project directory, you can run:

To start Firebase functions emulators:

### `cd functions`

### `npm run serve`

Move to parent again

### `cd client`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />
Firebase functions emulators should be at `localhost:5001/[your app name]/[your app bucket]/[endpoint]`.<br />
Or you can copy the address when you start the functions emulators.

## APP Feature

-   Login, Sign Up, Forgot Password, Log out
-   View _whispers_
-   Add new _whisper_
-   View comments on _whisper_
-   Add new comment
-   Notifications on new comment
-   Like _whisper_, unlike _whisper_
-   Delete _whisper_
-   Update user profile

## Tech Stack

_In alphabetical order_

-   Axios
-   Busboy (handling image)
-   Formik (form...form...form)
-   DayJS (relative time)
-   Express
-   React
-   React Icons
-   React Router
-   Redux
-   Styled Components (do I need this?)
-   Tailwind CSS
-   Typescript
-   Yup (form validation)

## TODO

| Items                    |      Options      | Done |
| ------------------------ | :---------------: | ---: |
| Testing                  | Jest, RTL, Cypres |    x |
| Manage user sessions     |      cookies      |    x |
| Remove _whisper_         |  after 24 hours   |    x |
| Responsive like - unlike |   like Twitter    |    x |
| Follow - unfollow        |         ?         |    x |

## ILTO - Interactive Layout TOolkit

#### To work with the project locally you need:
1. Download the project sources.
1. Install Node.js from [nodejs.org](https://nodejs.org)
1. Install dependencies:
    ```sh 
    # Run inside the project folder
    npm install 
    ```

#### Work with app on development server
1. Build viewer module:
    ```sh
    npm run viewer-build
    ```
1. Build and run editor module on the development server:
    ```sh
    npm run editor-dev
    ```
1. Access the app using web browser http://localhost:3000.

#### Compile the app and locate it on your server
1. Compile the project:
    ```sh
    npm run build
    ```
1. Copy all content from the "build" folder to you server.

1. Open index.html in a web browser.

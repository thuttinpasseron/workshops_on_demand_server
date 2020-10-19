# HPEDEV Hack Shack Workshops On Demand
### Getting Started
This is a HPE-Developer-Community Hack Shack Workshops on Demand registration portal application.

To run the backend server API, follow the steps below:

## Prerequisites
You need to have node.js and a package manager; both npm (npm is installed with node.js) and yarn package manager.

- [Node Download Page](https://nodejs.org/en/download/) - The latest LTS version will have node.js, npm, and npx.   
- [Yarn Package Manager](https://yarnpkg.com/en/docs/getting-started) - Required.  

  1. Install NPM modules

    ```
    $ npm install or yarn install
    ```

  2. Configure environment 

    - Server:
    - create a .env file using .env_example file
    ```
      $ cd server

      FROM_EMAIL_ADDRESS='' //email address to send email to registered customers
      SENDGRID_API_KEY="" //sendgrid api key to send emails
      PORT=               // run the backed server at port
      DB_PW=              // postgreSQL db password - you can set as you wish
      WORKSHOP_DURATION=  // you can ignore
      JUPYTER_EMAIL=''    // email of JupyterHub server to prepare notebooks
      FEEDBACK_URL=       // survey link
      PRODUCTION_API_SERVER=''  // swagger documentation
      JUPYTER_MOUGINS_LOCATION= // Mougins location name
      JUPYTER_GRENOBLE_LOCATION= // grenoble location name
      POSTFIX_EMAIL_GRENOBLE=  // email of Postfix server in  Grenoble to send email
      POSTFIX_EMAIL_MOUGINS= // email of Postfix server in  Mougins to send email
      POSTFIX_HOST_GRENOBLE= // Host of Postfix server in  Grenoble to send email
      POSTFIX_PORT_GRENOBLE=  // Port of Postfix server in  Grenoble to send email
      POSTFIX_HOST_MOUGINS=   // Host of Postfix server in  Mougins to send email
      POSTFIX_PORT_MOUGINS=   // Port of Postfix server in  Mougins to send email
      FEEDBACK_URL= // Feedback URL 
      PRODUCTION_API_SERVER= // Production API Server hostname to access swagger doc 
      NO_OF_STUDENT_ACCOUNTS= // total number of student accounts for each location
      SLACK_CHANNEL_WORKSHOPS_ON_DEMAND= Slack channel ID for workshops on demand
      SESSION_TYPE_WORKSHOPS_ON_DEMAND= workshops on demand session type 
    ```

  2. Run the backend server:

    ```
    $ npm start
    ```

  3. Run the PostgreSQL database using docker-compose

    ```
    $ cd server
    $ docker-compose up
    ```
  4. Seed the database

    ```
    $ cd server
    $ npm run seed-data
    ```
  5. Reset the database

    ```
    $ cd server
    $ npm run reset-data
    ```
  
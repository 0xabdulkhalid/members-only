# Members Only

An exclusive clubhouse where your members can write anonymous posts. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

## How to Use

1. **Head to the live site** on any device using your browser.
2. Notice how you can view messages, but you can't see who wrote them or write your own. Let's fix that:
   - Click **Sign up** and create an account if you have not created one yet.
   - If you already have account then Click **Log in** and enter in your login information
   - Click **New Message** and write your own message
3. You'll need to become a member to see who wrote messages and when.
   - Click **Become a Member**
   - Enter the secret passcode "`superSecret`" to become a member.
   - Congrats, now you're a member of the clubhouse! Go back to the homepage and see who wrote each message and when.
4. If you want to help moderate this site, you'll have to become an admin
   - Click **Become an Admin** (you have to be a member first in order to see this link)
   - Enter the secret passcode "`p4$$w0rd`" to gain your admin privileges.
   - Congrats, now you're an admin! Go back to the homepage and delete messages as you see fit.


## Project Objectives

This project was built in order to practice implementing the following skills:

- To Manage sessions using [express-session](https://www.npmjs.com/package/express-session) middleware, and to utilize [connect-mongo](https://www.npmjs.com/package/connect-mongo) to store sessions in  MongoDB. which helps to retrieve and to persist sessions even after application's restart.
- Implement user authentication using the [PassportJS](https://www.passportjs.org/) middleware in our Express App.
- Secure passwords (hashing and salting) with [bcryptjs](https://www.npmjs.com/package/bcryptjs) package.
- Use a MongoDB database to store users, messages, and session data.
- Implement the [**Model-View-Controller (MVC)**](https://developer.mozilla.org/en-US/docs/Glossary/MVC) software design pattern
  - Build models to define what data structures my app should contain
  - Set up routes for requesting different information and templates (i.e. views) to render the data as HTML to be displayed in the browser
  - Build controllers for updating models and/or views in response to input from users of my app
- Build views and work with forms in Express using the PUG templating engine
- Add some client-side JavaScript to improve App's interactivity like Confirmation dialogs before deleting messages.
- Deploying the Application to production with proper security measures like hiding keys with Environment Variables (`env`).

## Technologies Used

### Frameworks and Tools
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
![Express JS](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)  

### Libraries and Middleware
- [PassportJS](https://www.passportjs.org/) – authentication middleware for Express
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) – for securing passwords by hashing and salting
- [connect-mongo](https://www.npmjs.com/package/connect-mongo) – MongoDB session store middleware for Express
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) – asynchronous exception-handling middleware for Express
- [express-validator](https://www.npmjs.com/package/express-validator) – user input validation middleware for Express
- [Dotenv](https://www.npmjs.com/package/dotenv) – for keeping my database connection strings and API keys secret

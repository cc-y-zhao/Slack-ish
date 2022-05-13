# Slack-ish

[Slack-ish](https://slack-ish.herokuapp.com/) is a clone of [Slack](https://slack.com/), a popular messaging platform. Slack-ish offers channels, organized by topics of discussion, direct messaging, and live chat.

## Meet the Team~

This website is brought to you by [Cecilia Zhao](https://www.linkedin.com/in/ceciliazh/) and [Sharon Fang](https://www.linkedin.com/in/sharonfang8/). Thank you for visiting our site! 😊❤

---

# Index

### GitHub Documentation

| [MVP Feature List](https://github.com/cc-y-zhao/Slack-ish/wiki/MVP-Features-List) | [Database Schema](https://github.com/cc-y-zhao/Slack-ish/wiki/Database-Schema) | [API Documentation](https://github.com/cc-y-zhao/Slack-ish/wiki/API-Documentation) |
[Redux State Shape](https://github.com/cc-y-zhao/Slack-ish/wiki/State-Shape) | [User Stories](https://github.com/cc-y-zhao/Slack-ish/wiki/User-Stories) |
<br>

### Navigating this ReadMe

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [To-do/Future Features](#to-dofuture-features)
- [Technical Implementation Details](#technical-implementation-details)
- [Helpful Commands](#helpful-commands)

<br>

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg" alt="python" title="python" width="60" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" title="javascript" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="react" title="react" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux" title="redux" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="socketio" title="socketio" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" alt="sqlalchemy" title="sqlalchemy" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" title="postgresql" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="html5" title="html5" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="css3" title="css3" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="git" title="git" width="60" />

<br>

# Getting Started

<details>
<summary>How do I run this project?</summary>

1. Clone this repo.

   ```bash
   git clone git@github.com:cc-y-zhao/Slack-ish.git
   ```

2. Install dependencies from the root directory

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

   ```bash
   pipenv install psycopg2-binary
   ```

3. Install dependencies from the `react-app` directory

   ```bash
   npm install
   ```

4. In the `react-app` directory, create a `.env` file using the `.env.example` that will be used to define your desired `PORT` (preferably 5000).

5. In the root directory, create a `.env` file that will be used to define your environment variables.

   > Use the `.env.example` found in the root directory as a template. Use a secured combination of characters for your `SECRET_KEY`. The `DATABASE_URL` should be in the format of `postgresql://<database_user>:<password>@localhost/<database_name>`

6. Create a **user** using the same credentials in the `.env` file of the root directory with the ability to create databases

   ```bash
    psql -c "CREATE USER <database_username> PASSWORD '<password>' CREATEDB"
   ```

7. Create a **database** using the same credentials in the `.env` file of the root directory

   ```bash
    psql -c "CREATE DATABASE <database_name> WITH OWNER <database_username>"
   ```

8. Enter `pipenv` to migrate and seed your database

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

9. Inside of the `pipenv` shell, start the services in the root directory

   ```bash
   flask run
   ```

10. In a separate terminal, start the services in the `react-app` directory

    ```bash
    npm start
    ```

</details>

<details>
<summary>How do I log in as a Demo User?</summary>
On the log in page, click "sign in as a demo user instead".
   
<br>
   
![demo](https://user-images.githubusercontent.com/89059894/168287829-81f75b71-b20e-4de3-8050-19190b0a3213.png)

   
</details>

<br>

# Features

Logged in users can perform the following actions.

- View Channels that the user is apart of
- View all the members that are in a Channel that the user is apart of
- Add members to Channels that the user is apart of
- Create Channels
- Edit/Delete Channels that the user created
- Send Messages in Channels that the user is apart of
- Edit/Delete Messages that the user created
- Create a Direct Message with another user
- Create/Edit/Delete messages in a Direct Message that the user is apart of
- Search for other users to add to a Channel or create a Direct Message with

# Highlighted Features

### Live Chat
By leveraging the socket.io library, Slack-ish enables users to send live messages to one another. Incoming messages are rendered without the user having to refresh / reload the page. 
   
<br>
   
   ![livechat](https://user-images.githubusercontent.com/89059894/168287097-abe1acf7-7148-462e-a1b7-b54bb692506d.gif)


### Live Search
Slack-ish offers live search functionality, allowing users to search for other users in the Slack-ish database. Upon selecting a name from the search results, the user will be directed to a direct message exchange with the selected individual (or an existing direct message exchange if the user has previously conversed with the selected individual). 
   
<br>
   
![search](https://user-images.githubusercontent.com/89059894/168287110-7acf1b57-a642-45c7-84ce-de00e93b4432.gif)

<br>

# To-do/Future Features

In the future, we definitely want to revisit this project to refactor our code to be more efficient in both the front-end and the back-end. Since we began properly using our `to_dict` methods halfway through our project, we can refactor our some of our routes and update our state to utilize the `to_dict` instead of our manually-created arrays for information. We would also like to come back and catch some more edge cases to our code. We also definitely want to improve the user experience even more, as well as hopefully enter the world of WebSockets and implement a live messaging feature.

## To-do

- [ ] Refactor routes to properly utilize `to_dict` methods
- [ ] Refactor state to be more efficient
- [ ] Abandon Modal state and utilize modals as props instead
- [ ] Allow users to edit their names and profile pictures
- [ ] Toggle close and open for Channels and Direct Messages on side bar
- [x] Utilize library for message text area
- [ ] Change editing messages to be inline instead of modal
- [ ] Allow search for channels
- [x] Live chat
- [ ] Notifications

<br>

# Technical Implementation Details

Although this was our second project using react/redux, it was our first time using python in the backend! From our first react project, we both took our new knowledge of state and tried our best to meticulously plan out the state shape before beginning our project. However, as we were coding our project, we realized that our planning was not thorough enough, and we had to constantly go back and re-evaluate what our state should look like with each route and component. With the time constraint of one week, we are definitely glad that we planned out our to-dos and tasks as much as we did, since this planning helped alleviate the stress of taking too much on our plates at once.

In this project, we utilitzed redux state for all of our modals. We quickly learned that this was not the best idea, as our modals did not have access to the other slices of state that we needed information from. In the future, we will probably just stick with passing in modals as props. Nevertheless, it was still a great learning experience!

We also made sure to take time to think about user experience. We made sure to add title text to divs and icons, alerts, and confirmation dialogs to notify the user of information to make their experience better.

<br>

# Helpful commands

| Command              | Purpose                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `pipenv shell`       | Open your terminal in the virtual environment and be able to run flask commands without a prefix                                             |
| `pipenv run`         | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands |
| `flask db upgrade`   | Check in with the database and run any needed migrations                                                                                     |
| `flask db downgrade` | Check in with the database and revert any needed migrations                                                                                  |
| `flask seed all`     | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details                |

# Project_Sport_Pulse

# Sport Pulse is set up to pull live sports data from the SportRadar API (https://developer.sportradar.com/) and push notifications to users using Twitter SSO and DMs.  We are a team formed as part of the Seattle Sports Tech Hackathon.  

### https://www.meetup.com/Seattle-Sports-Tech-Meetup/
### https://www.eventbrite.com/e/seattle-sports-tech-hackathon-20000-api-package-for-winner-tickets-33971022242

##  This is a tech demo and proof of concept, not production code!

# Instructions For Use:

## Run this app locally

### Set up a Twitter account for your bot
#### Get this Twitter account's access token and access token secret
#### Get the user ID associated with this Twitter account
### Navigate to the root of this directory...
#### "npm install"
#### "sequelize init"
### Install PostgreSQL
### Create a PostgreSQL database called sport_pulse_development...
#### "sequelize db:migrate" to populate the fresh development database with tables
### "touch .env" file and add these variables...
#### NODEENV="production"
#### TWITTERCONSUMERKEY="<Twitter development consumer key for your app>"
#### TWITTERCONSUMERSECRET="<Twitter development consumer secret for your app>"
#### BOTTWITTERUSERID="<Bot account user Id>"
#### BOTACCESSTOKEN="<Twitter access token for your bot account>"
#### BOTACCESSTOKENSECRET="<Twitter token secret for your bot account>"
#### SESSIONSECRET="<Phrase for Express-session cookie secret(anything)>"
###### "npm run start:dev" to start a local server with Nodemon to watch for changes in your code and Foreman to use the variables in your .env file on Port 3000;
<!-- #### "psql"
#### "\c sport_pulse_development"
#### Copy + Paste the following SQL query to create a session table for connect-pg-simple
```
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```
#### exit the PostreSQL prompt -->


  

# Linktr

  

### WIP!

  

> Simple react app to show a list of links and nostr feed

  

Linktr is a small application that lets you create your own customised list of links. It is also nostr compatible and can display your latest notes and profile info. The roadmap is to make the application fully nostr based, at the moment it works with a configuration file and needs to be hosted.

  

**Current Linktr features.**

  

- Configuration file '.env' for easy configuration.

  

- Style themes

  

- 2140meetups.com support to show upcoming meetups of your community

  

- Compatibility with nostr, show kind 1 feed and profile info

  


**Deployment guide - easy and free:** Using github and CloudFlare
- Create a github account
- Fork this repository
- Edit the `.env.example` file with your settings
- Change the name of `.env.example` to `.env 
- Edit `.gitignore` file and delete `.env 
- Create a Cloudflare account
- Use the Cloudflare pages to deploy your fork:
	- Go to `Workers & Pages` in the left sidebar
	- Press 'Create application
	- Press the 'Pages' tab
	- Press 'Connect to git' and follow the instructions to connect to your github account
	- Select your linktr fork
	- In `Build settings` select `Create React app`.
	- Press 'Save and deploy
	- When finished, you will be given a link to your deployed app.
	- You can configure a custom domain if you have one
- Congratulations!

**Deployment Guide - Advanced:** Create a build and serve it through a web server.
- Git clone this repository.
- Go to the project directory and duplicate `.env.example`.
- Edit the duplicated file with your settings.
- Rename the new file to `.env`.
- Run `npm i` in the console
	- If you want to preview the application, run `npm start`.
- Run `npm run build` which will create a new directory containing the production version of the application.
- Then serve this directory through a web server, you can use nginx, apache, caddy, node.
- Finally you can use a vps or a tunnel to expose the application to the internet.

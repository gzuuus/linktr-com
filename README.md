
# Linktr

### WIP!

> Simple react app to show a list of links and nostr feed

Linktr is a small application that lets you create your own customised list of links. It is also nostr compatible and can display your latest notes and profile info. The roadmap is to make the application fully nostr based, at the moment it works with a configuration file and needs to be hosted.

**Current Linktr features.**

- Configuration file '.env' for easy configuration.

- Style themes

- 2140meetups.com support to show upcoming meetups of your community

- Compatibility with nostr, show kind 1 feed and profile info

- More coming soon

**Deployment guide - Easy and free:** (more detailed guide coming soon)
- Create a cloudflare account
- Create a github account
- Fork this repository
- Duplicate the 'example.env' file and rename it to just '.env'.
- Edit the '.env' file as needed
- Use Cloudflare pages to deploy your fork
- Use your own domain


**Deployment guide - Advanced:** (More detailed guide coming soon)
- Clone this repository
- Duplicate the 'example.env' file and rename it to just '.env'.
- Edit the '.env' file as needed
- Run 'npm run build' in your project folder
- Use a web server such as nginx/apache to serve the project
- Use a vps to expose it

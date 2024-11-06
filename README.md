# Web application: Bank of MatMasa

Test project, originally created in 2021 for testing interesting technologies.
Updated in 2024:
- Dependencies up to date
- Adjustments to strucure

## Built With
* [MongoDB](https://www.mongodb.com/) Database system: User accounts & data
* [node.js](https://nodejs.org/en/) JavaScript runtime environment
* [Express](https://expressjs.com/) - The web framework used
* [ejs](https://ejs.co/) - Template engine for client html content
* [Bootstrap 5.3](https://getbootstrap.com/) - CSS framework


## Getting Started

### Prerequisites

* [node.js LTS release 20](https://nodejs.org/en/)
* [MongoDB local installation or cloud](https://docs.mongodb.com/manual/installation/) Database system used for user accounts & data


### Installing

For getting the server running in development mode:


1. Clone the repository and navigate to main project folder on terminal and enter:

```
npm install
```
This will install required node modules.

2. If there are errors/vulnerabilities use:

```
npm audit fix
```
after the install command.

3. Create .env file using .env.example file. Update values as needed

4. Start the server with:

```
npm start
```

5. To close the server press ctrl+C


## Deployment
Originally deployed on Azure virtual pc running Ubuntu 18.04 LTS.
~~[Live preview](https://matmasa.xyz)~~ 
* [PM2] (https://pm2.io/) Process manager for the app
* [nginx]:(https://www.nginx.com/) Reverse proxy server




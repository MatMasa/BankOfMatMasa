# Web application: Bank of MatMasa

POC project, combining different skills and techologies that interest me

## Getting Started

### Prerequisites

* [node.js LTS release 12](https://nodejs.org/en/) Other versions might work -> restart computer after install
* [MongoDB local installation or cloud](https://docs.mongodb.com/manual/installation/) Database system used for user accounts & data


### Installing

For getting the server running in development mode:

1. Change the database connection string in db.js and make sure MongoDB is running.


2. Clone the repository and navigate to main project folder on terminal and enter:

```
npm install
```
This will install required node modules.

2. If there are errors/vulnerabilities use:

```
npm audit fix
```
after the install command.


4. Start the server with:

```
npm start
```

5. To close the server press ctrl+C


## Deployment

* [Live preview](https://matmasa.xyz)

* Server used: Azure virtual pc running Ubuntu 18.04 LTS
* pm2: automated server handling and startup on system boot
* nginx: Reverse proxy



## Built With
* [MongoDB](https://www.mongodb.com/) Database system: User accounts & data
* [node.js](https://nodejs.org/en/) JavaScript runtime environment
* [Express](https://expressjs.com/) - The web framework used
* [ejs](https://ejs.co/) - Template engine for client html content
* [Bootstrap 4.5](https://getbootstrap.com/) - CSS framework

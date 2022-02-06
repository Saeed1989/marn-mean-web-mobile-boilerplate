# Welcome to the MEAN MERN Boilerplate project

### _A boilerplate repository with all parts of the project, following production best practices._

In this repository, we will keep adding boilerplate code for a complete project which covers API, DB, Web, and Mobile platforms.
We should follow in both MEAN and MERN (MongoDB, Express.js, React.js, React-Native, Angular, and Node.js) in the project depending on the part of the project.
Different part of the project is arranged in different folders. Details of that part is available in the readme file inside that folder.<br/><br/>
![](adminFlow.PNG)
![](endUserFlow.PNG)

## Technology stack

This repository is built on top of Express.js, React.js, React-Native, and Angular however in the implementation detail, we will find other supporting technologies as well.

#### Client side

- [React] - A JavaScript library for building user interfaces
- [Angular] - A JavaScript framework for building user interfaces]
- [React-Native] - A JavaScript framework used to develop applications mostly for Android and iOS.
- [MongoDB] - The application data platform
- [Testing Library] - React Testing Library
- [Axios] - Promise based HTTP client for the browser and node.js

#### Server side

- [Node.js] - evented I/O for the backend
- [Express.js] - Fast, unopinionated, minimalist web framework for Node.js
- [Mongoose] - mongoose
- [Swagger]
- [Jest]
- [Super Test]

Details frameworks and packages can be found in the package.json files in the server and client directory.

## Features

- Information of diverse fields is shown to the end clients category-wise.
- In the admin panel data entry is done for users that have log-in credentials.
- In the admin panel users have different levels of access.

## Parts

#### End client web application
This is the end client part of the project. This is a React single-page web app.<br/>
Folder: client-end

#### End client mobile application
This is the mobile phone version of the end client part of the project. This is a React-Native mobile app.<br/>
Folder: client-end-mobile

#### Admin panel web application
This is the admin panel part of the project. This is an Angular single-page web app.<br/>
Folder: client-admin-panel

#### Datalist server
This API serves the data list. This is a NodeJS microservice.<br/>
Folder: server-datalist

#### Catagory server
This API category list. This is a NodeJS microservice.<br/>
Folder: server-category

#### Data entry server
This API serves the following two functions:
- Create or update data and category items.
- Provide, create, and update user roles and permission items.
- Log in to the authentication.
This is a NodeJS microservice.<br/>
Folder: server-apply

## License

This project is [MIT licensed](https://opensource.org/licenses/MIT)

[node.js]: http://nodejs.org
[express.js]: http://expressjs.com
[docker]: https://www.docker.com
[react]: https://reactjs.org/
[mongodb]: https://www.mongodb.com/
[testing library]: https://testing-library.com/
[axios]: https://github.com/axios/axios
[mongoose]: https://mongoosejs.com/
[swagger]: https://swagger.io/
[jest]: https://jestjs.io/
[super test]: https://github.com/visionmedia/supertest
[Angular]: https://angular.io/
[React-Native]: https://reactnative.dev/

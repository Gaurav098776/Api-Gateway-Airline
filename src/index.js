const express =  require('express')

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes')

const app =  express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT, ()=> {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
})
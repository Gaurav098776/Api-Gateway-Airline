const express =  require('express')
const rateLimit = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');
const {ServerConfig} = require('./config');
const apiRoutes = require('./routes')


const app =  express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes (every 2 min me 3 hi req bhej skte hai)
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(limiter)



// to test it /// http://localhost:5000/flightService/api/v1/info  (flight service me req jayegi)
app.use('/flightsService', createProxyMiddleware({ 
    target: ServerConfig.FLIGHT_SERVICE, 
    changeOrigin: true, 
    pathRewrite: {'^/flightsService' : '/'} 
}));
app.use('/bookingService',createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE ,changeOrigin: true,}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, ()=> {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
})


/**
 * user
 *  |
 *  v
 * localhost:3001 (Api Gateway)  localhost:4000/api/v1/bookings
 *  |
 *  v
 * localhost:3000/api/v1/flights
 * 
 */
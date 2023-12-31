require("dotenv").config();
require("./utils/mongodbConnection");
const reservationRoutes = require('./routes/reservationRouter');
const statisticsRoutes = require('./routes/statisticsRouter');
const managerRoute = require('./routes/managersRoute')
const path = require('path')

const cors = require('cors')

const { Server } = require('socket.io')
const http = require('http')


const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app)
const io = new Server(server)


app.set('io', io)
  
io.on('connection', (socket) => {
  console.log(`a new connection and count is: ${socket.client.conn.server.clientsCount}`)

  
  socket.on('disconnect', () => {
      console.log(`User disconnected and count is: ${socket.client.conn.server.clientsCount}`);
  });
})

app.use(cors({
  origin:'*',
}))


app.use(express.static(path.join(__dirname, './public')))


const userRouter = require('./routes/usersRouter');
const technicianRouter = require('./routes/technicianRouter');


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const categoryRouter = require('./routes/categoryRouter')
const otpRouter = require('./routes/otpRouter')
const popularTechnician = require('./routes/popularTechnicianRouter')
const informationsRoute = require('./routes/informationsRouter')
const subCategoriesRouter = require('./routes/subCategoryRouter')
const NotificationRouter = require('./routes/notificationRouter')
const SlidersRoute = require('./routes/sliderRouter')

app.use(userRouter,technicianRouter,reservationRoutes,SlidersRoute,categoryRouter,NotificationRouter,otpRouter,popularTechnician,subCategoriesRouter);
app.use('/statistics',statisticsRoutes)
app.use('/managers',managerRoute)
app.use('/informations',informationsRoute)

const completedReservationRouter = require('./routes/completedReservationRouter');

app.use('/completedReservations', completedReservationRouter);

app.get('*',(req,res) =>{
  res.json({
    message:'unknown route'
  })
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static('./public'));
app.set('views', './src/views')
app.set('view engine', 'ejs')

const signupRouter = require('./src/routes/signupRouter')
const signinRouter = require('./src/routes/signinRouter');
const WorkerRouter = require("./src/routes/workerRouter");
const ComplaintRouter = require("./src/routes/complaintRouter");
const AdminRouter = require("./src/routes/adminRouter");



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }))

app.use('/signup', signupRouter)
app.use('/sign_in', signinRouter)
app.use('/worker', WorkerRouter)
app.use('/complaint', ComplaintRouter)
app.use('/admin', AdminRouter)

app.listen(3000, () => {
  console.log('server started at port http://localhost:3000')
})
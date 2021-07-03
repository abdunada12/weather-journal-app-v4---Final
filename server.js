
// Setup empty JS object to act as endpoint for all routes
const port = 5500;
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app =express();

/*Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Spin up the server
// Callback to debug
app.get('/sendData', (_req, res)=> {
    
    console.log(projectData)
    res.send(projectData)
})

app.post('/takeData', (req, res)=>{
    res.send()
    projectData= (req.body)
    console.log(projectData)
    console.log('data has been recieved')
    
})






// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route



// Setup Server

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
})
  

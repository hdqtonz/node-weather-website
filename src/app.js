const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Difine path for express config
const dirpath = path.join(__dirname, './public');
const viewPath = path.join(__dirname, '../templates/views')
const partialshPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialshPath)

// setup static directory to serve
app.use(express.static(dirpath))

// setting up routs for the sample webiste
app.get('', (req,res)=>{
    res.render("index", {
        title: 'Weather App',
        name:'Hiten'
    })
})

app.get('/about', (req,res)=>{
    res.render("about", {
        title:'About',
        dis:'my name is hiten and i love to do proggraming and blogging'
    })
})

app.get('/help', (req,res)=>{
    res.render("help",{
        dis:'this is some helpful text',
        title:'Help',
        name:'Hiten'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provaid an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} )=>{
        if(error){
            return res.send({error:error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forcast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forcast:'It is raining',
    //     address: req.query.address
    // })
})





// app.get('/products',(req,res)=>{
//     if(!req.query.search) {
//         return res.send({
//             error:'you must provide a search term'
//         })
//     } 

//     console.log(req.query.search)
//     console.log("Rating :"+req.query.rating)
//     res.send({
//         products:[]
//     })
// })

// app.get('/help/*',(req,res)=>{
//     res.render("404",{
//         title:'404',
//         name:'hiten',
//         errorMessage:'Help Post not found'
//     })
// })

// app.get('*', (req,res)=>{
//     res.render("404",{
//         title:'404',
//         name:'Hiten',
//         errorMessage:"Page not found."
//     })
// })

app.listen(port, ()=>{
    console.log('Server is up on prot ' + port)
})




// app.get('', (req,res)=>{
//     res.send("<h1>Weather</h1>")
// })

// app.get('/help', (req,res)=>{
//     res.send(dirpath+'/help.html')
// })

// app.get('/about', (req,res)=>{
//     res.send(dirpath+'/about.html')
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'It is raining',
//         loaction:'Rajkot'
//     })
// })

// app.get('*', (req,res)=>{
//     res.send("404 Page")
// })




// app.com
// app.com/help
// app.com/about




//chelange 2nd is bellow
//
//Goal: Update routes
//
// 1. Setup about route to render a title with html
// 2. Setup a weather route to send back JSON
//    - Object with forecast and loaction string
// 3. Test Your work by visiting both in the browser


// chelange 1st is bellow
// 
// Goal: Setup two new routes
//
// 1. setup an about route and render a page title
// 2. setup a weather route and render a page title
// 3. Test you work by visiting both in the browser

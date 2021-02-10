//ENVIRONMENT//
require('dotenv').config();

//IMPORTS//
const express = require ('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

//APP-SETUP//
const fs = require('fs')
const app = express();
app.set('view engine', 'ejs');

//MIDDLEWARE//
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(express.urlencoded( { extended: false } ));
app.use(methodOverride('_method'));

//ROUTS/CONTROLLERS//

app.get('/', (req, res)=> {
    res.send ('Backend, tools app');
})

//Index view
app.get('/tools', (req, res) => {
    let dinos = fs.readFileSync('./tools.json')
    // take our data and put it in a more readable format
    tools = JSON.parse(tools)
    console.log(req.query.nameFilter)
    let nameToFilterBy = req.query.nameFilter
    // array method filter
    console.log(nameToFilterBy)
    
    // if there is no submit of the form
    // this will be undefined, and we will returnb all dinos
    if (nameToFilterBy) {
        const newFilteredArray = tools.filter((toolsObject) => {
            if (toolsObject.name.toLowerCase() === nameToFilterBy.toLowerCase()) {
                return true
            }
        })
        tools = newFilteredArray
    }
    // console.log(dinos)
    // in our views folder render this page
    res.render('/tools/index', {tools: tools} )
})

app.get('/tools/edit/:idx', (req, res) => {
    const tools = fs.readFileSync('./tools.json');
    const toolsArray = JSON.parse(tools); 

    let idx = Number(req.params.idx);
    const ourTool = toolsArray[idx]; 

    res.render('tools/edit', { tool: ourTool, idx });

})

//Show view
app.get('/tools/:index', (req, res)=> {
    let dinos = fs.readFileSync('./tools.json')
    // take our data and put it in a more readable format
    tools = JSON.parse(tools)
    // get the dino that's asked for
    // req.params.index
    const tool = tools[req.params.index]
    res.render('tools/show', { tool })
})



//LOCAL SERVER//
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log(`Server running on PORT: ${PORT}`)
})

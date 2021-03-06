// -- Dependencies -- //
require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// -- Express Config -- //
const app = express();

// -- Middleware -- //
app.use(
    bodyparser.json( { limit: "30mb", extended: true }),
    bodyparser.urlencoded( { limit: "30mb", extended: true }),
    cors()
)

// -- Routes -- //
app.get('/', (req,res) => res.send('Welcome to the G2 API...') )
app.use('/seeders', require('./routes/seeders/index') )
app.use('/products', require('./routes/products') )
app.use('/employees', require('./routes/employees') )
app.use('/subjobs', require('./routes/sub_jobs') )
app.use('/materials', require('./routes/materials') )
app.use('/customers', require('./routes/customer') )
app.use('/opp', require('./routes/opportunities') )
app.use('/departments', require('./routes/departments') )
app.use('/projects', require('./routes/projects') )
app.use('/vendors', require('./routes/vendors'))
app.use('/assignments', require('./routes/assignments') )
app.use('/jobs', require('./routes/jobs') )
app.use('/auth', require('./routes/auth') )

// Database Connection & Server Start -- //
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => app.listen(process.env.PORT, () => console.log(`Database Connected : Server running`)) )
    .catch( (err) => console.log(err.message) )
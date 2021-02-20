const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

AdminBro.registerAdapter(AdminBroMongoose)

const Teams = require('./models/Teams');
const Matches = require('./models/Match');
const Groups = require('./models/Groups');
const Tournament = require('./models/Tournament');
const Users = require('./models/User');

const app = express();


app.use(cors());
app.options('*', cors());

app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/matches', require('./routes/matches.routes'));
app.use('/api/teams', require('./routes/teams.routes'));
app.use('/api/bets', require('./routes/bets.routes'));
app.use('/api/user', require('./routes/user.routes'));

const run = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/football', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    const adminBro = new AdminBro ({
        Databases: [connection],
        rootPath: '/admin',
        resources: [Teams, Matches, Users, Groups, Tournament]
    })
    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router)
    app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))
  } catch (e) {
    console.log('Помилка сервера', e.message);
    process.exit(1);
  }
}
run()
module.exports = app
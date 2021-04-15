const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const uploadFeature = require('@admin-bro/upload');
const AdminBroMongoose = require('@admin-bro/mongoose');

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');

AdminBro.registerAdapter(AdminBroMongoose);

const Matches = require('./models/Match');
const Groups = require('./models/Groups');
const Teams = require('./models/Teams');
const Tournament = require('./models/Tournament');
const Bets = require('./models/Bets');
const Users = require('./models/User');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.static(`${__dirname}/public`));
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/matches', require('./routes/matches.routes'));
app.use('/api/groups', require('./routes/groups.routes'));
app.use('/api/teams', require('./routes/teams.routes'));
app.use('/api/bets', auth, require('./routes/bets.routes'));
app.use('/api/user', require('./routes/user.routes'));

const run = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://footbet:pM2zivfDZMjB07aU@cluster0.ykfri.mongodb.net/test', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const adminBro = new AdminBro({
      Databases: [connection],
      rootPath: '/admin',
      resources: [
        {
          resource: Teams,
          features: [
            uploadFeature({
              provider: {
                local: {
                  bucket: `${__dirname}/public`,
                },
              },
              properties: {
                key: 'uploadedFile.path',
                bucket: 'uploadedFile.folder',
                mimeType: 'uploadedFile.type',
                size: 'uploadedFile.size',
                filename: 'uploadedFile.filename',
                file: 'uploadFile',
              },
            }),
          ],
        },
        Matches,
        Users,
        Groups,
        Tournament,
        Bets,
      ],
    });
    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);
    app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'));
  } catch (e) {
    console.log('Помилка сервера', e.message);
    process.exit(1);
  }
};
run();
module.exports = app;

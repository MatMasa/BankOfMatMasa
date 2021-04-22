const mongoose = require('mongoose');

mongoose.connect('{MONGODB CONNECTION STRING HERE}', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,

}).catch((err) => {
  console.error("DB connection failed")
})
mongoose.Promise = global.Promise // Enable promises in mongoose
let db = mongoose.connection;


db.on('error', (err) => {
  console.log(`DB error: ${err}`);
});

db.on('connected', () => {
  console.log('Database:\x1b[32m%s\x1b[0m', 'Connected')
});

db.on('disconnected', function () {
  console.log('Database:\x1b[31m%s\x1b[0m', 'Disconnected');
});

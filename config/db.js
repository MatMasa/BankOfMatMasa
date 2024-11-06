import { connect, Promise, connection } from 'mongoose';

connect(env('DB_STRING'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,

}).catch((err) => {
  console.error("DB connection failed:", err)
})
Promise = global.Promise // Enable promises in mongoose
let db = connection;


db.on('error', (err) => {
  console.log(`DB error: ${err}`);
});

db.on('connected', () => {
  console.log('Database:\x1b[32m%s\x1b[0m', 'Connected')
});

db.on('disconnected', function () {
  console.log('Database:\x1b[31m%s\x1b[0m', 'Disconnected');
});

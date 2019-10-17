// Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

// Internal modules
const data = require('./data');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.set('port', 3000);
app.use(compression());

app.use(morgan('[:method] :url :status - :response-time ms'));

process.on('SIGINT', () => {
  process.exit(-1);
});

// Routes
app.get('/', (_, res) => res.status(200).json({ success: true }));

app.get('/schools', (_, res) => res.status(200).json(data.schools));

app.get('/questions', (_, res) => res.status(200).json(data.questions));

app.use('*', (_, res) => res.status(404).json({ error: 'route not found' }));

app.listen(app.get('port'), () => {
  console.info(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );

  console.warn('Press CTRL-C to stop\n');
});

module.exports = app;

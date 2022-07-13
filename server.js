const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/dist`));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(
    app.get('port'),
    () => console.log(`Example app listening on port ${app.get('port')}!`),
);

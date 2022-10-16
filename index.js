const { app } = require('./dist/server');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Application is started on <http://localhost:${port}>`);
});

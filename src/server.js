const App = require('./app');
require('dotenv').config();

const port = process.env.PORT;

App.listen(port, () => console.log(`Server is running on port ${port}`));

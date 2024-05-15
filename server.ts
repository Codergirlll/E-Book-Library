
import express from "express";
import configs from "./src/config/config";
import globalErrorHandler from "./src/middleware/globalErrorHandler";
import User_Router from "./src/Router/user.router";

const app = express();


// For Accessing json data from request
app.use(express.json())


// For Database
require("./src/db/connection");


// For All Router
app.use('/api/user', User_Router)


// For Global Handler
app.use(globalErrorHandler)


// For Server 
const port = configs.port || 4040;
app.listen(port, () => {
  console.log(`Server is running at Port no. ${port}`);
});

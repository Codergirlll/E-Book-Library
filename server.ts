
import express from "express";
import configs from "./src/config/config";
import globalErrorHandler from "./src/middleware/globalErrorHandler";
import User_Router from "./src/Router/user.router";
import Book_Router from "./src/Router/book.router";
import cors from "cors"
const app = express();


// For allowing cors
app.use(cors({
  origin: configs.frontend_domain
}))


// For Accessing json data from request
app.use(express.json())


// For Database
require("./src/db/connection");


// For All Router
app.use('/api/user', User_Router)
app.use('/api/book', Book_Router)


// For Global Handler
app.use(globalErrorHandler)


// For Server 
const port = configs.port || 4040;
app.listen(port, () => {
  console.log(`Server is running at Port no. ${port}`);
});

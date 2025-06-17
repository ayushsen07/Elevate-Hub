const app = require("./app.js")
const config = require('./config/index.js')

app.listen(config.PORT, ()=>{
console.log(`server is running on PORT : ${config.PORT}`);
})
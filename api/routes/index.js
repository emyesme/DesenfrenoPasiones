var express = require('express');
var router = express.Router();

/* GET home page. */


const { exec } = require("child_process");

function command(commandIn){

  return new Promise ((resolve, reject) => {
    exec(commandIn, (error, stdout, stderr)=>{
      setTimeout(()=>{
        if (error) {
          commandIn = `error: ${error.message}`;
          resolve(commandIn);
        }
        else if (stderr) {
            commandIn = `stderr: ${stderr}`;
            resolve(commandIn);
        }
        else{
          commandIn = `stdout: ${stdout}`;
          resolve(commandIn);
        }
      }, 10000)
    });
  })
}

router.get('/', function(req, res, next) {
  
  command("ls -la")
  .then(
    (resultBash) => {
      res => res.json({
        data: resultBash
      })
    }
  )
});



module.exports = router;

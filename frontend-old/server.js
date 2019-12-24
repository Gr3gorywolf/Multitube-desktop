
window.onload = function() {
const perro = require('electron').remote
const pelo=perro.require('./holamundo');
var server = pelo.klowa().createServer(function(socket) {
    socket.write('Echo server\r\n');
   // socket.pipe(socket);
    
   socket.on('error', function (err) {
  if (err.code !== 'ECONNRESET') {
      // Ignore ECONNRESET and re throw anything else
      throw err
  }
})
    socket.on('data', function (data) {
      if(data.toString()=='playpause()'){
           if(estareproduciendo){

           audiotag.pause();
           }else{
           audiotag.play();
           }

      }else{


           
           if(data.toString().includes('youtube.com')){
           reproducir(data.toString());

        
          
         
}
}
  })
});

  server.listen(1024);

}
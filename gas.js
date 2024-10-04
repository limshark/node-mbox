// mailparser": "^2.1.0",
const MailParser  = require('mailparser').MailParser;
const Mbox        = require('./src/mbox');
const mbox        = new Mbox();


mbox.on('message', function(msg) {
  // parse message using MailParser



  let mailparser = new MailParser({ streamAttachments : true });




  mailparser.on('headers', function(headers) {
    console.log('----------------------');
    console.log('From   :', headers.get('from').value[0].address);
    console.log('Subject:', headers.get('subject'), '\n');
	let mycc = headers.get('cc') ; 
    //console.log('CC:',mycc);
    //console.log('CC:', headers.get('cc').value.address, '\n');
    //console.log('Sender:', headers.get('sender'), '\n');
    //console.log('Reply-to:', headers.get('reply-to').value.address, '\n');
    //console.log('Delivered To:', headers.get('delivered-to'), '\n');
    //console.log('Body:', headers.get('text'), '\n');
  });

  mailparser.on('data',  (dt) => {
    console.log('======================');
	console.log("Data is ",dt);
	if ( dt.type === 'text' ) {
		console.log("Email:  ",dt.text);
	}
	if( dt.contentType ) {
		console.log("Data is ",dt.contentType);
	}
	
    console.log('======================');
  });



  mailparser.write(msg);



  mailparser.end();
});



process.stdin.pipe(mbox);

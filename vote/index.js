var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');	
var passwordHash = require('password-hash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var fs = require('fs');
Web3 = require('web3')
solc = require('solc')
var app = express();
app.use( bodyParser.json() )
app.use(cookieParser());
app.use(morgan('combined'));
var fs = eval(require('fs-extra'));
var cors = require('cors')


app.use("/", express.static("ui"));
app.use(cors())

var username;
var password;

var votes = {
	can1 : 0,
	can2 : 0,
	can3 : 0,
	can4 : 0
}

app.post('/login', function(req, res) {
    
	console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);
    
    if (username == "admin" && password == "password") {

    	res.status(200).send({ message: hashedPassword});

    } else {
    	res.status(500).send({ message: 'error' });
    }
});
var data = JSON.stringify(votes);
fs.writeFile('data.json', data, (err) => {
	if (err) {
		throw err;
	}
	console.log("JSON data is saved.");
});
app.post('/auth', function(req, res) {
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.status(200).send({ message: hashedPassword});
	} else {
		res.status(500).send({ message: 'error' });
	}
});


app.post('/vote', function(req, res) {
	const candidate = req.body.candidate;
	console.log(req.body)
	fs.readFile('data.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}
	
		// parse JSON object
		const user = JSON.parse(data.toString());
	
		// print JSON object
		console.log(user);
	});
	votes[candidate]+=1;
	fs.writeFile('data.json', data, (err) => {
		if (err) {
			throw err;
		}
		console.log("JSON data is saved.");
	});
	res.status(200).send({ message:"Vote Successfull"});
});
app.get('/getVotes',function(req,res){
	res.status(200).json(votes);
	console.log(votes);
});

app.get('/',function(req,res){
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	} else {
		console.log('ok');
	}
});

app.get('/app', function(req, res){
	
	var cookie_pass = req.cookies['auth'];
	var cookie_otp = req.cookies['show'];

	if (passwordHash.verify('password', cookie_pass) && cookie_otp != null) {
		//res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
		res.redirect('/info');
		

	} else if (true || (cookie_otp == null && passwordHash.verify('password', cookie_pass))) {
		res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	}
	else {
		res.redirect('/');
	}
	
});

// app.post('/getaddress',function(req,res){

// });

app.get('/info', function(req, res){
	var cookie_pass = req.cookies['auth'];
	var cookie_otp = req.cookies['show'];
	if (cookie_pass == null || cookie_pass == '' || cookie_otp == null || cookie_otp == '') {
		res.redirect('/app');
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		 code = fs.readFileSync('voting.sol','utf8').toString()

		 compiledCode = solc.compile(code,1)
		 abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
		 VotingContract = web3.eth.contract(abiDefinition)
		 byteCode = compiledCode.contracts[':Voting'].bytecode
		 deployedContract = VotingContract.new(['Candidate1','Candidate2','Candidate3','Candidate4'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
		
		contractInstance = VotingContract.at(deployedContract.address)

		res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
	}
	
});




var port = 8080;
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
});
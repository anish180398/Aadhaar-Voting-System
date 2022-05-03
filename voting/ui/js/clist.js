
 import voterDB, {
	bulkcreate,
	createEle,
	getData,
	SortObj
  } from "./module.js";
// import {aadhaar_list} from "./app.js";
$(document).ready(function() {
	$('.modal').modal();
	    console.log("check1");
		let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		let abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
		let VotingContract = web3.eth.contract(abi);
		let contractInstance = VotingContract.at('0x391ff4DC9a13acc1D09242e86A13Dc2094EBd9ff');
		
	
		//check cookie
		function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
		}
	    
	  
		//  console.log(aadhaar_list);
		
	
		// var aadhaar = readCookie('aadhaar');
	
		// console.log(aadhaar);
		// var address = aadhaar_list[aadhaar];
		// console.log(address);
		// $('#loc_info').text('Voter name based on Aadhaar : ')
		 

		
		const prodb = (dbname, table) => {
			const db = new Dexie(dbname);
			db.version(1).stores(table);
			db.open();
		  
			return db;
		   
		  };
		  let db = prodb("votingDB", {
			products: `++id, CandidateName, Votes`
		  });
		  const bulkcreate = (dbtable, data) => {
			let flag = empty(data);
			if (flag) {
			  dbtable.bulkAdd([data]);
			  console.log("data inserted successfully...!");
			
			//   console.log("Please provide data...!");
			}
			return flag;
		  };
		  const getData = (dbname, fn) => {
			let index = 0;
			let obj = {};
			dbname.count(count => {
			  // count rows in the table using count method
			  if (count) {
				dbname.each(table => {
				  // table => return the table object data
				  // to arrange order we are going to create for in loop
				  obj = SortObj(table);
				  fn(obj, index++); // call function with data argument
				});
			  } else {
				fn(0);
			  }
			});
		  };
		  const empty = object => {
			let flag = false;
			for (const value in object) {
			  if (object[value] != "" && object.hasOwnProperty(value)) {
				flag = true;
			  } else {
				flag = false;
			  }
			}
			return flag;
		  };
		  // create dynamic elements
		  const createEle = (tagname, appendTo, fn) => {
			const element = document.createElement(tagname);
			if (appendTo) appendTo.appendChild(element);
			if (fn) fn(element);
		  };
		function disable() {
				$('#vote1').addClass( "disabled" );
				$('#vote2').addClass( "disabled" );
				$('#vote3').addClass( "disabled" );
				$('#vote4').addClass( "disabled" );
				
				//logout
				document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
				document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
				window.location = '/app';
	
	
		}

		
		
		$('#vote1').click(function(){
			contractInstance.voteForCandidate('Candidate1', {from: web3.eth.accounts[3]}, function() {
				
				let flag = bulkcreate(db.products, {
					CandidateName: "Candidate1",
					Votes :  1
					
					
				  });
				  disable();
				  $('#loc_info').text('Vote submited successfully to Candidate1')
			});
		})
		
		$('#vote2').click(function(){
			contractInstance.voteForCandidate('Candidate2', {from: web3.eth.accounts[4]}, function() {
				alert('vote submited to Candidate2');
				
				let flag = bulkcreate(db.products, {
					CandidateName: "Candidate2",
					Votes: 1
					
					
				  });
				 disable();
				 $('#loc_info').text('Vote submited successfully to Candidate2')
			});
		})
		$('#vote3').click(function(){
			contractInstance.voteForCandidate('Candidate3', {from: web3.eth.accounts[5]}, function() {
				alert('vote submited to Candidate3');
				
				let flag = bulkcreate(db.products, {
					CandidateName: "Candidate3",
					Votes: 1
					
					
				  });
				 disable();
				  
				  $('#loc_info').text('Vote submited successfully to Candidate3')
			});
		})
		$('#vote4').click(function(){
			contractInstance.voteForCandidate('Candidate4', {from: web3.eth.accounts[6]}, function() {
				alert('vote submited to Candidate4');
				// obj['Candidate 4'] += 1;
				let flag = bulkcreate(db.products, {
					CandidateName: "Candidate4",
					Votes: 1
					
					
				  });
				 disable();
				 $('#loc_info').text('Vote submited successfully to Candidate4')
			});
		})
	});
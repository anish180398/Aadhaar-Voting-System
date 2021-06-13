
 

$(document).ready(function() {
	$('.modal').modal();
		// $.ajax({
	 //    url: '/getaddress',
	 //    method: 'post'
		// }).done(function(){
		// 	console.log('done');
		// });
	
	
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
		VotingContract = web3.eth.contract(abi);
		contractInstance = VotingContract.at('0x593CD90b87b10A49606308BABF06BAE3726e90fC');
		
	
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
	
		var aadhaar_list = {
			
			"123456789123" : "Chennai"
		}
	
		var aadhaar = readCookie('aadhaar');
	
		console.log(aadhaar);
		var address = aadhaar_list[aadhaar];
		console.log(address);
		$('#loc_info').text('Location based on Aadhaar : '+ address)
		 

		
		const prodb = (dbname, table) => {
			const db = new Dexie(dbname);
			db.version(1).stores(table);
			db.open();
		  
			return db;
		   
		  };
		  let db = prodb("Productdb", {
			products: `++id, name, quantity, price`
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

		// const display = (obj) => {
		// 	const [can1,can2,can3,can4] = obj;
		// 	return `The votes for each candidates is as follows \n Candidate 1 : ${can1}`
		// }
		
		// var obj = { "Candidate 1": 0, "Candidate 2": 0, "Candidate 3": 0, "Candidate 4": 0};
		// function getv() {
		// 	return db.transaction( db.products, async () => {
		// 	  const austin = await db.products.get(2);
		// 	  // Query by "foreign key" on vehicles:			  
		// 	  return austin._value;
		// 	});}
		
		$('#vote1').click(function(){
			contractInstance.voteForCandidate('Candidate1', {from: web3.eth.accounts[0]}, function() {
				// // $.ajax({
				// // 	type: "POST",
				// // 	url: 'http://localhost:8080/vote',
				// // 	data: {candidate : "can1"},
				// // 	success: alert("Vote Submitted Succesfully"),
				// // 	dataType: JSON
				// //   });
				// console.log(obj);
				// localStorage.setItem('votes', obj);
				//   $.post("'http://localhost:8080/vote",
				//   {
				// 	candidate : "can1"
				//   },
				//   function(data, status){
				// 	alert("Data: " + data + "\nStatus: " + status);
				//   });
                // getData(db.products, data => {
				// 	userid.value = data.id + 1 || 1;
				//   });
				// const valu=getv();
				// console.log(valu);
				// db.products.update(2,data=>{
				// 	name: data.name,
				// 	quantity: data.quantity+1
				//   });
				// var objv={};
				// getData(db.products, (data, index) => {
				// 	if (data) {
				// 		if(data.name=='Candidate1')
				// 			objv=data;
				// 	  		console.log(data.quantity)
				// 	}
				
				//   });
				let flag = bulkcreate(db.products, {
					name: "Candidate1",
					quantity :  1,
					price: aadhaar
					
				  });
				  disable();
				  $('#loc_info').text('Vote submited successfully to Candidate1')
			});
		})
		
		$('#vote2').click(function(){
			contractInstance.voteForCandidate('Candidate2', {from: web3.eth.accounts[0]}, function() {
				alert('vote submited to Candidate2');
				// obj['Candidate 2'] += 1;
  				// 	$.ajax({
				// 	type: "POST",
				// 	url: 'http://localhost:8080/vote',
				// 	data: {candidate : "can2"},
				// 	success: alert("Vote Submitted Succesfully"),
				// 	dataType: JSON
				//   });
				// $.post("'http://localhost:8080/vote",
				//   {
				// 	candidate : "can2"
				//   },
				//   function(data, status){
				// 	alert("Data: " + data + "\nStatus: " + status);
				//   });
				let flag = bulkcreate(db.products, {
					name: "Candidate2",
					quantity: 1,
					price: aadhaar
					
				  });
				 disable();
				 $('#loc_info').text('Vote submited successfully to Candidate2')
			});
		})
		$('#vote3').click(function(){
			contractInstance.voteForCandidate('Candidate3', {from: web3.eth.accounts[0]}, function() {
				alert('vote submited to Candidate3');
				// obj['Candidate 3'] += 1;
				// $.ajax({
				// 	type: "POST",
				// 	url: 'http://localhost:8080/vote',
				// 	data: {candidate : "can3"},
				// 	success: alert("Vote Submitted Succesfully"),
				// 	dataType: JSON
				//   });
				let flag = bulkcreate(db.products, {
					name: "Candidate3",
					quantity: 1,
					price: aadhaar
					
				  });
				 disable();
				  
				  $('#loc_info').text('Vote submited successfully to Candidate3')
			});
		})
		$('#vote4').click(function(){
			contractInstance.voteForCandidate('Candidate4', {from: web3.eth.accounts[0]}, function() {
				alert('vote submited to Candidate4');
				// obj['Candidate 4'] += 1;
				let flag = bulkcreate(db.products, {
					name: "Candidate4",
					quantity: 1,
					price: aadhaar
					
				  });
				 disable();
				 $('#loc_info').text('Vote submited successfully to Candidate4')
			});
		})
	});
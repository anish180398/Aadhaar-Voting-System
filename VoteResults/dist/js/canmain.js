import prodb, {
    bulkcreate,
    createEle,
    getDatav,
    getData,
    SortObj
  } from "./canmodule.js";
  
  
  let db = prodb("votingDB", {
    products: `++id, CandidateName, Votes`
  });
  
  // input tags
  const userid = document.getElementById("userid");
  const proname = document.getElementById("proname");
  const Votes = document.getElementById("Votes");
  
  
  // create button
  const btncreate = document.getElementById("btn-create");
  const btnread = document.getElementById("btn-read");
  const btnupdate = document.getElementById("btn-update");
  const btndelete = document.getElementById("btn-delete");
  
  // user data
  
  
  // event listerner for create button
  btncreate.onclick = event => {
    // insert values
    let flag = bulkcreate(db.products, {
      name: proname.value,
      Votes: Votes.value
      
    });
    // reset textbox values
    //proname.value = "";
    //Votes.value = "";
    // price.value = "";
    proname.value = Votes.value = "";
  
    // set id textbox value
    getData(db.products, data => {
      userid.value = data.id + 1 || 1;
    });
    table();
  
    let insertmsg = document.querySelector(".insertmsg");
    getMsg(flag, insertmsg);
  };
  
  // event listerner for create button
  btnread.onclick = table;
  
  // button update
  btnupdate.onclick = () => {
    const id = parseInt(userid.value || 0);
    if (id) {
      // call dexie update method
      db.products.update(id, {
        name: proname.value,
        Votes: Votes.value
        
      }).then((updated) => {
        // let get = updated ? `data updated` : `couldn't update data`;
        let get = updated ? true : false;
  
        // display message
        let updatemsg = document.querySelector(".updatemsg");
        getMsg(get, updatemsg);
  
        proname.value = Votes.value = price.value = "";
        //console.log(get);
      })
    } else {
      console.log(`Please Select id: ${id}`);
    }
    table();
  }
  
  // delete button
  btndelete.onclick = () => {
    db.delete();
    db = prodb("votingDB", {
      products: `++id, CandidateName, Votes`
    });
    db.open();
    table();
    textID(userid);
    // display message
    let deletemsg = document.querySelector(".deletemsg");
    getMsg(true, deletemsg);
  }
  
  window.onload = event => {
    // set id textbox value
    textID(userid);
  };
  
    
  function GetValueByKeyA(data){
    let c1=0,c2=0,c3=0,c4=0;
    console.log(data.length); 
    console.log(data[0].name); 
    
   
    for (let item=0; item<data.length; item++){
      
        if(data[item].name=="Candidate1"){
          c1+=1;
          console.log("c1");
        }
            
        else if(data[item].name=="Candidate2"){
          c2+=1;
          console.log("c2");
        }
            
         else if(data[item].name=="Candidate3"){
            c3+=1;
            console.log("c3");
          }
       
          else if(data[item].name=="Candidate4"){
            c4+=1;
            console.log("c4");
          }
            
      }
    
    
    console.log(c1,c2,c3,c4);
    document.getElementById("c1").innerText=c1;
    document.getElementById("c2").innerText=c2;
    document.getElementById("c3").innerText=c3;
    document.getElementById("c4").innerText=c4;
  let winner = ""; 
    let obj={c1,c2,c3,c4},
	greatest=Object.values(obj).sort().pop()
let	key = Object.keys(obj).find( k => obj[k] === greatest )
if(key == 'c1'){
winner = "Candidate 1";
}
else if(key == 'c2'){
  winner = "Candidate 2";
  }
  else if(key == 'c3'){
    winner = "Candidate 3";
    }
    else if(key == 'c4'){
      winner = "Candidate 4";
      }
document.getElementById("winner").innerText = "The Winner is "+ winner ;
document.getElementById("winner").style.fontSize = "x-large";

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Vote Results"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
          {y: c1, label: "Candidate 1"},
          {y: c2, label: "Candidate 2"},
          {y: c3, label: "Candidate 3"},
          {y: c4, label: "Candiate 4"}
          
        ]
      }]
    });
    chart.render();

    
  }
  // create dynamic table
  function table() {
    const tbody = document.getElementById("tbody");
    const notfound = document.getElementById("notfound");
    notfound.textContent = "";
    // remove all childs from the dom first
    // while (tbody.hasChildNodes()) {
    //   tbody.removeChild(tbody.firstChild);no
    // }
    var dbValue=[];
    getData(db.products, (data, index) => {
      if (data) {
        dbValue.push(data);
        // console.log(data);
        // console.log(dbValue)
  
  
        // createEle("tr", tbody, tr => {
        //   for (const value in data) {
        //     createEle("td", tr, td => {
        //       td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
        //     });
        //   }
        //   createEle("td", tr, td => {
        //     createEle("i", td, i => {
        //       i.className += "fas fa-edit btnedit";
        //       i.setAttribute(`data-id`, data.id);
        //       // store number of edit buttons
        //       i.onclick = editbtn;
        //     });
        //   })
        //   createEle("td", tr, td => {
        //     createEle("i", td, i => {
        //       i.className += "fas fa-trash-alt btndelete";
        //       i.setAttribute(`data-id`, data.id);
        //       // store number of edit buttons
        //       i.onclick = deletebtn;
        //     });
        //   })
        // });
      } else {
        notfound.textContent = "No record found in the database...!";
      }
  
    });
    setTimeout(function(){ 
    GetValueByKeyA(dbValue);
  }, 3000);
   
    
  }
  
  const editbtn = (event) => {
    let id = parseInt(event.target.dataset.id);
    db.products.get(id, function (data) {
      let newdata = SortObj(data);
      userid.value = newdata.id || 0;
      proname.value = newdata.CandidateName || "";
      Votes.value = newdata.Votes || "";
     
    });
  }
  
  // delete icon remove element 
  const deletebtn = event => {
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();
  }
  
  // textbox id
  function textID(textboxid) {
    getData(db.products, data => {
      textboxid.value = data.id + 1 || 1;
    });
  }
  
  // function msg
  function getMsg(flag, element) {
    if (flag) {
      // call msg 
      element.className += " movedown";
  
      setTimeout(() => {
        element.classList.forEach(classname => {
          classname == "movedown" ? undefined : element.classList.remove('movedown');
        })
      }, 4000);
    }
  }
  
  // Add Cart
  
  $('#addCart').click(function(){
    Modaltable();
  });
  
  $(document).on('focusout','.qty',function(event){
    var QtyValue=this.value;
    var QtyPrice=$(this).parent().parent().find('.hdnPrice').val();
    $(this).parent().parent().find('.spnPrice')[0].innerText='$'+QtyPrice*QtyValue;
    $(this).parent().parent().find('.upPrice')[0].value=QtyPrice*QtyValue;
    updateTotal();
  });
  
  function updateTotal(){
    var sum = 0;
    $('.upPrice').each(function(){
        sum += parseFloat(this.value);
    });
    console.log(sum)
    $('#cartTotal').text('$'+sum);
  }
  
  function Modaltable() {
    const tbody = document.getElementById("tModalBody");
    const notfound = document.getElementById("notfound");
    notfound.textContent = "";
    // remove all childs from the dom first
    while (tbody.hasChildNodes()) {
      tbody.removeChild(tbody.firstChild);
    }
  
  
    getData(db.products, (data, index) => {
      if (data) {
        createEle("tr", tbody, tr => {
          for (const value in data) {
            createEle("td", tr, td => {
              if( value!='Votes'){
               td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
              }
              if( value=='Votes'){
                if(value=='Votes'){
                  td.textContent='';
                  createEle("input", td,input=>{
                    input.value=0;;
                    input.type="number";
                    input.className='qty';
                    
                  });                
                }
                
              }
            });
          }        
        });
      } else {
        notfound.textContent = "No record found in the database...!";
      }
  
    });
  }
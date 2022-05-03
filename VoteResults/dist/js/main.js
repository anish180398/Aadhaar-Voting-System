import voterDB, {
    bulkcreate,
    createEle,
    getData,
    SortObj
  } from "./module.js";
  
  
  let db = voterDB("voterDB", {
    voters: `++id, name, adhaarnumber, phonenumber`
  });
  
  // input tags
  const userid = document.getElementById("userid");
  const proname = document.getElementById("proname");
  const adhaarnumber = document.getElementById("adhaarnumber");
  const phonenumber = document.getElementById("phonenumber");
  
  // create button
  const btncreate = document.getElementById("btn-create");
  const btnread = document.getElementById("btn-read");
  const btnupdate = document.getElementById("btn-update");
  const btndelete = document.getElementById("btn-delete");
  
  // user data
  
  // event listerner for create button
  btncreate.onclick = event => {
    // insert values
    let flag = bulkcreate(db.voters, {
      name: proname.value,
      adhaarnumber: adhaarnumber.value,
      phonenumber: phonenumber.value
    });
    // reset textbox values
    //proname.value = "";
    //adhaarnumber.value = "";
    // phonenumber.value = "";
    proname.value = adhaarnumber.value = phonenumber.value = "";
  
    // set id textbox value
    getData(db.voters, data => {
      userid.value = data.id + 1 || 1;
      console.log(data.adhaarnumber);
      console.log(data.phonenumber);
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
      db.voters.update(id, {
        name: proname.value,
        adhaarnumber: adhaarnumber.value,
        phonenumber: phonenumber.value
      }).then((updated) => {
        // let get = updated ? `data updated` : `couldn't update data`;
        let get = updated ? true : false;
  
        // display message
        let updatemsg = document.querySelector(".updatemsg");
        getMsg(get, updatemsg);
  
        proname.value = adhaarnumber.value = phonenumber.value = "";
        //console.log(get);
      })
    } else {
      console.log(`Please Select id: ${id}`);
    }
  }
  
  // delete button
  btndelete.onclick = () => {
    db.delete();
    db = prodb("votersDB", {
      voters: `++id, name, adhaarnumber, phonenumber`
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
  
  
  
  
  // create dynamic table
  function table() {
    const tbody = document.getElementById("tbody");
    const notfound = document.getElementById("notfound");
    notfound.textContent = "";
    // remove all childs from the dom first
    while (tbody.hasChildNodes()) {
      tbody.removeChild(tbody.firstChild);
    }
  
  
    getData(db.voters, (data, index) => {
      if (data) {
        createEle("tr", tbody, tr => {
          for (const value in data) {
            createEle("td", tr, td => {
              td.textContent = data.phonenumber === data[value] ? ` ${data[value]}` : data[value];
            });
          }
          createEle("td", tr, td => {
            createEle("i", td, i => {
              i.className += "fas fa-edit btnedit";
              i.setAttribute(`data-id`, data.id);
              // store number of edit buttons
              i.onclick = editbtn;
            });
          })
          createEle("td", tr, td => {
            createEle("i", td, i => {
              i.className += "fas fa-trash-alt btndelete";
              i.setAttribute(`data-id`, data.id);
              // store number of edit buttons
              i.onclick = deletebtn;
            });
          })
        });
      } else {
        notfound.textContent = "No record found in the database...!";
      }
  
    });
  }
  
  const editbtn = (event) => {
    let id = parseInt(event.target.dataset.id);
    db.voters.get(id, function (data) {
      let newdata = SortObj(data);
      userid.value = newdata.id || 0;
      proname.value = newdata.name || "";
      adhaarnumber.value = newdata.adhaarnumber || "";
      phonenumber.value = newdata.phonenumber || "";
    });
  }
  
  // delete icon remove element 
  const deletebtn = event => {
    let id = parseInt(event.target.dataset.id);
    db.voters.delete(id);
    table();
  }
  
  // textbox id
  function textID(textboxid) {
    getData(db.voters, data => {
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
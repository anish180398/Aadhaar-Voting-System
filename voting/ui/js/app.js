
//########################
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
//#######################
const URL = "https://teachablemachine.withgoogle.com/models/mzrTJTo8L/";
    let model, webcam, labelContainer, maxPredictions;
    let el = document.getElementById('face');
if(el){
  el.addEventListener('click', start, false);
}
    // document.querySelector('#face').addEventListener('click', start)
    // Load the image model and setup the webcam
    async function start() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }
  var Vname = "";
    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
    let out = document.getElementById('outcome');
    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            // labelContainer.childNodes[i].innerHTML = classPrediction;
            let prob = prediction[i].probability.toFixed(2);
                if(prob==1){
                    out.innerHTML = prediction[i].className;
                    Vname = prediction[i].className;
                }
        }
    }

    import voterDB, {
      bulkcreate,
      createEle,
      getData,
      SortObj
    } from "./module.js";

    let db = voterDB("voterDB", {
      voters: `++id, name, adhaarnumber, phonenumber`
    });
    //getData(db.voters);
   const ad = await db.voters.get(3);
   console.log(ad.adhaarnumber);
   console.log(db.voters.get.length);
   let dbLength = db.voters.get.length;
   let aadhaar_no_phone_no = {}
   for( let i=1;i<=3;i++){
    const ad = await db.voters.get(i);
    // console.log(ad.adhaarnumber);
    // console.log(ad.phonenumber);
    // console.log("---")
    aadhaar_no_phone_no[ad.adhaarnumber] = ad.phonenumber;
   }
   console.log(aadhaar_no_phone_no);
   let aadhaar_list = {}
		 for( let i=1;i<=dbLength;i++){
		  const ad =  db.voters.get(i);
		  // console.log(ad.adhaarnumber);
		  // console.log(ad.phonenumber);
		  // console.log("---")
		  aadhaar_list[ad.adhaarnumber] = ad.name;
		 }
		 console.log(aadhaar_list);
//####################################
// var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
$('#verify_otp_model').hide()
$('#errorbox').hide()

// phone auth
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('getotp', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
        
      }
    });
    // [END appVerifier]

  // recaptchaVerifier.render().then(function(widgetId) {
  //     //window.recaptchaWidgetId = widgetId;
  //   //  updateSignInButtonUI();
  //   });

 
  

  function onSignInSubmit() {
    window.signingIn = true;
    $('#errorbox').hide();
   // updateSignInButtonUI();
    var phoneNumber = "+91" + aadhaar_no_phone_no[Vname];
    console.log(phoneNumber);
      var d = new Date();
      d.setTime(d.getTime() + (1*24*60*60*1000));      
      var expires = "expires="+ d.toUTCString();
      document.cookie = 'aadhaar' + "=" + $('#aadhaar_no').val() + ";" + expires + ";path=/";

    $('#verifyc').text('Enter verification code send to '+phoneNumber)
     var appVerifier = window.recaptchaVerifier;
     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            //firebase.auth().settings.isAppVerificationDisabledForTesting = true;
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            window.signingIn = false;
           // updateSignInButtonUI();
            // $('.verification-code-form').show()
            // $('#hidepf').hide()
            $('#enter_aadhaarno').hide()
            $('#verify_otp_model').show()
            console.log('otp');
            
          }).catch(function (error) {
            // Error; SMS not sent
            // $('.main_loader').hide()

            //console.error('Error during signInWithPhoneNumber', error);
            window.alert('error\n\n'+error);
            window.signingIn = false;
            //updateSignInFormUI();
            //updateSignInButtonUI();
            $('.verification-code-form').hide()
          });
  }
// Phone auth end //

$(verifyotp).click(function(){
		var code = $('#verify_otp').val()
      	confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        window.verifyingCode = false;
        //login success
        console.log(user.uid);
        var d = new Date();
    	d.setTime(d.getTime() + (1*24*60*60*1000));      
    	var expires = "expires="+ d.toUTCString();
    	document.cookie = 'show' + "=" + user.uid + ";" + expires + ";path=/";
    	window.location = '/info'

      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n'
           + error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        $('#errorbox').show()
		$('#error').text('Enter valid OTP')
      });
});


$(getotp).click(function(){
	if ($('#aadhaar_no').val()=="") {
		$('#errorbox').show()
		$('#error').text('Please Enter Aadhaar No')

    }
    else if($('#aadhaar_no').val()== Vname)
    {
    	onSignInSubmit();
    	$('#errorbox').hide()
    }
    else if($('#aadhaar_no').val()!= Vname){
      $('#errorbox').show()
      $('#error').text('Mismatch in Adhaar with the Face ')
    }
});
export {aadhaar_list};
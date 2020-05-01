function validate(){
    checkFilled();    
}
function checkFilled(){
    var day = document.forms['birthdayForm']['day'].value;
    var month = document.forms['birthdayForm']['month'].value;
    var year = document.forms['birthdayForm']['year'].value;
    var gender = document.getElementsByName('gender');

    if(gender[0].checked == true){
        gender = "male";
    }else if(gender[1].checked == true){
        gender = "female";
    }else{
        gender = "";
    }
    console.log(gender);
    var ele = document.getElementById('danger-notif');
    var ele2 = document.getElementById('gender-notif');
    var err = document.getElementById('err-notif');
    var monthErr = document.getElementById('month-notif');
    var dayErr = document.getElementById('day-notif');
    if(year === "" || month === "" || day === "" || gender === ""){
        ele.style.display = "inline";
        ele2.style.display = "none";
        err.style.display = "none";
        monthErr.style.display = "none";
        dayErr.style.display = "none";
        
    }else{
        if(ele.style.display == "inline"){
            ele.style.display = "none";
        }
    }
    checkWhichNotFilled(day, month, year, gender);
}
function checkWhichNotFilled(day, month, year, gender){
    var dayInput = document.getElementById('day');
    var monthInput = document.getElementById('month');
    var yearInput = document.getElementById('year');

    if(day === ""){
        dayInput.style.borderColor = "red"; 
    }
    if(month === ""){
        monthInput.style.borderColor = "red"; 
    }
    if(year === ""){
        yearInput.style.borderColor = "red"; 
    }
    if(day !== ""){
        dayInput.style.borderColor = "#ced4da"; 
    }
    if(month !== ""){
        monthInput.style.borderColor = "#ced4da"; 
    }
    if(year !== ""){
        yearInput.style.borderColor = "#ced4da"; 
    }
    if(day !== "" && month !== "" && year !== "" && gender === ""){
        document.getElementById('danger-notif').style.display = "none";
        document.getElementById('gender-notif').style.display = "inline";
        dayInput.style.borderColor = "#ced4da"; 
        monthInput.style.borderColor = "#ced4da"; 
        yearInput.style.borderColor = "#ced4da"; 
    }
    allFilled(day, month, year, gender);
}
function allFilled(day, month, year, gender){
    if(day !== "" && month !== "" && year !== "" && gender !== ""){
        document.getElementById('danger-notif').style.display = "none";
        document.getElementById('gender-notif').style.display = "none";
    }
    validNumbers(day, month, year, gender);
}
function validNumbers(day, month, year, gender){
    if (parseInt(day) < 1 || day > 31){
        var err = document.getElementById('day-notif');
        err.innerHTML = "";
        var text = document.createTextNode("Please correct your day. ");
        document.getElementById('month').style.borderColor = "red";
        err.appendChild(text);
        err.style.display = "inline";
    }
    if(parseInt(month) < 1 || month > 12){
        var err = document.getElementById('month-notif');
        err.innerHTML = "";
        var text = document.createTextNode("Please correct your month. ");
        document.getElementById('month').style.borderColor = "red";
        err.appendChild(text);
        err.style.display = "inline";
    }
    if(year > new Date().getFullYear()){
        var year = new Date().getFullYear();
        var err = document.getElementById('err-notif');
        err.innerHTML = "";
        var text = document.createTextNode("Year can't be greater than " +year);
        document.getElementById('year').style.borderColor = "red";
        err.appendChild(text);
        err.style.display = "inline";
    }
    findBirthday(day, month, year, gender);
}
function findBirthday(day, month, year, gender){
    var cc = "";
    var yy = "";
    var mm = month;
    var dd = day;
    for(var i = 0; i <= 1; i++){
        cc += year[i];
    }
    for(var i = 2; i <= 3; i++){
        yy += year[i];
    }
    cc = parseInt(cc);
    yy = parseInt(yy);
    
    var day = Math.round((((cc/4) -2*cc-1) + ((5*yy/4)) + ((26*(mm+1)/10)) + dd ) % 7);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log(days[day-1]);
    var siku = days[day-1];

    displayDay(gender, siku);
}
function displayDay(gender, siku){
    if(gender == "male"){
        console.log(gender);
        document.getElementById('girl').style.display = "none";
        var manDay = document.getElementById('man-day');
        manDay.innerHTML = "";
        var newDay = document.createTextNode("Day: " + siku);
        manDay.appendChild(newDay);
        document.getElementById('man').style.display = "inline";
    }else{
        console.log(gender);
        document.getElementById('man').style.display = "none";
        var girlDay = document.getElementById('girl-day');
        girlDay.innerHTML = "";
        var newDay = document.createTextNode("Day: " + siku);
        girlDay.appendChild(newDay);
        document.getElementById('girl').style.display = "inline";
    }
    
}
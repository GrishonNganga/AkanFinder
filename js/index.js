function validate(){
    checkFilled();    
}
//This function checks if there are any empty fields providing error handling.
function checkFilled(){
    //Get the data from all the fields.
    var day = document.forms['birthdayForm']['day'].value;
    var month = document.forms['birthdayForm']['month'].value;
    var year = document.forms['birthdayForm']['year'].value;
    var gender = document.getElementsByName('gender');

    //Check which gender has been selected.
    if(gender[0].checked == true){
        gender = "male";
    }else if(gender[1].checked == true){
        gender = "female";
    }else{
        gender = "";
    }
    //Get all the error divs and check which field is empty.
    //If any of the field is empty, only show the default error div.
    //Otherwise turn the default error div off too.
    var defaultErr = document.getElementById('danger-notif');
    var genderErr = document.getElementById('gender-notif');
    var yearErr = document.getElementById('year-notif');
    var monthErr = document.getElementById('month-notif');
    var dayErr = document.getElementById('day-notif');
    
    //Only allow to move to the succedding methods if and only if this section is satisfied.

    if(year === "" || month === "" || day === "" || gender === ""){
        defaultErr.style.display = "inline";
        genderErr.style.display = "none";
        yearErr.style.display = "none";
        monthErr.style.display = "none";
        dayErr.style.display = "none";
        
    }else{
        if(defaultErr.style.display == "inline"){
            defaultErr.style.display = "none";
        }
    }
    //
    checkWhichNotFilled(day, month, year, gender);
}
function checkWhichNotFilled(day, month, year, gender){
    var dayInput = document.getElementById('day');
    var monthInput = document.getElementById('month');
    var yearInput = document.getElementById('year');
    var counter = 0;

    if(day === ""){
        dayInput.style.borderColor = "red"; 
        counter++;
    }
    if(month === ""){
        monthInput.style.borderColor = "red"; 
        counter++;
    }
    if(year === ""){
        yearInput.style.borderColor = "red"; 
        counter++;
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
    if(counter > 0){
        document.getElementById('man').style.display = "none";
        document.getElementById('girl').style.display = "none";
        return;
    }else{
        if(day !== "" && month !== "" && year !== "" && gender === ""){
            document.getElementById('danger-notif').style.display = "none";
            document.getElementById('gender-notif').style.display = "inline";
            dayInput.style.borderColor = "#ced4da"; 
            monthInput.style.borderColor = "#ced4da"; 
            yearInput.style.borderColor = "#ced4da"; 

            document.getElementById('man').style.display = "none";
            document.getElementById('girl').style.display = "none";
            return;
        }else{
            allFilled(day, month, year, gender);
        }
    }
    
    
}
function allFilled(day, month, year, gender){
    if(day !== "" && month !== "" && year !== "" && gender !== ""){
        document.getElementById('danger-notif').style.display = "none";
        document.getElementById('gender-notif').style.display = "none";
    }
    validNumbers(day, month, year, gender);
}
function validNumbers(day, month, year, gender){
    var counter = 0;
    var dayErr = document.getElementById('day-notif');
    var monthErr = document.getElementById('month-notif');
    var yearErr = document.getElementById('year-notif');

    if (parseInt(day) < 1 || day > 31){
        dayErr.innerHTML = "";
        var text = document.createTextNode("Please correct your day. ");
        document.getElementById('day').style.borderColor = "red";
        dayErr.appendChild(text);
        dayErr.style.display = "inline";
        counter++;
    }else{
        if(dayErr.style.display == "inline"){
            dayErr.style.display = "none";
        }
    }
    if(parseInt(month) < 1 || month > 12){
        monthErr.innerHTML = "";
        var text = document.createTextNode("Please correct your month. ");
        document.getElementById('month').style.borderColor = "red";
        monthErr.appendChild(text);
        monthErr.style.display = "inline";
        counter++;
    }else{
        if(monthErr.style.display == "inline"){
            monthErr.style.display = "none";
        }
    }
    if(year > new Date().getFullYear()){
        var year = new Date().getFullYear();
        yearErr.innerHTML = "";
        var text = document.createTextNode("Year can't be greater than " +year);
        document.getElementById('year').style.borderColor = "red";
        yearErr.appendChild(text);
        yearErr.style.display = "inline";
        counter++;
    }else{
        if(yearErr.style.display == "inline"){
            yearErr.style.display = "none";
        }
    }
    if(counter > 0){
        document.getElementById('man').style.display = "none";
        document.getElementById('girl').style.display = "none";
        return;
    }else{
        findBirthday(day, month, year, gender);
    }
    
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

        //Hide the female div
        document.getElementById('girl').style.display = "none";
        
        //Get the male div, populate with the guys details and make it viscible.
        var manDay = document.getElementById('man-day');
        var manAkan = document.getElementById('man-akan');

        //Update the day of the week born.
        manDay.innerHTML = "";
        var newDay = document.createTextNode("Day: " + siku);
        manDay.appendChild(newDay);

        //Update the Akan name given.
        manAkan.innerHTML = "";
        //Possible names for the males.
        var maleAkan = {
            "Sunday": "Kwasi",
            "Monday": "Kwadwo",
            "Tuesday": "Kwabena",
            "Wednesday": "Kwaku",
            "Thursday": "Yaw",
            "Friday": "Kofi",
            "Saturday": "Kwame"
        }
        var newName = maleAkan[siku];
        var newNameText = document.createTextNode("Akan: " + newName);
        manAkan.appendChild(newNameText);
        document.getElementById('man').style.display = "inline";

    }else{

        //Hide the male div.
        document.getElementById('man').style.display = "none";
        
        //Get and populate the female div.
        var girlDay = document.getElementById('girl-day');
        var girlAkan = document.getElementById('girl-akan');

        //Update the day of the week born.
        girlDay.innerHTML = "";
        var newDay = document.createTextNode("Day: " + siku);
        girlDay.appendChild(newDay);

        //Update the Akan name of the girl.
        girlAkan.innerHTML = "";
        var femaleAkan = {
            "Sunday": "Akosua",
            "Monday": "Adwoa",
            "Tuesday": "Abenaa",
            "Wednesday": "Akua",
            "Thursday": "Yaa",
            "Friday": "Afua",
            "Saturday": "Ama"
        }
        var newName = femaleAkan[siku];
        var newNameText = document.createTextNode("Akan: " +newName);
        girlAkan.appendChild(newNameText);
        document.getElementById('girl').style.display = "inline";
    }
    
}
function validate(){
    var day = document.forms['birthdayForm']['day'].value;
    var month = document.forms['birthdayForm']['month'].value;
    var year = document.forms['birthdayForm']['year'].value;
    var ele = document.getElementById('danger-notif');
    if(year === "" || month === "" || day === ""){
        ele.style.display = "inline";
    }else{
        if(ele.style.display == "inline"){
            ele.style.display = "none";
        }
    }
}
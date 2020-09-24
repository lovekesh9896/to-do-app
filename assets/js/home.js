// ---------------------------------------------------------------left section functionality to add new tags
// if display of input is none it will be shown
// if its aleardy shown it will be sent to server to add to db
function addTagButtonClicked() {
    console.log("clicked");
    if ($('#add-tag-input').css('display') == 'none') {
        event.preventDefault();
        $('#add-tag-input').css('display', 'initial');
        return;
    }
}
// when add tag button is clicked
$('#add-tag-button').click(addTagButtonClicked);
// //////////////////////////////////////////
// when 3 dots is cicked
// user info account options will be shown
$('#dots-three').click(function () {
    $('#user-account-options').slideToggle();
});
// /////////////////////////////////////////
// ----------------------------------------------------------------------------------left section ends here

// ------------------------------------------------------------------------------Center section starts here
// when seacrh icon is clicked it will show the search bar input to show the seacrh bar
// right now its disabled functionality will be added in future
$('#list-search').click(function () {
    console.log("search form clicked");
    $('#search-form').slideToggle();
});
// /////////////////////////////////////////////
var oneToDo = $('.one-to-do');

// the bolow function is used to give color to task
// abc class is a display none span whose inner text is the required color of that task
var abcClass = $('.abc');
var tagColor = $('.task-color');

for (let i = 0; i < abcClass.length; i++) {
    $(tagColor[i]).css('background-color', $(abcClass[i]).text());
}
// /////////////////////////////////////////////
// setting min date of input feild as today date
function setMinDateAsToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // as month stars from 0
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd
    }
    if (mm < 10) {
        mm = "0" + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("task-date").setAttribute("min", today);
}
setMinDateAsToday();
// date is mandatory in new task
// so when add task button is clicked and we are checking the date, if its empty
// today date is constructed and is added to that feild
// and then form is sent
$('#add-task-div-button').click(function () {
    var taskDate = document.getElementById('task-date');


    if (taskDate.value == "") {

        var d = new Date();
        d.setDate(d.getDate() + 7);
        var date = "";
        date = d.getFullYear() + "-";
        // checking this because of required format of date input feild is yyyy-mm-dd
        if (d.getMonth() < 9) {
            date += "0" + (
                d.getMonth() + 1
            ) + "-";
        } else {
            date += (d.getMonth() + 1) + "-";
        }
        if (d.getDate() <= 9) {
            date += "0" + d.getDate();
        } else {
            date += + d.getDate();
        }
        console.log(date);
        taskDate.value = date;
        console.log("date was null and (today + 7 days) date is added");

    } else {
        console.log("date is not null");
    }
});


// ///////////////////////////////////////////////////

var tagContainer = document.getElementsByClassName('tag');
var shower = document.getElementsByClassName('shower');
// the first tag (recents) is selected on page loads
// this can be done with css too but just to keep things simple
$('.tag:first').css("background-color", "rgb(52,122,245)");
$('.tag:first').children('.tag-name').css("color", 'white');
$('.tag:first').children('.tag-count').css('color', 'white');
$('.tag:first').children('.tag-count').css('background-color', '#5353c5');
// when a tag is clicked form left section we have to decide
// which shower class div to be shown in right section
// below function is called when a tag is clicked
// first it wll make all the display to none
// the we will make the display of event.target div to flex and it will be shown
function setDisplayToNone() {
    for (let i = 0; i < shower.length; i++) {
        $(shower[i]).css('display', 'none');
    }
}
// this is used with same concept above
// when a tag is clicked we ahve to chnage its text-color and background-color
// so first text-color and background-color of all the tag div are set to default
// then text-color and ackground color of targeted elem is changed
function clearHightlighted() {
    var tag_list = $('.tag');
    for (let i = 0; i < tag_list.length; i++) {
        $(tag_list[i]).css('background-color', 'initial');
        $(tag_list[i]).children('.tag-name').css('color', 'lightgrey');
        $(tag_list[i]).children('.tag-count').css('color', 'lightgrey');
        $(tag_list[i]).children('.tag-count').css('background-color', 'initial');
    }
}

// this function is used to make display of all the elem in trash as initial
// the trash logic is {
    // in the all section of trash we are showing all the tasks that has trashed as true
    // in finished section we we are using combination of trashed div , the one-to-do class and localstorage
    // we will go through all the one-to-do class div inside div with id trashed and then check its id with
    // the checked id that we stored in localstorage if all things matches and localstorage for that id is true
    // that means that task is complated and we will show it in finished if localstrage value for that
    // id is false we will we will make display of that one-to-do div as none and it will be hidden
    // the exact opposite goes for unfinihed task
    // but as finished and unfinished are just using trash all container and we have set there display to none
    // we have to reverse it back when other trash section is clicked like show all
    // which is makeAllOneToDoInsideTrashVisible() function is used 
// }
var oneToDoInsideTrash = $('#trash-shower > .one-to-do');
function makeAllOneToDoInsideTrashVisible() {

    for (let j = 0; j < oneToDoInsideTrash.length; j++) {
        $(oneToDoInsideTrash[j]).css('display', 'initial');
    }
}

// setting click event on all of tag on left side
// when a tag is clicked we will first clear highlighted on left section
// for example if recents is current hightlight and home is clicked
// first we will make all tags same
// then we will target home with event.target

for (let i = 0; i < tagContainer.length; i++) {

    $(tagContainer[i]).click(function () {
        clearHightlighted();
        // the click event can be called by 2 things, the tag class itself and span insied tag class
        // which might fail general the event.target propertise
        // so we are using below check
        // if clicked elem is of tag class the applay if propertise
        // if span is clcked then apply else propertise
        if ($(event.target).hasClass('tag')) {
            $(event.target).css("background-color", "rgb(52,122,245)");
            $(event.target).children('.tag-name').css("color", 'white');
            $(event.target).children('.tag-count').css('color', 'white');
            $(event.target).children('.tag-count').css('background-color', '#5353c5');
        } else {
            $(event.target).parent().css("background-color", "rgb(52,122,245)");
            $(event.target).parent().children('.tag-name').css("color", 'white');
            $(event.target).parent().children('.tag-count').css('color', 'white');
            $(event.target).parent().children('.tag-count').css('background-color', '#5353c5');
        }
        // this is for finished section, as there are just 2 sections finished and unfinished we can handle
        // them seperately. (tagContainer.length - 2) is used so taht if new tag is added we will still have access 
        // to last second tag
        // logic for below 2 if conditions are written above
        if (i == tagContainer.length - 2) {
            setDisplayToNone();
            makeAllOneToDoInsideTrashVisible();
            $(shower[i - 1]).css('displatagContainer.length - 2y', 'flex');
            var oneToDoInsideTrash = $('#trash-shower > .one-to-do');
            var trashId = $('.trash-id');
            let numberOfElem = 0;
            for (let j = 0; j < oneToDoInsideTrash.length; j++) {
                if (localStorage.getItem(trashId[j].innerText) == "false") {
                    $(oneToDoInsideTrash[j]).css('display', 'none');
                } else {
                    numberOfElem++;
                }
            }
            $('#trash-finished-count').text(numberOfElem);
            return;

        } else if (i == tagContainer.length - 1) {
            setDisplayToNone();
            makeAllOneToDoInsideTrashVisible();
            $(shower[i - 2]).css('display', 'flex');
            var oneToDoInsideTrash = $('#trash-shower > .one-to-do');
            var trashId = $('.trash-id');
            let numberOfElem = 0;
            for (let j = 0; j < oneToDoInsideTrash.length; j++) {
                if (localStorage.getItem(trashId[j].innerText) == "true") {
                    $(oneToDoInsideTrash[j]).css('display', 'none');
                } else {
                    numberOfElem++;
                }
            }
            $('#trash-unfinished-count').text(numberOfElem);
            return;
        } else if (i == tagContainer.length - 3) {
            makeAllOneToDoInsideTrashVisible();
        }
        // setting display of all shower in right section of none
        setDisplayToNone();
        // then setting display flex of target event
        $(shower[i]).css('display', 'flex');
    })
};
// //////////////////////////////////////////////////////

// -----------------------------------------theme change for right section
// every time change icon is clicked we will chnage the theme
// there are 5 default themes background1,2,3,4,5
// there value is stored in local storage
// we are using modules 5 +1 to get the background number
// every time theme icon is clicked the var theme will be incremented

// getting default prev set value of theme
// if its not stored we will set default to 0
var theme;
if (localStorage.getItem("theme") != null) {
    theme = localStorage.getItem("theme") - 1;
} else {
    theme = 0;
}
// constructing the image url
var imageUrl = "/images/background" + (
    theme % 5 + 1
) + ".jpg";
// setting the background
$('#right-section').css('background-image', "url(" + imageUrl + ")");
// every time theme chnage icon is clicked we chnage the theme
// increment theme var by one
// and then store it in localstorage
$('#theme-change-button').click(function () {

    if (localStorage.getItem("theme") != null) {
        theme = localStorage.getItem("theme");
    } else {
        theme = 1;
    } imageUrl = "/images/background" + (
        theme % 5 + 1
    ) + ".jpg";
    $('#right-section').css('background-image', "url(" + imageUrl + ")");
    theme++;
    localStorage.setItem("theme", theme);
});
// //////////////////////////////////////////////////////////

// -------------------------------------------------------------------right section text options
// toogle text bold
$('#make-text-bold').click(function () {
    console.log("bold");
    $('.task-item-container').toggleClass('toogle-bold');
});
// toogle text italics
$('#make-text-italic').click(function () {
    console.log("italics");
    $('.task-item-container').toggleClass('toogle-italics');
});
// toogle text underline
$('#make-text-underline').click(function () {
    console.log("underline");
    $('.task-item-container').toggleClass('toogle-underline');
});
// text align is how will the task-massage and task-item show on the screen
// curr text align value are stored in localstorage so that it will be same when page reloads
// below function will be called when any on the align icon is clicked
// it will remove the prev align
// then we will align the text using event.target
function removePrevAlignClass() {
    $('.task-item-container').removeClass('toogle-left-align');
    $('.task-item-container').removeClass('toogle-center-align');
    $('.task-item-container').removeClass('toogle-right-align');
}
// we are saving the current align config in localstorage
// this will be called load on page load to chekc if any value is saved or not
// if its saved it will be applied otherwise default align which is left align will be stored
var textAlignSavedCongif;
if (localStorage.getItem("textAlignSavedCongif") != null) {
    textAlignSavedCongif = localStorage.getItem("textAlignSavedCongif");
    console.log(textAlignSavedCongif);
    $('.task-item-container').addClass(textAlignSavedCongif);
} else {
    textAlignSavedCongif = "toogle-left-align";
}

// make the text align left
$('#make-text-left').click(function () {
    console.log("left align");
    removePrevAlignClass();
    $('.task-item-container').addClass('toogle-left-align');
    localStorage.setItem("textAlignSavedCongif", 'toogle-left-align');

});
// /////////////////////////////////////////////////////////
// make the text align center
$('#make-text-center').click(function () {
    console.log("center align");
    removePrevAlignClass();
    $('.task-item-container').addClass('toogle-center-align');
    localStorage.setItem("textAlignSavedCongif", 'toogle-center-align');
});
// make the text align right
$('#make-text-right').click(function () {
    console.log("right align");
    removePrevAlignClass();
    $('.task-item-container').addClass('toogle-right-align');
    localStorage.setItem("textAlignSavedCongif", 'toogle-right-align');
});
// //////////////////////////////////////////////////


// setting color of color selector
// colour of color-select-input in add task depennds upon which color is selected
// for example its color wiil be yellow if yellow is selected
var colorSelectordiv = document.getElementById('color-select-div-shower');
$(colorSelectordiv).click(function () {
    $(colorSelectordiv).css('background-color', colorSelectordiv.value);
    $('#down-arrow-for-select-colors').css('background-color', colorSelectordiv.value);
});
// ////////////////////////////////////////////////
// handling the edit button
// when edit button is clicked on any one-to-do div
// below operatins will be fired

// below are the input feild variables of add-task div
// like color-select input, massgae-input, item-input, date.input etc

var editButton = document.getElementsByClassName('edit');
var tagItem = document.getElementsByClassName('task-item');
var tagMassage = document.getElementsByClassName('task-massage');
var tagDate = document.getElementsByClassName('task-date');
var tagColor = document.getElementsByClassName('abc');
var tagValue = document.getElementsByClassName('task-value');
var tagId = document.getElementsByClassName('bcd');
// we are setting up click event on every edit button
// when a edit button is clicked we are using it current data and passing it to feilds
// in the add task form

for (let i = 0; i < editButton.length; i++) {
    $(editButton[i]).click(function () {
        var clickedDiv = event.target;
        $('#task-input').val(tagItem[i].innerText); // update the task item
        $('#massage').val(tagMassage[i].innerText); // update the massage
        $('#task-date').val(tagDate[i].innerText); // update the date
        $('#color-select-div-shower').val(tagColor[i].innerText); // update the color
        $(colorSelectordiv).css('background-color', colorSelectordiv.value); // setting color of color selector div based on its value
        $('#down-arrow-for-select-colors').css('background-color', colorSelectordiv.value); // setting same color for don arrow
        $('#tag-select-div-shower').val(tagValue[i].innerText); // setting value of tag selector
        $('#add-task-div-button').text('Update Task'); // update the inner text of add task button to update task
        $('#add-task').attr("action", "/update-task"); // updating the form action attr so that data goes to diffrent address
        $('#task-id-for-update').val(tagId[i].innerText); // sending the task id for that task so that we can find and update it in server side
    })
};
// //////////////////////////////////////////////////////////////
// handling the task complete button

// storing the id and value of tasks whose are checked
// as we are usign multiple shower div and and one task can be in multiple div like recents and home
// we will treverse throught all the task div and match there id
// if that id value is stored true in localstorage we will mark it as done
// this can be also useful if we are using multiple tags for same task


var checkbox = document.getElementsByClassName('checkbox-for-complete');
var tagItemContainer = document.getElementsByClassName('task-item-container');
// checking all the id  in local storage if its present skip it
// if new task is added then it id will be added too
// storing all the id into local storage
for (var i = 0; i < tagId.length; i++) {
    if (localStorage.getItem(tagId[i].innerText) == null) {
        localStorage.setItem(tagId[i].innerText, false);
    }

}
// to cut the text function will be called every time the page loads

toCutTheText();
// setting up click event on all the checkbox
// every time its clicked we will set its id value to true in localstorage and call the tocutText function
// so that it can mark other tasks with same id as complated too
for (let i = 0; i < checkbox.length; i++) {
    $(checkbox[i]).click(function () {
        console.log(tagItemContainer[i]);
        if ($(checkbox[i]).text() == "check_box") {

            localStorage.setItem(tagId[i].innerText, false);

        } else {
            
            localStorage.setItem(tagId[i].innerText, true);
        } 
        toCutTheText();
        toCheckDueDateAndMissed();

    })
};
// tocutthetext function will traverse throught all the tasks
// it will match the task id with the ids stored in local storage
// if that id value is true it will make the text cut and checkbox done
function toCutTheText() {
    for (var i = 0; i < tagId.length; i++) {
        console.log(tagId[i].innerText);
        console.log(localStorage.getItem(tagId[i].innerText));
        if (localStorage.getItem(tagId[i].innerText) == "true") {
            $(tagItemContainer[i]).addClass('toogle-text-cut');
            $(checkbox[i]).text("check_box");
        } else {
            $(tagItemContainer[i]).removeClass('toogle-text-cut');
            $(checkbox[i]).text("check_box_outline_blank");
        }
    }
}
// //////////////////////////////////////////////////////////////////////
// handline the task pin property
// we are storng the if task is pinned in local storage 
// its kind of same as check box when task is completed
var pin = document.getElementsByClassName('pin');

for (var i = 0; i < pin.length; i++) {
    if (localStorage.getItem(tagId[i].innerText + "isPin") == null) {
        localStorage.setItem(tagId[i].innerText + "isPin", false);
    }

}

// this function will be called every time the page loads we will pick value of IDisPinned fomr local storage 
// and if its true we will pink that task div
// we are using flex order property to pin the tasks 
function toPinTheTask() {
    for (var i = 0; i < tagId.length; i++) {

        console.log(localStorage.getItem(tagId[i].innerText + "isPin"));
        if (localStorage.getItem(tagId[i].innerText + "isPin") == "true") {
            $(pin[i]).css('color', 'yellow');
            $(oneToDo[i]).css('order', '-2');
        } else {
            $(oneToDo[i]).css('order', '0');
            $(pin[i]).css('color', 'white');
        }
    }
}
toPinTheTask();
// below is the click evnt handler on the pin for each one-to-do div


for (let i = 0; i < pin.length; i++) {
    $(pin[i]).click(function () {
        console.log($(pin[i]).css('color'));
        if ($(pin[i]).css('color') == 'rgb(255, 255, 255)') {

            localStorage.setItem(tagId[i].innerText + "isPin", true);

        } else {

            localStorage.setItem(tagId[i].innerText + "isPin", false);
        } 
        toPinTheTask();

    });
};

// left heading animation in categaroies

$('#left-heading').click(function () {
    $('#tag-container').slideToggle(700);
});

$('#trash-tag').click(function () {
    $('#trash-container').slideToggle(500);
});

// to update the records of trash bin
var z = $('#trash-shower > .one-to-do');
$('#trash-total-count').text(z.length);

var numberOfElem = 0;
var trashId = $('.trash-id');
for (let j = 0; j < oneToDoInsideTrash.length; j++) {
    if (localStorage.getItem(trashId[j].innerText) == "true") {
        numberOfElem++;
    }
}
$('#trash-finished-count').text(numberOfElem);
$('#trash-unfinished-count').text(z.length - numberOfElem);
// /////////////////////////////////////////////////////////////////////


// to set if the task is missed or not and show the missed massgae
// this will also show the blinking effect if task due date is near
// we are using indian standard time 
function toCheckDueDateAndMissed(){
    for (let k = 0; k < oneToDo.length; k++) {
        var taskDate = $('.task-date');
        var taskColor = $('.task-color');
        var taskMissed = $('.task-missed-div');
        var d = taskDate[k].innerText;
        var utc = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
        
        var a = 0;
        var date;
        var month;
        var year;
        if(utc.charAt(1)=='/'){
            month = '0' + utc.substring(0,1);
            a = 2;
        }else{
            month = utc.substring(0,2);
            a =3;
        }
        if(utc.charAt(a+1)=='/'){
            date = '0' + utc.substring(a,a+1);
            a += 1;
        }else{
            date = utc.substring(a,a+2);
            a+= 2;
        }
        year = utc.substring(a+1,a+5);
        let diffMonth = d.substring(5,7) - month;
        let diffDate = d.substring(8,11)-date;
        let diffYear = d.substring(0,4) - year;
        var checkbox = document.getElementsByClassName('checkbox-for-complete');
        if(diffYear==0){
            if(diffMonth==0){
                if(diffDate<=3 && diffDate>0){
                    if($(checkbox[k]).text() == "check_box_outline_blank"){
                        $(taskColor[k]).addClass('fadeInOut-class');
                    }else{
                        $(taskColor[k]).removeClass('fadeInOut-class');
                    }
                    
                }
                
            }
        }
        
        if((diffYear <0 || diffMonth < 0 || diffDate < 0) ){
            if(checkbox[k].innerText == "check_box_outline_blank"){
                $(taskMissed[k]).css('display','initial');
            }else{
                $(taskMissed[k]).css('display','none');
            }
            
        }
    }
}

toCheckDueDateAndMissed();

// //////////////////////////////////////////////////////////
// updating the total notes count for recents
console.log($('#total-task-count').text());
$('#task-count').text($('#total-task-count').text().substring(0,2) - z.length );


// animations for contact me form
var social = $('.social');
var socialImage = $('.social-image');
var socialText = $('.social-contact');
// $('#whatsapp').click(function(){
//     socialImage[0].css('animation','goLeft 1.5s ease-in-out');
//     socialText[0].css('animation','goRight 1.5s ease-in-out');
// })
for(let k=0;k<social.length;k++){
    // console.log(social[k]);
    $(social[k]).click(function(){
        // console.log(event.target);
        console.log("here");
        $(socialImage[k]).toggleClass('go-left-class');
        $(socialText[k]).toggleClass('go-right-class');
    })
};

// to open contact me form
$('#show-developer-contact').click(function(){
    $('#blured-div').slideDown(1000);
    $('#contact-developer').slideDown();
});

// to close contact me form 
$('#blured-div').click(function(){
    $('#blured-div').slideUp(1000);
    $('#contact-developer').slideUp();
});
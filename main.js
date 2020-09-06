/* esversion:9 */
$(function() {
    var taeb = $(".taeb-switch");
    taeb.find(".taeb").on("click", function() {
        var $this = $(this);
        if ($this.hasClass("active")) return;
        var direction = $this.attr("taeb-direction");
        taeb.removeClass("left right").addClass(direction);
        taeb.find(".taeb.active").removeClass("active");
        $this.addClass("active");
    });
});

const jamb = document.querySelector('.btn-jamb');
const course = document.querySelector('.btn-course');
const jambCard = document.querySelector('.jamb');
const courseCard = document.querySelector('.course');


jamb.addEventListener("click", e =>{
    e.preventDefault();
    courseCard.classList.remove('active');
    if(!jambCard.classList.contains('active')){
        jambCard.classList.add('active');
    }
});
course.addEventListener("click", e =>{
    e.preventDefault();
    jambCard.classList.remove('active');
    if(!courseCard.classList.contains('active')){
        courseCard.classList.add('active');
    }
});
/* Start of the course dropdown */
let dropdown = document.getElementById('courseSelect');
dropdown.length = 0;
let defaultOption = document.createElement('option');
defaultOption.text = "Select your course";
dropdown.add(defaultOption);
dropdown.selectedIndex = 0; 

const urlCourse = "https://jambito-api.herokuapp.com/";
async function loadApi() {
    let response = await fetch (urlCourse);
    let result = await response.json();
    //console.log(result.results);
    return result;
}
loadApi().then(result=>{
    let option;
    dropOption = Object.keys(result.results);
    //console.log(dropOption);
    for (let i = 0; i < dropOption.length; i++) {
        option = document.createElement('option');
        option.text = dropOption[i];
        option.value = dropOption[i];
        dropdown.add(option);
    }
});
function getSelectValue(){
    let selectValue = dropdown.value;
   alert(selectValue);
}
/* End of the course dropdown */

let subjectCombo=["1"];
function getSelectedSubject(id) {
    let e = document.getElementById(`option_${id}`);
    let selectedsubject = e.value;
    alert(selectedsubject);
    subjectCombo.push(selectedsubject);
    console.log(subjectCombo);
}

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

const urlCourse = "./jambitoMain.json";
async function loadApi() {
    let response = await fetch (urlCourse);
    let result = await response.json();
    //console.log(result.results["ACCOUNTING TECHNOLOGY "].subjects.compulsory);
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
let courseSubmit = document.getElementById('courseSubmit');
courseSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    getSelectValue();
    displayResult();
    popupOpen();
});

function getSelectValue(){
    let selectValue = dropdown.value;
    return selectValue;
}
function displayResult(){
     loadApi().then(result=>{
        getSelectValue();
        let compulsorySubject=result.results[`${getSelectValue()}`].subjects.compulsory;
        let optionalSubject=result.results[`${getSelectValue()}`].subjects.optional;
        let othersSubject=result.results[`${getSelectValue()}`].subjects.others;
        let school=result.results[`${getSelectValue()}`].schools;
        for (let schools of school){
            var list = document.createElement("li");
            list.className = 'sch';
            var node = document.createTextNode(schools);
            list.appendChild(node);
            var element = document.getElementById("listOfSchool");
            element.appendChild(list);
        }
        for (let sub of compulsorySubject){
            var listOfComp = document.createElement("li");
            listOfComp.className = 'compSub';
            var nodeOfComp = document.createTextNode(sub);
            listOfComp.appendChild(nodeOfComp);
            var elementOfComp = document.getElementById("compulsory");
            elementOfComp.appendChild(listOfComp);
        }
        for (let sub of othersSubject){
            var listOfOpt = document.createElement("li");
            listOfOpt.className = 'otherSub';
            var nodeOfOpt = document.createTextNode(sub);
            listOfOpt.appendChild(nodeOfOpt);
            var elementOfOpt = document.getElementById("others");
            elementOfOpt.appendChild(listOfOpt);
        }
        // to continue later
        //console.log(optionalSubject);
        
    });
}
/* End of the course dropdown */
/* Start of the subject dropdown */

const subjectCheck = document.getElementById('submitSubject');

//check the selection if one of the of the dropdown changed.
let subjectCombo=["1"]; // the one is to represent the default value of english
function getSelectedSubject(id) {
    let e = document.getElementById(`option_${id}`);
    let selectedsubject = e.value;
    if(subjectCombo.length <= 3 && !(subjectCombo.includes(selectedsubject))){
        subjectCombo.push(selectedsubject);
    }
    //console.log(subjectCombo);
    return subjectCombo;
}
subjectCheck.addEventListener('click',(e)=>{
    e.preventDefault();
    if (subjectCombo.length<4){
        alert('Incomplete selection!');
    }else{
        console.log(subjectCombo);
    }
    /* loadApi().then(result=>{
        getSelectValue();
        getSelectedSubject(id);
        let compulsorySubject=result.results[`${getSelectValue()}`].subjects.compulsory;
        let kourse=getSelectedSubject(id).map(key,compulsorySubject);
        console.log(kourse);
    }); */
});

/* Ask button */
let askBtn= document.getElementById('askBtn');
askBtn.addEventListener('click',(e)=>{
    e.preventDefault();    
});


// Popup Open
function popupOpen(){
    document.getElementById("popup").style.display="block";
    document.getElementById("overlay").style.display="block";
}
// Popup Close
function popupClose(){
    document.getElementById("popup").style.display="none";
    document.getElementById("overlay").style.display="none";
}
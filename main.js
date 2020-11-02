/* esversion:9 */

/* Start of switch tab */
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
/* End of switch tab */
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
    return result;
}
loadApi().then(result=>{
    let option;
    dropOption = Object.keys(result.results);
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
        let optionalSubject=result.results[`${getSelectValue()}`].subjects.optional["subject 1"];
        //let othersSubject=result.results[`${getSelectValue()}`].subjects.others;
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
        for (let sub of optionalSubject){
            var listOfOpt = document.createElement("li");
            listOfOpt.className = 'optionalSub';
            var nodeOfOpt = document.createTextNode(sub);
            listOfOpt.appendChild(nodeOfOpt);
            var elementOfOpt = document.getElementById("optional");
            elementOfOpt.appendChild(listOfOpt);
        }
        // to continue later
        //console.log(optionalSubject["subject 1"] , optionalSubject["subject 2"]);
        
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
    console.log(subjectCombo);
    return subjectCombo;
}
 async function loadVal(){
    let value = await fetch ('./wat.json');
    let val = await value.json()
    return val;
} 
subjectCheck.addEventListener('click',(e)=>{
    e.preventDefault();
    if (subjectCombo.length<4){
        alert('Incomplete selection!');
    }else{
        // this function checks if the selected subject matches any subject in the json
        loadVal().then(res=>{
            for (let index = 0; index < res.result.length; index++) {
                if(((res.result[index].Subject).sort().toString()).indexOf(subjectCombo.sort().toString())>-1){
                    //console.log(res.result[index].Course);
                    var listOfCourse = document.createElement('li');
                    listOfCourse.className="courses";
                    var nodeOfSub = document.createTextNode(res.result[index].Course);
                    listOfCourse.appendChild(nodeOfSub);
                    var elemOfSub = document.getElementById("listOfCourses");
                    elemOfSub.appendChild(listOfCourse);
                }else{
                    console.log("Try another selection");
                }
            }
        });
    }
    popupOpen1();
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
    document.getElementById("listOfSchool").innerHTML="";
    document.getElementById("compulsory").innerHTML="";
    document.getElementById("optional").innerHTML="";
}
function popupOpen1(){
    document.getElementById("popup1").style.display="block";
    document.getElementById("overlay1").style.display="block";
}
// Popup Close
function popupClose1(){
    document.getElementById("popup1").style.display="none";
    document.getElementById("listOfCourses").innerHTML="";
    document.getElementById("overlay1").style.display="none";
    subjectCombo=["1"];
    document.getElementById("option_2").value ="";
    document.getElementById("option_3").value ="";
    document.getElementById("option_4").value ="";
}
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
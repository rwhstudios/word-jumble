//submit_answer
$(document).ready(function(){
    $('.jumbleText label').mousedown(function() {
        document.getElementById("pop01").play();
        console.log('pick up');
    });
    $('.jumbleText label').mouseup(function() {
        document.getElementById("pop02").play();
        console.log('put down');
    });


    var audio = document.getElementById("player");

    if (!audio.paused || audio.currentTime) {
        //Its playing...do your job
        
        //document.getElementById("playpause").checked;
        
        //console.log('playin')
    }
    else {
        //Not playing...maybe paused, stopped or never played.
        //console.log('NOT playin')
    }
});


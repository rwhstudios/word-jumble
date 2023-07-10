import {WORDS} from "./words.js";

//var name = "WORD of the day is"; // specific word or phrase to be jumbled
//var name = WORDS[Math.floor(Math.random() * WORDS.length)]; // random word from list
var name = WORDS[0]; // single word from list

var wordArr;
var noOfWords;
var str;  
var le;  
function myFunction(name) {
    str =name.replace(" ", "");
    return le=str.length;
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
  
 $(document).ready(function() {
    wordArr = $.trim(name).split(' ');
    noOfWords = $.trim(name).split(' ').length;   
    for(var i=0;i<=(noOfWords-1);i++) {
        var l = myFunction(wordArr[i]);    
        var sf = str.shuffle();
        //alert(i+"th word=>"+wordArr[i]+"=>shuffle=>"+sf);
        var line_class = i==0 ? "firstLine" : i==1 ? "secondLine" : "thirdLine"
        $("#jumbleWords").append("<div id=word_"+i+" class='ui-sortable jumbleText'" + line_class +"> </div>");   
        for(var j=0;j<l;j++) {
            //alert("Letter==>"+sf.charAt(j));
               //STOP
               //NOW
            $("#word_"+i).append("<label class='ls wiggles' id=word_"+i+"_"+j+">"+sf.charAt(j)+"</label>"); // changed from label
        }
        $("#word_"+i).sortable( {
            items: ':not(.correctText)',
            start: function() {
                $('.correctText', this).each(function() {
                    var $this = $(this);
                    $this.data('pos', $this.index());
                });
            },
            change: function(){
                $sortable = $(this);
                $statics = $('.correctText', this).detach();
                $helper = $('<label></label>').prependTo(this);
                $statics.each(function(){
                    var $this = $(this);
                    var target = $this.data('pos');
                    
                    $this.insertAfter($('label', $sortable).eq(target));
                });
                $helper.remove();
            }
        });
        $("#word_"+i+" label.correctText").disableSelection();
    }
    $( ".submit_answer" ).click(function() {
        var textValue = name.split(" ");
        $(".ui-sortable").each(function(sortIndex,sortDiv) {
            $(sortDiv).find("label").each(function(index,elem){
                if (textValue[sortIndex][index] == $.trim($(elem).text())) {
                    $(elem).removeClass("ls").removeClass("wiggles").addClass("correctText");
                }
                else {
                    $(elem).removeClass("correctText").addClass("ls");
                }
            });
        });
    });       
});   

function fnSwap() {
  var swapped = "false";  
  $("div[id^=word_]").each(function(div_index,div_element) {
        //Below text_elements consist array of characters that is neither submitted nor correct
        var text_elements = $(div_element).find("label:not(.correctText)");
        if(swapped=="false" && text_elements.length>0) {     
            var all_elements = $(div_element).find("label");
            var textValue = name.split(" ")[div_index].split("");
            var all_elements_text=[]
            all_elements.each(function(){
                var txt = $(this).text();
                all_elements_text.push(txt);
            }); 
            var current_position = $.inArray($(text_elements[0]).text(), all_elements_text );
            var actual_position = $.inArray($(text_elements[0]).text(), textValue);
            while($(all_elements[actual_position]).hasClass("correctText")) {
                actual_position += $.inArray($(text_elements[0]).text(), textValue.slice(actual_position+1)) + 1;
            }
            while($(all_elements[current_position]).hasClass("correctText")) {                 
                current_position += $.inArray($(text_elements[0]).text(), all_elements_text.slice(current_position+1)) + 1;
            }
            var hint_element1 = $(all_elements[current_position]).clone().removeClass("ls").addClass("correctText").data("fixedIndex",$(all_elements[actual_position]).index());
            if (text_elements.length==2) {
                var hint_element2 = $(all_elements[actual_position]).clone().removeClass("ls").addClass("correctText").data("fixedIndex",$(all_elements[current_position]).index());
            }
            else {
                var hint_element2 = $(all_elements[actual_position]).clone().data("fixedIndex",$(all_elements[current_position]).index());
            }
            $(all_elements[actual_position]).replaceWith(hint_element1);
            $(all_elements[current_position]).replaceWith(hint_element2);
            $(all_elements[actual_position]).removeClass("ls").addClass("correctText");
            swapped="true";
        }
        else {
            return;
        }
    });
}

console.log(name);
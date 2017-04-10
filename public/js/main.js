$(document).ready(function(){
function myCalendar(skip_to = "") {

var month = master_data.months.curr;
var date = d.getUTCDate();
var day = d.getUTCDay();
var tbody_html = "";
var weekday_count = 1;
var tr_count = 1;
var td_count = 1;
var offset_td= 0;
var counter = 1;
var start_of_curr = master_data.day_start.curr;
debug && console.log("Initial: month = " + month + " AND start_of_curr = ", start_of_curr);
if(skip_to!="") {
  switch(skip_to) {
    case "prev":
      month = month-1;
      start_of_curr = master_data.day_start.prev;
      break
    case "next":
      month = month+1;
      start_of_curr = master_data.day_start.next;
      break
  }
  debug && console.log("ALTERED: month "+month+" AND start_of_curr = ", start_of_curr);
}

// Displays the current month in Strings and the actual year 
switch(month) {
	case 0: $('.month-year').html('<h3> ' + 'January' + ' ' +  year + ' </h3>' ); break;
	case 1: $('.month-year').html('<h3> ' + 'February' + ' ' + year + ' </h3>' ); break;
	case 2: $('.month-year').html('<h3> ' + 'March' + ' ' + year + ' </h3>' ); break;
	case 3: $('.month-year').html('<h3> ' + 'April' + ' ' + year + ' </h3>' ); break;
	case 4: $('.month-year').html('<h3> ' + 'May' + ' ' + year + ' </h3>' ); break;
	case 5: $('.month-year').html('<h3> ' + 'June' + ' ' + year + ' </h3>' ); break;
	case 6: $('.month-year').html('<h3> ' + 'July' + ' ' + year + ' </h3>' ); break;
	case 7: $('.month-year').html('<h3> ' + 'August' + ' ' + year + ' </h3>' ); break;
	case 8: $('.month-year').html('<h3> ' + 'September' + ' ' + year + ' </h3>' ); break;
	case 9: $('.month-year').html('<h3> ' + 'October' + ' ' + year + ' </h3>' ); break;
	case 10: $('.month-year').html('<h3> ' + 'November' + ' ' + year + ' </h3>' ); break;
	case 11: $('.month-year').html('<h3> ' + 'December' + ' ' + year + ' </h3>' ); break;
	default:
	break;

}

//Building the calendar body
while (counter <= daysOfMonth[month]) {
  if(weekday_count === 8) {
   tbody_html +="</tr>";
    weekday_count = 1;
  }
  if(weekday_count === 1) {
    tbody_html += "<tr>";
    tr_count++;
  }
  while(offset_td < start_of_curr) {
  tbody_html += "<td></td>";
    offset_td++;
    weekday_count++;
    td_count++;
  }
  if(month === d.getUTCMonth()) {
    if(counter === date) {
      td_class = "today";
    } else {
      td_class = "currentMonth";
    }
  }
  tbody_html += "<td class='"+td_class+"'>"+counter+"</td>";
  counter++;
  weekday_count++;
  td_count++;
}
while((td_count-1) < (tr_count-1)*7){
  tbody_html += "<td></td>";
  td_count++;
}
$('#calendar_tbody').html(tbody_html);
if(debug) {
  console.log("==== calculation part ======");
  console.log(start_of_curr+" - "+daysOfMonth[master_data.months.prev]+"%7 = "+(start_of_curr - daysOfMonth[master_data.months.prev]%7));
  console.log("=========");
}


//Setting the day
master_data.day_start.curr = start_of_curr;
master_data.day_start.prev = start_of_curr - daysOfMonth[master_data.months.prev]%7;
if(master_data.day_start.prev==0) {
  master_data.day_start.prev = start_of_curr;
}
master_data.day_start.next = weekday_count-1;

//Setting the months
master_data.months.curr = month;
master_data.months.prev = month -1;
master_data.months.next = month +1;
debug && console.log("M A S T E R  D A T A >> >> ", master_data);
//return prev_next;

}

var d = new Date();
var year = d.getUTCFullYear();
var date = d.getUTCDate();
var day = d.getUTCDay();
var month = d.getUTCMonth();


// Global Effect
var master_data = {
  day_start: {
    prev: 0, curr: day - (date%7 - 1) + 7, next: 0 
  },
  months: {
    prev: month-1, curr: month, next: month+1
  }
};


//Getting February Days Including The Leap Year
  if ((year % 100!=0) && (year% 4==0) || (year%400 == 0 )) {
    var febDays = 29;

  } else {
    var febDays = 28;
  }



// Getting The Months and Days of the Week
var weekDayName = ["SUN", "MON", "TUES", "WED", "THURS", "FRI"];
var daysOfMonth = [31, febDays , 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];


var debug = true;
$(document).ready(function(){
  console.clear();
  var d = new Date();
  myCalendar();
  var main_obj = master_data;

  //Navigation Buttons
$('.prev-month').click(function(){
  $('month-year').empty();
  myCalendar("prev"); 
});

$('.next-month').click(function(){
  $('month-year').empty();
  myCalendar("next");
  });
});

});



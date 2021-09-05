
/* Script that deals with the booking of dogs on the RentADog Site
*  @author Sam Royal
*  COSC212 Assignment 1
*/
var bookings = (function () {
    var pub = {};

/* Booking object constuctor    that creates all necessary fields to make a booking.
*  @param {String} name         Name for the Booking
*  @param {String} dogId        Id of the dog booked
*  @param {String} day          Day section of the date the dog was booked for
*  @param {String} month        Month section of the date the dog was booked for
*  @param {String} year         Year section of the date the dog was booked for
*  @param {String} time         Time of dog pickup
*  @param {String} numHours     Duration of booking
*  @param {String} price        price per hour of dog
*  @param {String} nameofDog    Name of booked dog (purely for display purposes)
*/
function BookingObject(name, dogId, day, month, year, time, numHours, price, nameofdog) {
    this.name = name;
    this.dogId = dogId;
    this.day = day;
    this.month = month;
    this.year = year;
    this.time = time;
    this.numHours = numHours;
    this.price = price;
    this.nameofdog = nameofdog;

}
/* Method that retrieves all relevant values for Booking Object,
*  then works out whether time and date is available, and finally
*  stores it in local storage.
 */

function BookingDetails() {
    var BookingObject1 = new BookingObject();
    BookingObject1.name = $(this).parent().parent().find(".name:first").val();
    if(BookingObject1.name === ""){
        alert("Must Enter a name");
        return false;
    }
    BookingObject1.dogId = $(this).parent().parent().attr("id");
    if($(this).parent().parent().find(".datepicker").val()=== ""){
        alert("Must Enter a Date");
        return false;
    }
    BookingObject1.day = $(this).parent().parent().find(".datepicker").val().substring(0, 2);
    BookingObject1.month = $(this).parent().parent().find(".datepicker:first").val().substring(3, 5);
    BookingObject1.year = $(this).parent().parent().find(".datepicker:first").val().substring(6, 10);
    BookingObject1.time = $(this).parent().parent().find(".time-picker:first").val();
    BookingObject1.numHours = $(this).parent().parent().find(".duration-picker:first").val();
    BookingObject1.price = $(this).parent().parent().find(".price:first").text().replace(" per Hour", "");
    BookingObject1.nameofdog = $(this).parent().parent().find(".dogname:first").text();
    if(BookingObject1.time === null){
        alert("Must Enter a Time");
        return false;
    }
    var durationCheck = parseInt(BookingObject1.time.substring(0, 2)) + parseInt(BookingObject1.numHours) + BookingObject1.time.substring(2, 5);
    var found = false;
    var start = false;

    $(this).parent().parent().find(".time-picker>option").each(function () {
        if (durationCheck.length === 4) { // checking whether the time is something like 9:00 rather than 10:00
            durationCheck = '0' + durationCheck;//if so need to add a 0 at the front for compare
        }
        if (BookingObject1.time === this.text) {//check whether start time has been found
            start = true;
        }
        if ((this.text).includes("(unavailable)") && start) {//check whether any times between start time and end time are unavailable
            if (!(found)) {
                alert("Duration goes into someone else's booking!");// if so cannot make this booking as there is a booking in between.
                return false;

            }
        }
        if (durationCheck === this.text) { // check to see if end time is in list of available times
            found = true;
        }

    });
    if (!(found)) {
        alert("You Cannot book this dog for that period of time.");
        return false;
    }

    if (window.localStorage.getItem("booking") === null) {
        window.localStorage.setItem("booking", JSON.stringify([BookingObject1]));
        alert("Dog Booked");
    } else if (JSON.parse(window.localStorage.getItem("booking")).length < 3) {
        var temp = JSON.parse(window.localStorage.getItem("booking"));
        temp.push(BookingObject1);
        window.localStorage.setItem("booking", JSON.stringify(temp));
        alert("Dog Booked");
    } else {
        alert("You can only book 3 dogs at one time!");
    }
}

    pub.setup = function () {
        $(".book").css('cursor', 'pointer').on('click', (BookingDetails));//book button if clicked calls BookingDetail
    };
    return pub;


}());


$(window).on('load', bookings.setup);
$(document).ready(bookings.setup);
/* Script that deals with the displaying
* of available dogs and of available times and booking durations.
*  @author Sam Royal
*  COSC212 Assignment 1
*/

var dogList = (function () {
    var pub = {};

    /*Retrieves all dogs from animals.json,
    inserts all available dogs into dogList.html, and
    * categorises them based on whether they are small,
    * medium, large or big.
     */

    function showDogs() {
        $.getJSON('animals.json', function (data) {
            $.each(data.animals.dogs, function (i, f) {
                if (f.dogSize === "Small") {
                    showDogdetail(i, f, "small");
                }
                if (f.dogSize === "Medium") {
                    showDogdetail(i, f, "medium");
                }
                if (f.dogSize === "Large") {
                    showDogdetail(i, f, "large");
                }
                if (f.dogSize === "Huge") {
                    showDogdetail(i, f, "huge");
                }


            });
        });
    }

    /* Called by showDogs, appends all relevant info to the relevant
    * heading inside doglist.html. Also deals with the available
    * times for booking.
     */
    function showDogdetail(i, f, dogsize) {
        $("." + dogsize).append('<section class ="dogs" id=' + '"' + f.dogId +
            '"' + 'style="display:none">' +
            '<img src =' + '"' + 'images/' +
            (f.dogSize).toLowerCase() + '.jpg' + '" ' +
            ' alt=' + (f.dogSize).toLowerCase() + '>' +
            '<p class = "dogname">' + f.dogName + '</p>' +
            '<p>' + f.dogType + '</p>' +
            '<p>' + f.description + '</p>' +
            '<p>' +
            '$<span class="price" value = f.pricePerHour>' +
            f.pricePerHour + " per Hour" + '</span> ' +
            '<p>' +
            'Name: <input type="text" class="name">' +
            '</p>' +
            '<p>' +
            'Date: <input type="text" class="datepicker">' +
            'Pick up Time: <select name="Time" class="time-picker">' +
            '</select>' +
            'Duration: <select name="Time" class="duration-picker">' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '<option value="6">6</option>' +
            '</select>' +
            '</p>' +
            '<div class ="timeDuration"></div>' +
            '<p>' +
            '<input type="button" value="Book Dog" class="book"> ' +
            '</p>' +
            '</section>');
        $(".datepicker").datepicker({ // Checks whether after a date is selected what booking times are available.
            onSelect: function (dateText) {
                var timeList = ['07:30', '08:00', '08:30', '09:00',
                    '09:30', '10:00', '10:30', '11:00', '11:30',
                    '12:00', '12:30', '13:00', '13:30', '14:00',
                    '14:30', '15:00', '15:30', '16:00', '16:30',
                    '17:00', '17:30', '18:00', '18:30', '19:00'];
                $('#' + f.dogId).find(".time-picker").empty();
                $.getJSON('bookings.json',
                    function (data1) {
                        $.each(data1.bookings.booking, function (j, b) {
                            var id = f.dogId;
                            var x, k, d, date;
                            for (x = 0; x < b.dogId.length; x += 1) {
                                if (id === b.dogId[x]) {
                                    date = (b.pickup.month +
                                        "/" + b.pickup.day +
                                        "/" + b.pickup.year);
                                    if (dateText === date) {
                                        for (k = 0; k < timeList.length; k += 1) {
                                            if (b.pickup.time === timeList[k]) {
                                                for (d = 0; d < parseInt(b.numHours) * 2 + 1; d += 1) {
                                                    if (timeList[k] !== (timeList[k] + "(unavailable)")) {
                                                        timeList[k] = (timeList[k] + "(unavailable)");
                                                    }
                                                    k++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });

                        for (var l = 0; l < timeList.length; l++) {
                            $('#' + f.dogId).find(".time-picker")
                                .append('<option value=' + '"' + timeList[l] +
                                    '"' + '>' + timeList[l] + '</option>');
                        }
                    });

            }
        });
    }


    /* Displays/hides the reviews retrieved from reviews.json
     */
    function showReviews() {
        $.getJSON('reviews.json', function (data) {
            $.each(data, function (i, f) {
                $("#reviewsP").append('<b>' + f.author + '</b>' + ' - ' +
                    f.title + '<br>' + f.reviewcontent + '<br>' + '<br>');
            });
        });
    }


    pub.setup = function () {
        var count = 0;
        showDogs();
        $("h3").css('cursor', 'pointer').click(function () { // show/hide dogs when heading is clicked
            $(this).parent().find(".dogs").toggle();
        });
        $(".showReviews").css('cursor', 'pointer').click(function () {// show/hide reviews on reviews button click
            if (count === 0) {
                showReviews();
                count += 1;
            } else {
                $("#reviewsP").toggle();
            }
        });
    };

    return pub;
}());

$(document).ready(dogList.setup);




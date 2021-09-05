var admin = (function() {
    var pub = {};


    function showBookings() {
        var x;
        $.getJSON('bookings.json', function (data) {
            $.each(data.bookings.booking, function (i, f) {
                $("#currentBookings").append(f.name +'<br>' + 'Dogs Booked: ');
                for (x = 0; x < f.dogId.length; x++) {
                    $("#currentBookings").append(f.dogId[x]+",");
                }
                $("#currentBookings").append('<br>'+"Pickup Day: " +
                    f.pickup.day+"/"+
                    f.pickup.month+"/"+
                    f.pickup.year+'<br>' + 'Pickup Time: '+
                    f.pickup.time);
                $("#currentBookings").append('<br>'+"Duration: "+ f.numHours+' Hours'+'<br>');
                $("#currentBookings").append('<br>');

            });

    });
}







    pub.setup = function() {
        showBookings();
    };

    return pub;
}());

$(document).ready(admin.setup);




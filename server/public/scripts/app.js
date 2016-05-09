$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        var i = 0; //i is used as a class to label each person
        updateDom(2); //initial page append. needs a non 0 number here.
        buildBoxes(); //appends boxes to dom
        highlightBox(2); //initial highlight. needs non 0 number here.
        var timeID = window.setInterval(autoClick, 10000);

        $('.previous').on('click', function(){
          timerStop(); //clears autoscroll on click
          timeID = window.setInterval(autoClick, 10000);
          i--;
          // rolls over the counter when it gets too low
          if (i < 0){
            i = (data.mu.length - 1); //test!
            console.log("you looped to the top!");
          }
          if (i < (data.mu.length - 1)) { //test
            updateDom(1);
            highlightBox(1);
          } else if (i == (data.mu.length - 1)) { //testing adaptability instead of hardcode -21
            updateDom(-(data.mu.length - 1));
            highlightBox(-(data.mu.length - 1));
          }
        });

        $('.next').on('click', function(){
          timerStop();
          timeID = window.setInterval(autoClick, 10000);
          i++;
          if (i > (data.mu.length - 1)){
            i = 0;
            console.log("you looped back!");
          }
          if (i > 0) {
            updateDom(-1);
            highlightBox(-1);
          } else if (i == 0) {
            updateDom(data.mu.length - 1);
            highlightBox(data.mu.length - 1);
          }
        });

        //highlights current selection
        function highlightBox(oldNum) {
          $('.' + (i + 100) ).addClass('altered');
          $('.' + (i + 100 + oldNum) ).removeClass('altered');
        }

        function updateDom(oldNum) {
          $('.' + (i + oldNum)).fadeOut(300, deleter()); //fading removal of previously viewed
          $('#container').append('<div class="people ' + i + '"</div>').hide().fadeIn(300);;
          $('#container').children().last().append('<h3>' + data.mu[i].name + '</h3>');
          $('#container').children().last().append('<p>Github Username: ' + data.mu[i].git_username + '</p>');
          $('#container').children().last().append('<p>Shoutout: ' + data.mu[i].shoutout + '</p>');
        }

        //used by updateDom to remove with a fadeout
        function deleter() {
          $('.people').remove();
        }

        function buildBoxes() {
          for (i = 0; i < data.mu.length; i++) {
            $('#boxes').append('<div class="box ' + (i + 100) + '"></div>');
          }
          i = 0;
        }

        function autoClick() {
          console.log("autoclicked");
          i++;
          if (i > (data.mu.length - 1)){
            i = 0;
            console.log("you looped back!");
          }
          if (i > 0) {
            updateDom(-1);
            highlightBox(-1);
          } else if (i == 0) {
            updateDom(data.mu.length - 1);
            highlightBox(data.mu.length - 1);
          }
        }

        function timerStop(){
          clearInterval(timeID);
        }
      } //success stop
    });
});

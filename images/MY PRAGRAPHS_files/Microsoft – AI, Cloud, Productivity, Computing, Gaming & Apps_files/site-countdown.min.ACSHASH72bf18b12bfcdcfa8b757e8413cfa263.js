$(document).ready(function ()
{
    'use strict';

    var translatedCountDownTimerVariables = $(".countdownbanner").data("count-down-timer-variables");

    function getTimeRemaining(endtime) {

        // Set the date we're counting down to
        var countDownDate = new Date(endtime).getTime();

        // Get the current client time
        var clientDate = new Date().getTime();

        // Find the milliseconds between current server Date and the count down date
        var distanceMS = countDownDate - clientDate;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distanceMS / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distanceMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distanceMS % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distanceMS % (1000 * 60)) / 1000);

        return {
            'total': distanceMS,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeCountdownTimer(clockElement,
    endTime,
    isLargeBannerLayout
    ,hideAfterExpired) {
            var daysSpan = $(clockElement).find('.days');
            var daysLabel = daysSpan.next();
            var hoursSpan = $(clockElement).find('.hours');
            var hoursLabel = hoursSpan.next();
            var minutesSpan = $(clockElement).find('.minutes');
            var minutesLabel = minutesSpan.next();
            var secondsSpan = $(clockElement).find('.seconds');
            var secondsLabel = secondsSpan.next();
            var bannerSection = $(clockElement).parent().parent();
            var timeinterval;
            var isInitialized = false;

            function updateClock() {

                //to show banner if it hits the start datetime
                var distanceMS = getTimeRemaining(endTime);
                var parentContainer = $(clockElement).find('.horizontal-layout');
                daysSpan.html(distanceMS.days);
                daysLabel.text(translatedCountDownTimerVariables[returnLabelText("Day",distanceMS.days)]);
                hoursSpan.html(distanceMS.hours);
                hoursLabel.text(translatedCountDownTimerVariables[returnLabelText("Hour",distanceMS.hours)]);
                minutesSpan.html(distanceMS.minutes);
                minutesLabel.text(translatedCountDownTimerVariables[returnLabelText("Minute",distanceMS.minutes)]);
                secondsSpan.html(distanceMS.seconds);
                secondsLabel.text(translatedCountDownTimerVariables[returnLabelText("Second",distanceMS.seconds)]);

                if (distanceMS.total <= 0)
                {
                    clearInterval(timeinterval);
                    if(hideAfterExpired)
                    {
                        bannerSection.hide();
                    }
                    else
                    {
                        $(parentContainer).find('.countdownbanner').hide();
                        var completedText = $(parentContainer).find('.countdown-completed-content');
                        completedText.show();
                        var alertDiv = $(parentContainer).closest('.alert');
                        alertDiv.removeAttr("data-mount");
                        alertDiv.css({'cursor' :"default"});
                    }

                }
                else if(distanceMS.total<=3600000)//display different text for final one hour
                {
                    $(parentContainer).find('.timer').html(translatedCountDownTimerVariables["expires in less than an hour"]);
                }
            }
            function returnLabelText(singularText,value)
            {
                return singularText+((value>1)?"s":"");
            }
            updateClock();
            timeinterval = setInterval(updateClock, 1000);
            isInitialized = true;
        }

	    var instances = $('[component-type="coreui-sitebanner"]');
        if (instances.length > 0)
        {
                // check if is first module for padding
            for (var count = 0; count < instances.length; count++)
            {
                 var instance = instances[count];
                 var clockDiv = $(instance);

                 // Calculate date we're counting down to
                 var targetDateString = $(instance).data('sitebanner-targetdate');
                 var endTime = new Date(targetDateString).getTime();
                 var clientDateTime = new Date().getTime();
                 var hideAfterExpired = $(instance).attr('hideafterexpired')==undefined?false:true;

                 // Initialize the countdown timer
                 initializeCountdownTimer(instance, endTime, false,hideAfterExpired);
            }
        }
    }
);

$(() => {
  let alertThemer = document.querySelectorAll(".alertThemer")
  alertThemer.forEach(function(item) {
    let enableScheduleControl = item.getAttribute("data-enable-schedule-control")
    if (enableScheduleControl === "true") {
      let startDateArray = item.getAttribute("data-start-date")?.split(/[- :]/).map(Number)
      let endDateArray = item.getAttribute("data-end-date")?.split(/[- :]/).map(Number)

      if (startDateArray && endDateArray && startDateArray.length > 0 && endDateArray.length > 0 ) {
        let startDate = Date.UTC(startDateArray[0],startDateArray[1] - 1, startDateArray[2], startDateArray[3], startDateArray[4])
        let endDate = Date.UTC(endDateArray[0],endDateArray[1] - 1, endDateArray[2], endDateArray[3], endDateArray[4] )
        let now = Date.now()

        if (startDate <= now && now < endDate) {
          console.log("displaying component")
        } else {
          item.remove()
        }
      }
    }
  })
})

'use strict';
function truncateTextInMobile(el){
  const divCollapse = el.parentElement;
  const fullParagraph = divCollapse.querySelector(".alert-description-full");
  const toggleParagraph = divCollapse.querySelector(".alert-description-truncated");
  const btnCollapse = divCollapse.querySelector(".btn.btn-collapse.alert-btn");
  if (btnCollapse.classList.contains('expanded')){
    btnCollapse.classList.remove('expanded');
    toggleParagraph.classList.remove('active');
    fullParagraph.classList.add('active');
  }else{
    btnCollapse.classList.add('expanded');
    toggleParagraph.classList.add('active');
    fullParagraph.classList.remove('active');
  }
};   


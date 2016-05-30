// clock.js
var cur_min = (new Date()).getMinutes();

var n = 60 - cur_min;

var beeper_alarmInfo = {
    when: (Date.now() + n * 60000),
    //when: (Date.now() + 2000),
    periodInMinutes: 60
};

var beeper_alarm;

var create_beeper = function() {
    console.log('beeper created!!!');
    chrome.alarms.create('beeper', beeper_alarmInfo);
}

var showTimeCheck = function() {
    hideTimeCheck(function() {
        chrome.notifications.create('beeper_notice', {
            iconUrl: chrome.runtime.getURL('hour-glass.png'),
            title: 'Time Check!!!',
            type: 'basic',
            message: '',
        }, function() {});

    });
}

function say_elapsed(beeper_elapsed){
    console.log('Got alarm', beeper_elapsed);
    if(beeper_elapsed.name == 'beeper'){
        showTimeCheck();
        setTimeout(hideTimeCheck, 3000);
    }
}

function hideTimeCheck(done) {
  chrome.notifications.clear('beeper_notice', function() {
    if (done) done();
  });
}

create_beeper();
chrome.alarms.onAlarm.addListener(say_elapsed);

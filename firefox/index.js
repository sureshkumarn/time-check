var self = require("sdk/self");

var data = self.data;

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "nskweb-link",
  label: "Visit nskweb",
  icon: {
    "16": "./clock-16.png",
    "32": "./clock-32.png",
    "64": "./clock-64.png"
  },
  onClick: handleClick
});

var text_entry = require('sdk/panel').Panel({
	contentURL: data.url('clock.html'),
	contentScriptFile: data.url('get-text.js')
});

var beep_interval = 60; // 60 minutes

var  cur_mins = (new Date()).getMinutes();

var beeper_interval;
if(!cur_mins){ // if current minutes is 0
	beeper_interval = setInterval(displayBeeper,3600000);
} else { // else if current minutes is something else
	setTimeout(function(){
		beeper_interval = setInterval(displayBeeper,3600000);
	},(60-cur_mins)*60000);
};

function displayBeeper(state){
	text_entry.show();
}

function handleClick(state) {
  text_entry.show();
};

text_entry.on("show",function(){
	text_entry.port.emit("show");
});



text_entry.port.on("text-entered", function (text) {
  beep_interval = text;
  text_entry.hide();
});

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
};

exports.dummy = dummy;

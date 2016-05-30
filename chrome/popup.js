// Says about next beep
var cur_min = (new Date()).getMinutes();
var n = 60 - cur_min;
var $ = document.getElementById.bind(document);
$('remaining').textContent = n;

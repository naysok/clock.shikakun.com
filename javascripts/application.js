var status, timerInterval, currentProgress, currentSec, countSec = 180;

var urlQueryParam = function (name) {
  var vars = {};
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }
  return vars[name];
};

if (!isNaN(urlQueryParam('sec'))) {
  countSec = urlQueryParam('sec');
}

$(function () {
  setStatus('off');
  print(countSec);

  $('#button-minus').click(function () {
    countSec = countSec - 60;
    print(countSec);
  });

  $('#button-plus').click(function () {
    countSec = countSec + 60;
    print(countSec);
  });

  $('#button-minus-sec').click(function () {
    countSec = countSec - 30;
    print(countSec);
  });

  $('#button-plus-sec').click(function () {
    countSec = countSec + 30;
    print(countSec);
  });

  // Super reload
  $('#button-reset').click(function () {
    window.location.reload(true);
    print("reload");
  });

  $('#time').click(function () {
    touch();
  });
});

function touch() {

  if (status === 'on') {
    setStatus('off');

    $('.button').show();
    $('.credit-show').show();

    clearInterval(timerInterval);
    print(countSec);
  } else {
    setStatus('on');
    
    $('.button').hide();
    $('.credit-show').hide();

    currentSec = countSec;
    timer();
    timerInterval = setInterval("timer()", 1000);
  }
}

function timer() {
  if (currentSec <= 0) {
    
    // Stop
    // clearInterval(timerInterval);

    // Count up
    currentProgress = Math.round((1 - currentSec / countSec) * 100);
    
    $('#view').addClass('over');
  } else {
    currentProgress = Math.round((1 - currentSec / countSec) * 100);
    $('#view').css('background-size', currentProgress + '% 100%');
  }

  print(currentSec);
  currentSec--;
}

function print(sec) {
  
  console.log(["Sec :", sec])

  var s = sec % 60;
  var m = (sec - s) / 60;

  var time = keepLengthMin(m, sec) + ':' + keepLengthSec(s);
  
  console.log(["Timer :", time])

  $('#time').html(time);
  document.title = "Timer : " + time;
}

function setStatus(param) {
  status = param;
  $('#view').attr('class', param);
}

function keepLengthMin(num, sec) {

  if (sec < 0){

    var num = Math.abs(num)
    var num = String(num);
    // console.log(num)
  
    while (num.length < 2) {
      num = '0' + num;
    }
  
    num = "-" + num
    return num;

  } else {

    var num = Math.abs(num)
    var num = String(num);
    // console.log(num)
  
    while (num.length < 2) {
      num = '0' + num;
    }

    return num;
  }
}

function keepLengthSec(num) {

  var num = Math.abs(num)
  var num = String(num);
  // console.log(num)

  while (num.length < 2) {
    num = '0' + num;
  }

  return num;
}
let alarmlist = [];
document.getElementById("sub").addEventListener("click", setAlarm);
var list = document.getElementById("list");

function getTime(hours, min, sec) {
  hours = (hours < 10 ? "0" : "") + hours;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  var time = hours + ":" + min + ":" + sec;
  return time;
}

//check for the alarm

const checkAlarm = () => {
  const currentTime = new Date();

  alarmlist.forEach((alarm) => {
    const [alarmTime, alarmZone] = alarm.text.split(" ");
    const [alarmHours, alarmMinutes, alarmSeconds] = alarmTime.split(":");

    const hours = parseInt(alarmHours) + (alarmZone === "PM" ? 12 : 0);
    const minutes = parseInt(alarmMinutes);
    const seconds = parseInt(alarmSeconds);

    const alarmDateTime = new Date();
    alarmDateTime.setHours(hours);
    alarmDateTime.setMinutes(minutes);
    alarmDateTime.setSeconds(seconds);

    if (currentTime >= alarmDateTime) {
      window.alert("Time's Up!!");
      deleteAlarm(alarm.id);
    }
  });
};


// Delete alarm
function deleteAlarm(alarmId) {
  console.log("Delete the Alarm");
  const newAlarm = alarmlist.filter((alarm) => {
    return alarm.id !== alarmId;
  });

  alarmlist = newAlarm;
  renderAlarm();
}

//display alarm

function renderAlarm() {
  list.innerHTML = "";
  for (let i = 0; i < alarmlist.length; i++) {
    var drop = document.createElement("li");
    drop.innerHTML = `
    <label>${alarmlist[i].text}</label>
    <button onClick="deleteAlarm(this.dataset.id)" data-id=${alarmlist[i].id}>DELETE</button>
    `;
    list.append(drop);
  }
}

//Set Alarm

function setAlarm(event) {
  event.preventDefault();

  const { hour, min, sec, zone } = document.forms[0];
  var text = getTime(hour.value, min.value, sec.value) + " " + zone.value;
  let alarm = {
    text,
    id: Date.now().toString(),
  };
  alarmlist.push(alarm);
  renderAlarm();
}

//Get current time

function currentTime() {
  const date = new Date();
  var hours = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var zone = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;

  var time = getTime(hours, min, sec);
  var currTime = document.getElementById("currTime");
  currTime.innerHTML = getTime(hours, min, sec) + " " + zone;

  checkAlarm();
}

setInterval(currentTime, 1000);

/*

Send email and add to task


TODO
- create task (use subject for title, body(1st line?) for detail)
- organize the files


REFERENCE
https://developers.google.com/apps-script/advanced/tasks
https://github.com/googlesamples/apps-script/tree/master/simple_tasks
*/

function productionMain() {
  try{
    const taskId = getTaskId("Alwaysgoogle");
    const validSubject = getValidSubject();
    const emails = searchThreads(validSubject);
    
    //    var task = {
//      tite: 'Pick up dry cleaning',
//      notes: 'Remember to get this done!'
//    };
//    addTask(task, taskId);
    Logger.log("done");
  } catch (e) {
    var msg = e.message;
    Logger.log("[ERROR] " + msg);
  }
}


/** Gmail **/
function searchThreads(validSubject, durationMin) {
  if (typeof durationMin === "undefined") {
    durationMin = 20;
  }
  
  const t = GmailApp.getInboxThreads(0,100);
  const tlen = t.length;
  var validEmails = [];
  for (var i = 0; i < tlen; i++) {
    var messages = t[i].getMessages();
    var mlen = messages.length;

    for (var j=0; j<mlen; j++) {
      var message = messages[j];
      if (!checkDuration(message.getDate(), durationMin) ) { 
        Logger.log("Id: " + message.getId() + " is older " + durationMin + " min. Ignored.");
        continue;
      }
      
      var subject = message.getSubject();
      if (!isValidSubject(subject)) {
        continue;
      }
      const validEmail = {
        "subject" : subject
        ,"body": message.getPlainBody()
        ,"date": message.getDate()
        ,"from": message.getFrom()
        ,"id":message.getId()
      }
      validEmails.push(validEmail);
    }
  }
  return validEmails;
}

function searchMessages(m) {

}


function isValidSubject(subject) {
  const valid = getValidSubject();
  return (subject.indexOf(valid) === 0)
}

function checkDuration(date, durationMin) {
  var durationMsec = durationMin * 60 * 1000;
  var nowDate = new Date();  //TODO: only one time
  var nowUnixTime = nowDate.getTime();
  var dateUnixTime = date.getTime();
  var unixTimeDiff = nowUnixTime - dateUnixTime;
  return ( unixTimeDiff < durationMsec);
}


function retrieveValidEmails(validAddress, durationMin, durationMinCleanTag) {
  if (typeof durationMinCleanTag === "undefined") { durationMinCleanTag = 60*24*1; }
  var validEmails = [];
  var threads = GmailApp.getInboxThreads(0,100);
  var tlen = threads.length;
  for (var i = 0; i < tlen; i++) {
    var messages = threads[i].getMessages();
    var mlen = messages.length;

    if (!checkDuration(messages[0].getDate(), durationMinCleanTag) ) {
      if (clearLabels(threads[i])) {
        Logger.log("Id: " + messages[0].getId() + " is older " + durationMinCleanTag + " min. Tag cleared.");
      }
    }

    if (!checkDuration(messages[0].getDate(), durationMin) ) { 
      Logger.log("Id: " + messages[0].getId() + " is older " + durationMin + " min. Ignored.");
      continue;
    }

    for (var j=0; j<mlen; j++) {
      validEmails = retrieve(messages[j], threads[i], validAddress, validEmails);
    }
  }
  return validEmails;
}

/** Task **/
function getTaskId(name) {
  const taskLists = Tasks.Tasklists.list();
  if (taskLists.items) {
    for (var i = 0; i < taskLists.items.length; i++) {
      var taskList = taskLists.items[i];
      var taskName = taskList.title;
      if (name.toLowerCase() === taskName.toLowerCase()) {
        return taskList.id;
      }
    }
  }
  return "";
}


function addTask(task, taskListId) {
  var title = task["title"];
  if (typeof title === "undefined") {
    throw new UserException("task is not valid");
  }
  
  var ret = Tasks.Tasks.insert(task, taskListId);
  Logger.log('Task with ID "%s" was created.', task.id);
}

function createTask(message) {
  var task = {};
  task["title"] = message.getPlainBody()
}

/** Exception **/
function UserException(message) {
   this.message = message;
   this.name = "UserException";
}
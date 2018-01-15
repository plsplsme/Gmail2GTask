function myFunction() {
  
}


function getValidSubject() {
  const v = PropertiesService.getScriptProperties().getProperty('VALID_SUBJECT');
  return v;
}

function getTaskListName() {
  const v = PropertiesService.getScriptProperties().getProperty('TAKS_LIST_NAME');
  return v;
}


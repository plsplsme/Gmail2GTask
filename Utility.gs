function myFunction() {
  
}

function stringToArray(str) {
  var reg=/(\r\n|\r|\n)/;
  var strArray = str.split(reg);
  return strArray;
}

function error(str, isEmail) {
  if (typeof isEmail === "undefined") {
    isEmail = false;
  }

  Logger.log("[ERROR]"+str)
  if (isEmail) {
    sendEmail(getAdminMailTo(), "[ERROR]FormToPdf", str );
  }
}
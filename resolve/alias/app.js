var moment = require("moment");

document.getElementById("container").textContent = moment().locale('zh-cn').format('LLLL');
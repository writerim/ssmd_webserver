const { StartServerCron } = require("./server_cron")
const { StartServerIssues } = require("./server_issues")

module.exports = {
    Start : function(){
        StartServerCron()
        StartServerIssues()
    }
}
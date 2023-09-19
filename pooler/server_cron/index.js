const Session = require("../entity/session");
const Issue = require("../entity/issue");
const {
    Issues
} = require("../server_issues");

var events = require('events');
const { CMD_TEST_MODE_CLOSE, CMD_TEST_MODE_TIMEOUT, CMD_TEST_MODE_ERROR } = require("../contsants/issue");

const ForeachIssues = function(){
    Issues.forEach((issue,index) => {

        let session_e = new events.EventEmitter();

        if (!(issue instanceof Issue)) {
            Issues.splice(index, 1);
            return;
        }
        if (!issue.Cmd) {
            Issues.splice(index, 1);
            return;
        }

        if (issue.Session || issue.Running) {
            return;
        }

        if (issue.NextRunnning.getTime() > (new Date).getTime()) {
            return;
        }

        issue.CountRepeat =+ 1

        session_e.on('close', (e) => {
            issue.CountRepeat = 0
            issue.CountSuccessClosed =+ 1
            issue.Running = false
            issue.session = undefined

            console.log(`Close Issue:`, e)

            session_e.removeAllListeners()
        }).on('timeout', (e) => {
            issue.Running = false
            issue.session = undefined

            console.log(`Timeout Issue:`, e)
            
            session_e.removeAllListeners()
        }).on('error', (e) => {
            Issues.splice(index, 1);
            issue.Running = false
            issue.session = undefined
            
            console.log(`Error Issue:`, e)
            
            session_e.removeAllListeners()
        }).on('start', (e) => {
            issue.Running = true
        });
        
        issue.session = new Session(issue, issue.Device, [], session_e )
        
        if(issue.Cmd == CMD_TEST_MODE_CLOSE){
            session_e.emit('close', new Error('ForeachIssues: close by emulate CLOSE'))
        }
        if(issue.Cmd == CMD_TEST_MODE_TIMEOUT){
            session_e.emit('timeout', new Error('ForeachIssues: close by emulate TIMEOUT'))
        }
        if(issue.Cmd == CMD_TEST_MODE_ERROR){
            session_e.emit('error', new Error('ForeachIssues: close by emulate ERROR'))
        }
    });
}

module.exports = {
    Start: function () {
        setInterval(function () {
            ForeachIssues()
        }, 100)
    },
    ForeachIssues
}
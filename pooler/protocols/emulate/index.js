function ParseData(){}
function PackData(){}
function Start(issue){
    console.log(issue, 'start_issue')
}

module.exports = class Protocol{
    constructor(e){
        this.e = e
    }
    ParseData = function(){}
    PackData = function(){}
    Start = function(){}
    e = null
}
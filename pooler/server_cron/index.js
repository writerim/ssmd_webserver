const Issues = []

const ForeachIssues = function () {
    
}

module.exports = {
    Start: function (e) {
        setInterval(function () {
            ForeachIssues(e)
        }, 100)
    },
}
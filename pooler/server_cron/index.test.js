const { ForeachIssues } = require('.');
const { CMD_TEST_MODE_CLOSE, GET_ACTUAL_DATA, CMD_TEST_MODE_TIMEOUT, CMD_TEST_MODE_ERROR } = require('../contsants/issue');
const Device = require('../entity/device');
const Issue = require('../entity/issue');
const {
    Issues
} = require("../server_issues");

const assert = require('assert').strict;

describe("Server cron", function () {

    it('incorrect data. null device id', async function () {
        Issues.length = 0
        Issues.push(new Issue('', [], new Device()))

        ForeachIssues()

        assert.equal(Issues.length, 0)
    })

    it('incorrect data. null device args', async function () {
        Issues.length = 0
        Issues.push(new Issue('', [], null))

        ForeachIssues()

        assert.equal(Issues.length, 0)
    })


    it('incorrect data. null device args 2', async function () {
        Issues.length = 0
        Issues.push(new Issue('', []))

        ForeachIssues()

        assert.equal(Issues.length, 0)
    })

    it('incorrect data. null device mod', async function () {
        Issues.length = 0
        Issues.push(new Issue('', [], new Device(10)))

        ForeachIssues()

        assert.equal(Issues.length, 0)
    })


    it('incorrect data. empty issue cmd', async function () {
        Issues.length = 0
        Issues.push(new Issue('', [], new Device(10, 9, 'emulate')))

        ForeachIssues()

        assert.equal(Issues.length, 0)
    })

    it('incorrect data. not supported command', async function () {
        Issues.length = 0
        Issues.push(new Issue('get_not_supported data', [], new Device(10, 9, 'emulate')))

        ForeachIssues()

        assert.equal(Issues.length, 0)
    })

    it('correct data. doudle running', async function () {
        Issues.length = 0
        Issues.push(new Issue(GET_ACTUAL_DATA, [], new Device(10, 0, 'emulate')))

        ForeachIssues()
        ForeachIssues()

        assert.equal(Issues.length, 1)
        assert.equal(Issues[0].CountRepeat, 1)
        assert.equal(Issues[0].CountSuccessClosed, 0)
        assert.equal(Issues[0].Error, null)
        assert.equal(Issues[0].Blocked, false)
        assert.equal(Issues[0].Running, false)
    })
    it('correct data. close connect', async function () {

        Issues.length = 0
        Issues.push(new Issue(CMD_TEST_MODE_CLOSE, [], new Device(10, 0, 'emulate')))

        ForeachIssues()
        assert.equal(Issues.length, 1)
        assert.equal(Issues[0].CountRepeat, 0)
        assert.equal(Issues[0].CountSuccessClosed, 1)
        assert.equal(Issues[0].Error, null)
        assert.equal(Issues[0].Blocked, false)
        assert.equal(Issues[0].Running, false)

    })
    it('correct data. timeout connect', async function () {

        Issues.length = 0
        Issues.push(new Issue(CMD_TEST_MODE_TIMEOUT, [], new Device(10, 0, 'emulate')))

        ForeachIssues()
        assert.equal(Issues.length, 1)
        assert.equal(Issues[0].CountRepeat, 1)
        assert.equal(Issues[0].CountSuccessClosed, 0)
        assert.equal(Issues[0].Error, null)
        assert.equal(Issues[0].Blocked, false)
        assert.equal(Issues[0].Running, false)

    })
    it('correct data. error connect', async function () {

        Issues.length = 0
        Issues.push(new Issue(CMD_TEST_MODE_ERROR, [], new Device(10, 0, 'emulate')))

        ForeachIssues()
        assert.equal(Issues.length, 0)

    })

})
require('should');
var command = require(__dirname + '/mock/command')('doc');
var doc = require(__dirname + '/../command/doc');

describe('Testes do comando doc', function() {
    it('!doc vm', function(done) {
        command('!doc vm', function(output) {
            output.should.equal(
                '#canaldomeubot: test, ' +
                'module vm --> ' + (
                'You can access this module with:      ' +
                'var vm = require(\'vm\');  JavaScript code can ' +
                'be compiled and run immediately or compiled, ' +
                'saved, and run later.'
                ).slice(0, doc.TRIM_LIMIT) +
                '... http://nodejs.org/api/vm.html#vm_executing_javascript' +
                '\n'
            );
            done();
        });
    });

    it('!doc vm.runInNewContext', function(done) {
        command('!doc vm.runInNewContext', function(output) {
            output.should.equal(
                '#canaldomeubot: test, ' +
                'method vm.runInNewContext --> ' + (
                '`vm.runInNewContext` compiles `code`, then runs it ' +
                'in `sandbox` and returns the result. Running code ' +
                'does not have access to local scope. The object ' +
                '`sandbox` will be used as the global object for ' +
                '`code`. `sandbox` and `filename` are optional, ' +
                '`filename` is only used in stack traces.  '+
                'Example: compile and execute code that increments ' +
                'a global variable and sets a new one. These ' +
                'globals are contained in the sandbox.      ' +
                'var util = require(\'util\'),         ' +
                'vm = require(\'vm\'),         sandbox = {' +
                '           animal: \'cat\',           ' +
                'count: 2         };          vm.runInNewContext' +
                '(\'count += 1; name = "kitty"\', sandbox, \'myfile' +
                '.vm\');     console.log(util.inspect(sandbox));' +
                '          // { animal: \'cat\', count: 3, name: ' +
                '\'kitty\' }  Note that running untrusted code ' +
                'is a tricky business requiring great care.' +
                ' To prevent accidental global variable leakage,' +
                ' `vm.runInNewContext` is quite useful,' +
                ' but safely running untrusted code requires a' +
                ' separate process.  In case of syntax error in ' +
                '`code`, `vm.runInNewContext` emits the syntax ' +
                'error to stderr and throws an exception.'
                ).slice(0, doc.TRIM_LIMIT) +
                '... http://nodejs.org/api/vm.html' +
                '#vm_vm_runinnewcontext_code_sandbox_filename' +
                '\n'
            );
            done();
        });
    });

    it('!doc http.ServerResponse', function(done) {
        command('!doc http.ServerResponse', function(output) {
            output.should.equal(
                '#canaldomeubot: test, ' +
                'class http.ServerResponse --> ' + (
                'This object is created internally by a HTTP ' +
                'server--not by the user. It is passed as the ' +
                'second parameter to the `\'request\'` event.  ' +
                'The response implements the \\[Writable Stream\\]' +
                '\\[\\] interface. This is an \\[EventEmitter\\]\\[\\] ' +
                'with the following events:'
                ).slice(0, doc.TRIM_LIMIT) +
                '... http://nodejs.org/api/http.html' +
                '#http_class_http_serverresponse' +
                '\n'
            );
            done();
        });
    });

    it('!doc process', function(done) {
        command('!doc process', function(output) {
            output.should.equal(
                '#canaldomeubot: test, global process --> ' +
                'The `process` object is a global object and can be ' +
                'accessed from anywhere. It is an instance of \\[Ev... ' +
                'http://nodejs.org/api/process.html#process_process' +
                '\n'
            );
            done();
        });
    });
});

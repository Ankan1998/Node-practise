const yargs = require('yargs');

// Customize yargs
yargs.command({
    command: 'add',
    describe: 'Add a Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Content of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(){
        console.log('Title: ' + yargs.argv.title)
        console.log('Body: ' + yargs.argv.body)
    }
});
yargs.parse()




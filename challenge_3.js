const yargs = require('yargs');
// Customize yargs
yargs.command({
    command: 'add',
    describe: 'Add a Note',
    handler: function(){
        console.log("Adding a note")
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    handler: function(){
        console.log("Removing a note")
    }
});

yargs.command({
    command: 'list',
    describe: 'Add a list',
    handler: function(){
        console.log("Adding a list in note")
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a list',
    handler: function(){
        console.log("Reading a note")
    }
});

console.log(yargs.argv);

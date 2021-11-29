
const forecast  = require('./challenge_9_callback_abstraction')
const k = ''
forecast(-75.7088, 44.1545,k ,(error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })
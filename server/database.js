const mongoose=require('mongoose');
const URI='mongodb://nacho:admin123@ds155815.mlab.com:55815/control';
mongoose.connect(URI,{ useNewUrlParser: true, useCreateIndex:true })
    .then(db=> console.log('Db is connected'))
    .catch(err=> console.error(err));
module.exports=mongoose;
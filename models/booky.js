var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Booky', 
  (new Schema( {
    title : { 
      type: String, 
      min: 6, 
      index: true 
    },
    href : {
      type: String,
      match: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    },
    from : {
      type: String,
      min: 6
    },
    image : {
      type: String
    },
    date :{
      type: Date, default: Date.now
    }
  }))
)  

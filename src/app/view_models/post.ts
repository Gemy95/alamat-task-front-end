export class Post {
    constructor(
       public _id ?:String,
       public image?:String,
       public address?:String,
       public floorNumber?:Number,
       public roomNumber?:Number,
       public roomLength?:Number,
       public roomWidth?:Number,
       public date?:Date,
       public price?:Number,
    ){

    }
}

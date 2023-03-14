const {model, Schema} =require("mongoose")

const boardSchema = new Schema(
    {
        name:{
            type: String,
            required:[true,"a name is required"],
            lowercase:true,
            trim:true,
        },
        participants:[{
            type: Schema.Types.ObjectId,
            ref:"User"
        }],
        author:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
       
    },
    {
        timestamps:true,
    }
);

const  Board = model ("Board",boardSchema)

module.exports = Board
const {model, Schema} =require("mongoose")

const noteSchema = new Schema(
    {
        title:{
            type:String,
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        checklist:[{
            item:{
                type:String
            },
            isChecked:{
                type:Boolean,
                default:false,
            },              

        }],
        deadline:{
            type:Date,            

        },
        author:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        board:{
            type: Schema.Types.ObjectId,
            ref:"Board"

        },
                   
        
    },
    {
        timestamps:true,
    }
);

const  Note = model ("note",noteSchema)

module.exports = Note
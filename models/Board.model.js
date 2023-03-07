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
        notes:[{
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
                default:new Date()

            },
            author:{
                type: Schema.Types.ObjectId,
                ref:"User"
            },            
            
        },
        {
            timestamps:true,
        }
    ]

    },
    {
        timestamps:true,
    }
);

const  Board = model ("Board",boardSchema)

module.exports = Board
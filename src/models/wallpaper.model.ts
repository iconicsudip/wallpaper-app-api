import mongoose from "mongoose";

const wallpaperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required:true
    },
    category: {
        type: Array<mongoose.Schema.Types.ObjectId>(),
        ref: 'Category',
        default:[],
        unique: true
    },
    tags: {
        type: Array<String>(),
        default: []
    }
},{
    timestamps: true
});

const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);

export default Wallpaper;
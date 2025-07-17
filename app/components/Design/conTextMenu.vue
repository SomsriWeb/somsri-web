<script>
const c = console.log.bind();
export default {
    emits: ['paste','copy','delete','bringForward','bringBackward'],
    props: {
        imgFile: {
            type: Array,
            required: false,
            default: [],
        },
        conTextActive:{
            type:Boolean,
            required: false,
            default:false,
        },
        coppyActive:{
            type:Boolean,
            required: false,
            default:false,
        },
    },
    data(){
        return{
            objectData: [],

            coppy:[],
        }
    },  
    methods: {
        test(val) {
            c(val)
        },
        checkItemActive(){
            console.log("AAA")
            // let activeObject = canvas.getActiveObject();
            // if (activeObject && activeObject.type !== "activeSelection") {
            //     console.log("AAA")
            // }
        },  
    },
    mounted() {
        this.checkItemActive()
    }
}
</script>

<template>
    <div class="bg-light p-1 rounded shadow" style="width:max-content;" >
        <div class="row p-2 " :class="{'conTextMenuItem-false' :!conTextActive,'conTextMenuItem' :conTextActive}"  @click="$emit('Cut')">
            <span class="material-symbols-rounded col-2">cut</span>
            <span class="col-10">Cut</span>
        </div>
        <div class="row p-2 " :class="{'conTextMenuItem-false' :!conTextActive,'conTextMenuItem' :conTextActive}" @click="$emit('copy')">
            <span class="material-symbols-rounded col-2">file_copy</span>
            <span class="col-10">Copy</span>
        </div>
        <div class="row p-2 " :class="{'conTextMenuItem-false' :!coppyActive,'conTextMenuItem' :coppyActive}" @click="$emit('paste', coppy)">
            <span class="material-symbols-rounded col-2">content_paste</span>
            <span class="col-10">Paste</span>
        </div>
        <div class="row p-2 " :class="{'conTextMenuItem-false' :!conTextActive,'conTextMenuItem' :conTextActive}" @click="$emit('bringForward')">
            <span class="material-symbols-rounded col-2">flip_to_front</span>
            <span class="col-10">Bring to Front</span>
        </div>
        <div class="row p-2 " :class="{'conTextMenuItem-false' :!conTextActive,'conTextMenuItem' :conTextActive}" @click="$emit('bringBackward')">
            <span class="material-symbols-rounded col-2">flip_to_back</span>
            <span class="col-10">Bring to Back</span>
        </div>
        <hr class="m-0 p-0">
        <div class="row p-2 " :class="{'conTextMenuItem-false' :!conTextActive,'conTextMenuItem' :conTextActive}" @click="$emit('delete')">
            <span class="material-symbols-rounded col-2" >delete</span>
            <span class="col-10">delete</span>
        </div>
        <!-- <div class="d-flex justify-content-between">
                    </div> -->
    </div>
</template>

<style>
.conTextMenuItem {
    cursor: pointer;
}

.conTextMenuItem:hover {
    padding: 0%;
    margin: auto;
    background-color: #F1F1F1;
}

.conTextMenuItem:last-of-type:hover {
    background-color: #FDE6E6;
    color: red;
}

.conTextMenuItem-false:nth-child(even),.conTextMenuItem-false:nth-child(odd){
    padding: 0%;
    margin: auto;
    cursor: default;
    background-color: #F3F5F7;
    color: slategray;
}
</style>

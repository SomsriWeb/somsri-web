<script>
import Folder from '../assets/js/folder'
export default {
    name: 'LayersComponent',
    emits: ['layerActive', 'selectData'],
    props: {
        imgFile: {
            type: Array,
            required: false,
            default: [],
        },
        layerActive: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data() {
        return {
            isDragging: false,
            input_file_accept: "image/jpeg, image/png",
            draggingIndex: null,
            shiftKeyDown: false,
        };
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    },
    created() {
        for (let i = 0; i < this.imgFile.length; i++) {
            this.imgFile[i].selectedFiles = false;
        }
    },
    methods: {
        getFile(id) {
            const filesInput = document.getElementById(id).files;
            for (let i = 0; i < filesInput.length; i++) {
                const files = filesInput[i];
                const name = files.name.slice(0, files.name.lastIndexOf('.'));
                this.imgFile.push({
                    name: name,
                    index: this.imgFile.length,
                    file: files,
                    url: URL.createObjectURL(files),
                    showImage: true,
                    lockLayers: false,
                    selectedFiles: false,
                    typeof: "File",
                    showFolder: false,
                });
            }

            // console.log(this.imgFile)
        },
        openUploadInput(elementId) {
            let element = document.getElementById(elementId);
            element.click();
        },
        remove(index, indexinFolder) {
            if (indexinFolder === -1) {
                this.imgFile.splice(index, 1);
            } else {
                this.imgFile[index].files.splice(indexinFolder, 1);
                if (this.imgFile[index].files.length === 0) {
                    this.imgFile.splice(index, 1);
                }
            }

        },
        dragStart(index) {
            this.imgFile[index].showFolder = false;
            this.draggingIndex = index;
        },
        dragOver(index, indexinFolder) {
            if (this.draggingIndex === null || index === null) {
                return;
            }
            if (indexinFolder > -1) {
                const draggingItem = this.imgFile[index].files[this.draggingIndex];
                if (this.draggingIndex > indexinFolder) {
                    this.imgFile[index].files.splice(this.draggingIndex, 1);
                    this.imgFile[index].files.splice(indexinFolder, 0, draggingItem);
                } else {
                    this.imgFile[index].files.splice(indexinFolder + 1, 0, draggingItem);
                    this.imgFile[index].files.splice(this.draggingIndex, 1);
                }
                this.draggingIndex = indexinFolder;
            }
            else {
                if (indexinFolder === -1) {
                    const draggingItem = this.imgFile[this.draggingIndex];
                    this.imgFile.splice(this.draggingIndex, 1);
                    this.imgFile.splice(index, 0, draggingItem);
                    this.draggingIndex = index;
                }
            }
        },
        dragEnd() {
            this.draggingIndex = null;
        },
        imgShow(index, indexinFolder) {
            if (indexinFolder > -1) {
                this.imgFile[index].files[indexinFolder].showImage = !this.imgFile[index].files[indexinFolder].showImage;
            }
            else {
                this.imgFile[index].showImage = !this.imgFile[index].showImage;
            }
            if (this.imgFile[index].typeof === 'Folder' && indexinFolder === -1) {
                if (this.imgFile[index].showImage) {
                    for (let i = 0; i < this.imgFile[index].files.length; i++) {
                        this.imgFile[index].files[i].showImage = true;
                    }
                }
                else {
                    for (let i = 0; i < this.imgFile[index].files.length; i++) {
                        this.imgFile[index].files[i].showImage = false;
                    }
                }
            }

        },
        folderShow(index) {
            this.imgFile[index].showFolder = !this.imgFile[index].showFolder;
        },
        lockLayers(index, indexinFolder) {
            if (indexinFolder > -1) {
                this.imgFile[index].files[indexinFolder].lockLayers = !this.imgFile[index].files[indexinFolder].lockLayers;
            }
            else {
                this.imgFile[index].lockLayers = !this.imgFile[index].lockLayers;
            }
            if (this.imgFile[index].typeof === 'Folder' && indexinFolder === -1) {
                if (this.imgFile[index].lockLayers) {
                    for (let i = 0; i < this.imgFile[index].files.length; i++) {
                        this.imgFile[index].files[i].lockLayers = true;
                    }
                }
                else {
                    for (let i = 0; i < this.imgFile[index].files.length; i++) {
                        this.imgFile[index].files[i].lockLayers = false;
                    }
                }
            }
        },
        mergeFilesIntoFolder() {
            if (!this.imgFile.some(file => file.selectedFiles && file instanceof Folder) && (this.imgFile.some(file => file.selectedFiles))) {
                const folderName = prompt('Please enter folder name:');
                if (folderName) {
                    const folder = new Folder(folderName);
                    folder.selectedFiles = false;
                    folder.showImage = true;
                    folder.lockLayers = false;
                    folder.typeof = "Folder";
                    folder.showFolder = false;
                    let count = 0;
                    let firstSelectedFileIndex = -1;
                    for (let i = 0; i < this.imgFile.length; i++) {
                        if (this.imgFile[i].selectedFiles === true) {
                            if (firstSelectedFileIndex === -1) {
                                firstSelectedFileIndex = i;
                            }
                            this.imgFile[i].selectedFiles = false;
                            const file = this.imgFile[i];
                            folder.addFile(file);
                            this.imgFile.splice(i, 1);
                            i--;
                            count++;
                        }
                    }
                    if (count > 0) {
                        this.imgFile.splice(firstSelectedFileIndex, 0, folder);
                    }
                }
            } else if (!this.imgFile.some(file => file.selectedFiles)) {
                alert("ควรเลือกอย่างน้อย 1 ไฟล์ในการสร้างโฟลเดอร์");

            }
            else {
                alert("ไม่สามารถสร้างโฟลเดอร์ได้ หากมีโฟลเดอร์ที่ถูกเลือก");
            }
        },
        cancelSelectedFolder() {
            let index = -1;
            for (let i = 0; i < this.imgFile.length; i++) {
                const file = this.imgFile[i];
                if (file.typeof === "Folder" && file.selectedFiles) {
                    index = i;
                    const folder = this.imgFile.splice(index, 1)[0];
                    for (let i = folder.files.length - 1; i >= 0; i--) {
                        const file = folder.files[i];
                        this.imgFile.splice(index, 0, file);
                    }
                }
            }

        },
        handleKeyDown(event) {
            if (event.shiftKey) {
                this.shiftKeyDown = true;
            }
        },
        handleKeyUp(event) {
            if (!event.shiftKey) {
                this.shiftKeyDown = false;
            }
        },
        toggleSelected(index, indexinFolder) {
            let countSelected = 0;
            if (this.imgFile && indexinFolder > -1 && this.imgFile[index]) {
                if (this.imgFile[index].files && this.imgFile[index].files[indexinFolder]) {
                    if (this.imgFile[index].files && this.imgFile[index].files[indexinFolder].selectedFiles) {
                        if (!this.shiftKeyDown) {
                            this.unselectAllFiles();
                        } else {
                            this.imgFile[index].files[indexinFolder].selectedFiles = false;
                        }
                    } else {
                        if (!this.shiftKeyDown) {
                            this.unselectAllFiles();
                        }
                        this.imgFile[index].files[indexinFolder].selectedFiles = true;
                    }

                    this.imgFile[index].selectedFiles = true;
                    this.imgFile[index].files.forEach((file) => {
                        if (file.selectedFiles) {
                            countSelected++;
                        }
                    });
                    if (countSelected === 0) {
                        this.imgFile[index].selectedFiles = false;
                    }
                }

            } else if (this.imgFile && this.imgFile[index]) {
                if (this.imgFile[index].selectedFiles) {
                    if (!this.shiftKeyDown) {
                        this.unselectAllFiles();
                    } else {
                        if (this.imgFile[index] instanceof Folder) {
                            this.imgFile[index].files.forEach((file) => {
                                file.selectedFiles = false;
                            });
                        }
                        this.imgFile[index].selectedFiles = false;
                    }
                } else {
                    if (!this.shiftKeyDown) {
                        this.unselectAllFiles();
                    }
                    this.imgFile[index].selectedFiles = true;
                }
            }
        },
        unselectAllFiles() {
            this.imgFile.forEach((item) => {
                if (item instanceof Folder) {
                    item.files.forEach((file) => {
                        file.selectedFiles = false;
                    });
                }
                item.selectedFiles = false;
            });
        },
        checkFolder(type) {
            if (type === 'createfolder') {
                return (!this.imgFile.some(file => file.selectedFiles && file instanceof Folder) && (this.imgFile.some(file => file.selectedFiles)))
            }
            else if (type === 'unfolder') {
                return this.imgFile.some(file => file.selectedFiles && file instanceof Folder);
            }

        }
    },
}
</script>
<style>
* {
    box-sizing: 0;
}

/* @media only screen and (max-width: 500px) {
    .font-size {
        font-size: 0.8rem !important;

    }

    .box-right {
        background-color: white;
        min-height: 20vh !important;
        width: 100%;
        margin: 0 !important;
        margin-top: 0% !important;
        border-radius: 0 0 0 0 !important;
    }

}

@media (min-width: 501px) and (max-width: 768px) {
    .font-size {
        font-size: 0.8rem !important;

    }

    .box-right {
        background-color: white !important;
        height: max-content !important;
        width: 100%;
        margin: 0 !important;
        margin-top: 0% !important;
        border-radius: 0 0 0 0 !important;
        padding-bottom: 10%;
    }


}

@media (min-width: 769px) and (max-width: 1200px) {
    .font-size {
        font-size: 0.8rem !important;

    }

    .box-right {
        background-color: white !important;
        height: max-content !important;
        width: 100%;
        margin: 0 !important;
        margin-top: 0% !important;
        border-radius: 0 0 0 0 !important;
        padding-bottom: 10%;
    }

    .content-setting {
        height: max-content;
        overflow: auto !important;
    }
}

@media (min-width: 1200px) {
    .font-size {
        font-size: 1rem !important;

    }

    .box-right {
        background-color: white;
        height: 80vh;
        width: 350px !important;
        margin: 3%;
        margin-top: 8%;
        border-radius: 20px 0 0 20px;
    }

} */

/* .box-layer-bg {
    background-color: white;
    border-radius: 0.5rem 0;
    height: 80vh;
    width: 350px;
    margin: 3%;
    margin-top: 8%;
    border-radius: 20px 0 0 20px;
} */

.drag-handle {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
}

.dragging-tab {
    background-color: #E8E8E8;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

.tab-image {
    background-color: #ffffff;
    height: 2.5rem;
}

.tab-image:hover {
    background-color: #E8E8E8;
}

.selected {
    background-color: #E8E8E8;
}
</style>
<template>
    <div class="box-right border shadow ">
        <div class="row text-center p-1 gx-5 mt-3 px-3">
            <div class="col-7 fw-bold fs-3">ตั้งค่าเลเยอร์</div>
            <div class="col-3 ms-auto p-2">
                <button type="button" class="btn-close"
                    @click="layerActive = false, $emit('layerActive', layerActive)"></button>
            </div>

        </div>
        <div class="row" style="justify-content: space-between;">
            <div class="col-3 text-center">
                <button type="button" class="btn py-1 me-2 "
                    style="background-color: #a82043; color: aliceblue; margin-left: 1rem; display: flex; justify-content: flex-start">
                    <span class="material-symbols-rounded">
                        layers
                    </span>เลเยอร์
                </button>
            </div>
            <div class="row col-6 mx-3 pt-1" style="justify-content: end;">
                <div class="col-3">
                    <button type="button" class="btn btn-link" @click="mergeFilesIntoFolder()"
                        :disabled="!checkFolder('createfolder')" style="padding: 0;">
                        <span class="material-symbols-rounded" style=" color: dimgrey;">
                            create_new_folder
                        </span>
                    </button>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-link" style="padding: 0;" @click="cancelSelectedFolder()"
                        :disabled="!checkFolder('unfolder')">
                        <span class="material-symbols-rounded" style="color: dimgrey;">
                            folder_off
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <hr>
        <div class="content-setting" style="background-color: white; max-height: 63vh;  margin-left: 0.85rem; overflow-y: auto; margin-top: 1rem;">
            <input type="file" id="upload-img-input" class="form-control d-none" :accept="input_file_accept" multiple
                @change="getFile($event.target.id)">
            <template v-for="(file, index) in imgFile" :key="'image-' + index">
                <div class="rounded-3 my-2 p-2 d-flex tab-image" draggable="true" :item="file"
                    :class="{ 'dragging-tab': draggingIndex === index, 'selected': file.selectedFiles }"
                    @dragstart="dragStart(index)" @dragover="dragOver(index, -1)" @dragend="dragEnd()"
                    @click="toggleSelected(index, -1), $emit('selectData', index, -1)">
                    <div class="d-flex justify-content-between align-items-center w-100 text-center">
                        <div class="d-flex align-items-center row" style="width: 12rem;">
                            <div class="drag-handle col-1">☰</div>
                            <div class="col-2 p-0">
                                <button class="btn btn-link " type="button" @click="imgShow(index, -1)">
                                    <span class="material-symbols-rounded pt-1" v-if="file.showImage === true"
                                        style="color:dimgrey;">visibility</span>
                                    <span class="material-symbols-rounded pt-1" v-if="file.showImage === false"
                                        style="color: lightgray;">visibility_off</span>
                                </button>
                            </div>

                            <button v-if="file.typeof === 'Folder'" class="col-2 pt-2 btn btn-link"
                                @click="folderShow(index)">
                                <span v-if="file.showFolder === false" class="material-symbols-rounded"
                                    style="color: lightgray;">
                                    folder
                                </span>
                                <span v-if="file.showFolder === true" class="material-symbols-rounded"
                                    style="color:dimgrey;">
                                    folder_open
                                </span>
                            </button>
                            <h6 class="text-start pt-2 col-5"
                                style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                {{ file.name }}
                            </h6>
                        </div>
                        <div>
                            <button class="btn btn-link " type="button" @click="lockLayers(index, -1)">
                                <span class="material-symbols-rounded pt-1" v-if="file.lockLayers === true"
                                    style="color:dimgrey;">lock</span>
                                <span class="material-symbols-rounded pt-1" v-if="file.lockLayers === false"
                                    style="color: lightgray;">lock_open</span>
                            </button>

                            <button class="btn btn-link text-center " type="button" @click="remove(index, -1)"
                                title="Remove file">
                                <span class="material-symbols-rounded pt-1" style="color: #a82043; ">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="file.typeof === 'Folder' && file.showFolder === true" style="margin-left: 1rem;">
                    <div class="rounded-3 my-2 p-2 d-flex tab-image" v-for="(files, folderIndex) in file.files"
                        :key="'folder-' + folderIndex" draggable="true" :item="files"
                        :class="{ 'selected': files.selectedFiles, 'dragging-tab': draggingIndex === index }"
                        @dragstart="dragStart(folderIndex)" @dragover="dragOver(index, folderIndex)" @dragend="dragEnd()"
                        @click="toggleSelected(index, folderIndex), $emit('selectData', index, folderIndex)">
                        <div class="d-flex justify-content-between align-items-center w-100 text-center">
                            <div class="d-flex align-items-center row " style="width: 10rem;">
                                <div class="drag-handle col-1">☰</div>
                                <div class="col-4  p-0">
                                    <button class="btn btn-link  m-0" type="button" @click="imgShow(index, folderIndex)">
                                        <span class="material-symbols-rounded pt-1 " v-if="files.showImage === true"
                                            style="color:dimgrey;">visibility</span>
                                        <span class="material-symbols-rounded pt-1" v-if="files.showImage === false"
                                            style="color: lightgray;">visibility_off</span>
                                    </button>
                                </div>
                                <h6 class="text-start pt-2 col-5 "
                                    style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                    {{ files.name }}
                                </h6>
                            </div>
                            <div>
                                <button class="btn btn-link " type="button" @click="lockLayers(index, folderIndex)">
                                    <span class="material-symbols-rounded pt-1" v-if="files.lockLayers === true"
                                        style="color:dimgrey;">lock</span>
                                    <span class="material-symbols-rounded pt-1" v-if="files.lockLayers === false"
                                        style="color: lightgray;">lock_open</span>
                                </button>

                                <button class="btn btn-link text-center " type="button" @click="remove(index, folderIndex)"
                                    title="Remove file">
                                    <span class="material-symbols-rounded pt-1" style="color: #a82043; ">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
  name: "SettingpictureComponent",
  emits: ["insertText", "textData", "textAlign"],
  props: {
    text_input: {
      type: String,
      required: false,
      default: "",
    },
    textActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    textData: {
      type: Object,
      required: false,
      default: {
        align: "left",
        fontWidth: 18,
        border: 1,
        alpha: 1,
        gap: 1,
        lineHeight: 1,
        color: "black",
        fontStyle: "promptlight",
        spacing: 1,
        bordercolor: "#000000",
        borderWidth: 1,
        backgroundColor: "#ffffff",
        horizontal: "",
      },
    },
  },
  data() {
    return {

    };
  },
  methods: {
    
  },
};
</script>

<template>
  <div class="box-right border shadow">
    <!-- HEADER -->
    <div class="px-3 pt-3">
      <div class="row text-start">
        <div class="col-9 fw-bold fs-3">ตั้งค่ารูปภาพ</div>
        <div class="col-3 ms-auto px-2 pt-2 d-flex justify-content-end">
          <button type="button" class="btn-close"></button>
        </div>
      </div>
      <div style="display: flex; align-items: center">
        <button
          type="button"
          class="btn py-1 me-2"
          style="
            background-color: #a52342;
            color: white;
            display: flex;
            justify-content: flex-start;
          "
        >
          <span class="material-symbols-rounded"> image </span>ตั้งค่า
        </button>
        <button
          type="button"
          class="btn py-1 me-2"
          style="
            background-color: #f3f5f7;
            color: black;
            margin-left: 1rem;
            margin-left: ;
            display: flex;
            justify-content: flex-start;
          "
          @click="openUploadInput('upload-img-input')"
        >
          <span class="material-symbols-rounded"> layers </span>เลเยอร์
        </button>
      </div>
    </div>

    <hr />
    <!-- BODY -->
    <div class="px-3" style="max-height: 60vh; overflow: auto">
      <div class="mt-2">
        <strong class="me-3 fw-bold" style="font-size: 16px">ประเภทงาน</strong>
        <input
          class="form-check-input me-1"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
        />
        <label class="form-check-label me-2" for="flexRadioDefault1">
          งานสกรีน
        </label>
        <input
          class="form-check-input me-1"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked
        />
        <label class="form-check-label" for="flexRadioDefault2"> งานปัก </label>
      </div>

      <!-- SCALE RANGE BORDER -->
      <div class="row mt-3">
        <div
          class="col-3 d-flex flex-column align-items-center fw-bold"
          style="font-size: 14px"
        >
          พื้นหลัง
          <input
            type="color"
            name=""
            id=""
            class="p-0 border-0"
            v-model="textData.backgroundColor"
            @input="$emit('textData', textData)"
          />
        </div>
        <div
          class="col-3 d-flex flex-column align-items-center fw-bold"
          style="font-size: 14px"
        >
          เส้นขอบ
          <input
            type="color"
            name=""
            id=""
            class="p-0 border-0"
            v-model="textData.bordercolor"
            @input="$emit('textData', textData)"
          />
        </div>

        <div class="col-4 d-flex justify-content-center align-items-center">
          <input
            type="range"
            id="scale-range"
            name="scale-range"
            min="0"
            max="100"
            step="1"
            v-model="textData.borderWidth"
            @input="onScaleChangeBorder, $emit('textData', textData)"
            class="range-slider mt-2"
          />
        </div>
        <div
          class="col-2 d-flex justify-content-center align-items-center pt-2"
        >
          <p
            class="mb-0 text-center w-100"
            style="border-bottom: 1px solid black"
          >
            {{ textData.borderWidth }}
          </p>
        </div>
      </div>

      <!-- SCALE RANGE TRANSPARENCY -->
      <div class="mt-3 fw-bold" style="font-size: 14px">
        ความโปร่งใส
      </div>
      <div class="row">
        <div class="col-10">
          <input
            type="range"
            id="scale-range"
            name="scale-range"
            min="0"
            max="1"
            step="0.1"
            @input="onScaleChange, $emit('textData', textData)"
            class="range-slider mt-2"
          />
        </div>
        <div
          class="col-2 d-flex justify-content-center align-items-center pt-2"
        >
          <p
            class="mb-0 text-center w-100"
            style="border-bottom: 1px solid black"
          >
            {{ textData.alpha }}
          </p>
        </div>
      </div>
      <br>
      <!-- FORMAT HORIZONTAL AND VERTICAL -->
      <div class="row mt-2 px-0">
        <div class="col-12 d-flex justify-content-between">
          <button
            type="button"
            class="btn box-bg px-2 py-1"
            :class="{ active: activeButton === 'align_horizontal_left' }"
            @click="
              (textData.horizontal = 'h-left'), $emit('textData', textData)
            "
            :disabled="!textActive"
          >
            <span class="material-symbols-rounded">
              align_horizontal_left
            </span>
          </button>
          <button
            type="button"
            class="btn box-bg px-2 py-1"
            :class="{ active: activeButton === 'align_horizontal_center' }"
            @click="
              (textData.horizontal = 'h-center'), $emit('textData', textData)
            "
            :disabled="!textActive"
          >
            <span class="material-symbols-rounded">
              align_horizontal_center
            </span>
          </button>
          <button
            type="button"
            class="btn box-bg px-2 py-1"
            :class="{ active: activeButton === 'align_horizontal_right' }"
            @click="
              (textData.horizontal = 'h-right'), $emit('textData', textData)
            "
            :disabled="!textActive"
          >
            <span class="material-symbols-rounded">
              align_horizontal_right
            </span>
          </button>
          <button
            type="button"
            class="btn box-bg px-2 py-1"
            :class="{ active: activeButton === 'align_vertical_top' }"
            @click="
              (textData.horizontal = 'v-left'), $emit('textData', textData)
            "
            :disabled="!textActive"
          >
            <span class="material-symbols-rounded"> align_vertical_top </span>
          </button>
          <button
            type="button"
            class="btn box-bg px-2 py-1"
            :class="{ active: activeButton === 'align_vertical_center' }"
            @click="
              (textData.horizontal = 'v-center'), $emit('textData', textData)
            "
            :disabled="!textActive"
          >
            <span class="material-symbols-rounded">
              align_vertical_center
            </span>
          </button>
          <button
            type="button"
            class="btn box-bg px-2 py-1"
            :class="{ active: activeButton === 'align_vertical_bottom' }"
            @click="
              (textData.horizontal = 'v-right'), $emit('textData', textData)
            "
            :disabled="!textActive"
          >
            <span class="material-symbols-rounded">
              align_vertical_bottom
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.btn.active {
  border-color: #8f1b39;
  border-width: 2px;
}

.range-slider {
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #cfcfcf;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #8f1b39;
  cursor: pointer;
}

.box-right {
  background-color: white;
  height: 80vh;
  width: 100%;
  margin: 3%;
  /* margin-right: 0%; */
  margin-top: 8%;
  border-radius: 20px 0 0 20px;
}

.box-bg {
  background-color: #f3f5f7;
}
.btn.box-bg:active {
  border-color: #8f1b39;
}

input[type="color"],
input[type="color"]::-webkit-color-swatch,
input[type="color"]::-webkit-color-swatch-wrapper {
  border-radius: 0.25rem;
  width: 3rem;
  height: 2.8rem;
}
</style>

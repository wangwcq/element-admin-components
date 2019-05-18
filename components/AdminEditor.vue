<template>
  <el-container>
    <el-row :gutter="10">
      <el-col :md="16">
        <vue-ckeditor
          v-if="ckEditorReady"
          :value="value"
          @input="(value) => { $emit('input', value); }"
          @contentDom="bindRef($event)"
          :key="editorKey"
        />
      </el-col>
      <el-col :md="8">
        <el-upload
          multiple
          drag
          :action="$ctx.apiUpload"
          :data="{ transform: 'th1000' }"
          :show-file-list="false"
          with-credentials
          :on-success="handleUploadSuccess"
        >
          <div style="padding: 20px 0">
            <p>{{$t('uploadComponent.hint')}}</p>
          </div>
        </el-upload>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import _ from 'lodash';
import Vue from 'vue';

let ckEditorReady = false;
const ckEditorImpl = true;

export default {
  name: 'AdminEditor',
  props: {
    value: { type: String, default: '' },
  },
  emits: ['input'],
  data() {
    const ckReady = ckEditorReady || false;
    const ckImpl = ckEditorImpl || null;
    const ckOptions = {
    };
    const editorKey = `vueEditor${_.random(100, 1000)}`;
    return {
      ckEditorReady: ckReady,
      ckEditorImpl: ckImpl,
      ckOptions,
      editor: null,
      editorKey,
    };
  },
  metaInfo: {
    script: [
      { src: '/ckeditor/ckeditor.js' },
    ],
  },
  async mounted() {
    await new Promise((resolve) => {
      const tStart = Date.now();
      const ti = setInterval(() => {
        if (window.CKEDITOR) resolve();
        const t = Date.now() - tStart;
        if (t > 30 * 1000) clearInterval(ti);
      }, 100);
    });
    this.$nextTick(() => {
      this.initCkEditor();
    });
  },
  methods: {
    initCkEditor() {
      // eslint-disable-next-line global-require
      const VueCkeditor = require('vue-ckeditor2').default;
      this.ckEditorImpl = VueCkeditor;
      Vue.component('vue-ckeditor', VueCkeditor);
      ckEditorReady = true;
      this.ckEditorReady = ckEditorReady;
    },
    bindRef(ev) {
      this.editor = ev.editor;
    },
    handleUploadSuccess(res, file) {
      console.log(res, file);
      file.name = res.data[0].name;
      file.url = res.data[0].url;
      this.$nextTick(() => {
        this.editor.insertHtml(`<img src="${file.url}" style="width: auto; height: auto; max-width: 100%;" />`);
      });
    },
  },
};
</script>

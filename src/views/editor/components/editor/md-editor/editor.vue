<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { markdownLanguage } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { useResumeType } from '../../../hook'
import useEditorStore from '@/store/modules/editor'

import { useThemeConfig } from '@/common/global'
import MarkdownToolbar from '../toolbar/mdTool.vue'
import './md-editor.scss'

defineProps<{ left: number }>()
const { isDark } = useThemeConfig()
const { resumeType } = useResumeType()
const editorStore = useEditorStore()
const localContent = ref(editorStore.MDContent)
const isComposing = ref(false)

watch(
  () => editorStore.MDContent,
  value => {
    if (!isComposing.value && value !== localContent.value) {
      localContent.value = value
    }
  }
)

watch(localContent, value => {
  if (!isComposing.value) {
    editorStore.setMDContent(value, resumeType.value)
  }
})

function handleEditorChange(value: string) {
  localContent.value = value
  if (!isComposing.value) {
    editorStore.setMDContent(value, resumeType.value)
  }
}

function handleCompositionEnd() {
  isComposing.value = false
  nextTick(() => editorStore.setMDContent(localContent.value, resumeType.value))
}
</script>

<template>
  <markdown-toolbar @toggle-editor-mode="editorStore.setWritableMode" />
  <div
    @compositionstart.capture="isComposing = true"
    @compositionend.capture="handleCompositionEnd"
  >
    <codemirror
      v-model="localContent"
      :style="{
        height: 'calc(100vh - 40px)',
        borderLeft: isDark ? 'none' : '1px solid #ddd',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        minWidth: '550px',
        width: `${left}px`,
        background: '#fff'
      }"
      :autofocus="true"
      :indent-with-tab="true"
      :extensions="isDark ? [markdownLanguage, oneDark] : [markdownLanguage]"
      @change="handleEditorChange"
    />
  </div>
</template>

<style lang="scss" scoped></style>

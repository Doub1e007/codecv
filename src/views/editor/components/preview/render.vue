<script setup lang="ts">
import TabBar from '../tabbar/tabbar.vue'
import { useRenderHTML, useResumeType } from '../../hook'
import { useThemeConfig } from '@/common/global'
import { step, pageSize } from '../tabbar/hook'
import { getPickerFile } from '@/utils/uploader'

const emits = defineEmits(['upload-avatar', 'html-convert'])

const { resumeType } = useResumeType()
const { isDark } = useThemeConfig()
const { renderDOM } = useRenderHTML(resumeType)

function readAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => resolve(event.target?.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function handlePreviewClick(event: MouseEvent) {
  const target = event.target as Element | null
  const avatar = target?.closest("img[alt*='个人头像']")
  if (!avatar) return

  event.preventDefault()
  event.stopPropagation()

  const file = await getPickerFile({
    multiple: false,
    accept: 'image/png, image/gif, image/jpeg, image/jpg, image/bmp, image/webp'
  })
  const dataURL = await readAsDataURL(file)
  emits('upload-avatar', dataURL)
}
</script>

<template>
  <div
    class="outer"
    :style="{ background: isDark ? '#282c34' : 'var(--bg-theme)' }"
    @click="handlePreviewClick"
  >
    <TabBar
      @html-convert="cnt => $emit('html-convert', cnt)"
      @upload-avatar="path => $emit('upload-avatar', path)"
    />
    <div ref="renderDOM" class="markdown-transform-html jufe reference-dom"></div>
    <!-- 分页渲染区域 -->
    <div
      class="re-render"
      :style="{
        transform: `translateY(-${((100 - step) / 100) * 1123 * (pageSize / 2)}px) scale(${
          step / 100
        })`
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.outer {
  height: 100vh;
  overflow: auto;
  background: var(--bg-theme);

  .re-render {
    transition: transform 0.3s;
  }
}

.jufe {
  position: absolute;
  left: -9990px;
  top: -9990px;
}
</style>

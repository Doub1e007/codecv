import { defineStore } from 'pinia'
import { nextTick } from 'vue'

import pinia from '@/store'
import { getLocalStorage, setLocalStorage } from '@/common/localstorage'
import { showMessageVN } from '@/common/message'
import { templates } from '@/templates/config'
import { ensureEmptyPreWhiteSpace } from '@/views/editor/components/tabbar/hook'

const MARKDOWN_CONTENT = 'markdown-content'
const WRITABLE = 'writable'
const STALE_TEMPLATE_MARKERS: Record<string, string[]> = {
  ops_blue_timeline: ['无锡学院', '上海星魁', '容器化监控与日志平台搭建']
}

export const getCurrentTypeContent = (type: string): string => {
  for (const template of templates.value) {
    if (type === template.type) {
      return template.content
    }
  }
  return ''
}

function shouldResetStaleTemplateContent(type: string, content: string) {
  if (type === 'ops_blue_timeline' && !content.includes('![个人头像]')) {
    return true
  }
  return STALE_TEMPLATE_MARKERS[type]?.some(marker => content.includes(marker)) || false
}

const useEditorStore = defineStore('editorStore', {
  state: () => ({
    MDContent: '',
    nativeContent: '',
    writable: Boolean(getLocalStorage(WRITABLE)) || false
  }),
  actions: {
    // 初始化编辑器内容（默认为Markdown模式）
    initMDContent(resumeType: string) {
      const cacheKey = MARKDOWN_CONTENT + '-' + resumeType
      const cachedContent = getLocalStorage(cacheKey) as string | false
      const templateContent = getCurrentTypeContent(resumeType)
      if (cachedContent && !shouldResetStaleTemplateContent(resumeType, cachedContent)) {
        this.MDContent = cachedContent
        return
      }
      this.MDContent = templateContent
      if (templateContent) {
        setLocalStorage(cacheKey, templateContent)
      }
    },
    setMDContent(nv: string, resumeType: string) {
      this.MDContent = nv
      // 处理之后的操作
      if (!nv) return
      setLocalStorage(`${MARKDOWN_CONTENT}-${resumeType}`, nv)
    },
    // 切换编辑模式
    setWritableMode(originHTML: HTMLElement) {
      this.writable = !this.writable
      setLocalStorage(WRITABLE, this.writable)
      showMessageVN('您已切换至', this.writable ? '内容模式' : 'Markdown模式')
      if (this.writable) {
        nextTick(() => {
          originHTML = originHTML || (document.querySelector('.reference-dom') as HTMLElement)
          originHTML = <HTMLElement>originHTML.cloneNode(true)
          const DOMTree = document.querySelector('.writable-edit-mode') as HTMLElement
          ensureEmptyPreWhiteSpace(originHTML)
          DOMTree && (DOMTree.innerHTML = originHTML.innerHTML)
        })
      }
    },
    setNativeContent(content: string) {
      this.nativeContent = content
    },
    resetNativeContent() {
      this.nativeContent = ''
    }
  }
})

export default () => useEditorStore(pinia)

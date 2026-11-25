const loadSavedCustomLib = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('cdn-customLib') || 'null')
    if (saved && saved.name && saved.version && saved.file) {
      return {
        name: saved.name,
        version: saved.version,
        file: saved.file,
        zname: saved.name,
        isCustom: true,
        size: saved.size || ''
      }
    }
  } catch (e) {
    return null
  }
  return null
}

window.vueApp = Vue.createApp({
  data() {
    return {
      dialogShow: false,
      isNewWin: localStorage.getItem('cdn-isNewWin') === 'true',
      isDarkMode: false,
      searchText: '',
      customLib: loadSavedCustomLib(),
      searchDialogShow: false,
      searchKeyword: '',
      customLibKeyword: '',
      searchForm: { name: '', version: '', file: '' },
      searchResults: { cdnjs: [], npmmirror: [] },
      searchStatus: { cdnjs: '', npmmirror: '' },
      searchLoading: false,
      searchMetaLoading: false,
      searchMetaSeq: 0,
      selectedResultKey: '',
      selectedCdn: Math.max(0, cdnData.cdn.findIndex(x => x.name === '南科大镜像')),
      selectedTemplate: '',
      htmlTemplate: '',
      showToast: false,
      toastMessage: '',
      appData: {
        cdn: cdnData.cdn.map(x => ({...x, latency: null, loading: false})), 
        libs: cdnData.libs,
      },
      sizeMap: JSON.parse(localStorage.getItem('cdn-sizeMap') || '{}'),
      timer: null
    }
  },
  mounted() {
    this.customLibKeyword = this.customLib ? this.customLib.name : ''
    this.updateCdnUrls()
    this.initTheme()
    this.testAllCdnLatency()
  },
  watch: {
    isNewWin(val) { localStorage.setItem('cdn-isNewWin', val) }
  },
  computed: {
    filterLibs() {
      const libs = this.customLib ? [this.customLib, ...this.appData.libs] : this.appData.libs
      return libs
        .filter(lib => (lib.name + (lib.zname || '')).toLowerCase().includes(this.searchText.toLowerCase()))
        .map(lib => lib.isCustom
          ? { ...lib, cdnUrl: this.getCdnUrl(lib.name, lib.version, lib.file, null, null, true) }
          : lib)
    }
  },
  methods: {
    initTheme() {
      const savedTheme = localStorage.getItem('cdn-theme')
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.isDarkMode = true
        document.body.classList.toggle('dark', this.isDarkMode)
      }
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark', this.isDarkMode)
      localStorage.setItem('cdn-theme', this.isDarkMode ? 'dark' : 'light')
    },
    findLib(name, version, file) {
      const libs = this.appData.libs
      return libs.find(l => l.name === name && l.version === version && l.file === file)
        || libs.find(l => l.name === name && l.file === file)
        || libs.find(l => l.name === name)
    },
    getFix(name, version, file, cdnObj) {
      const cdn = cdnObj || this.appData.cdn[this.selectedCdn]
      if (!cdn || cdn.name !== '南科大镜像') return {}
      const map = (cdnData.fix && cdnData.fix.sustech) || {}
      const lib = this.findLib(name, version, file)
      const fix = (lib && map[lib.zname || lib.name]) || map[name]
      if (!fix) return {}
      return typeof fix === 'string' ? { version: fix } : fix
    },
    updateCdnUrls() {
      this.appData.libs.forEach((lib) => {
        const fix = this.getFix(lib.name, lib.version, lib.file)
        lib.displayVersion = fix.version || lib.version
        lib.cdnUrl = this.getCdnUrl(lib.name, lib.version, lib.file)
      })
    },
    getCdnUrl(name, version, file, cdnObj, filePrefix, skipFix) {
      cdnObj = cdnObj ? cdnObj : this.appData.cdn[this.selectedCdn]
      if (!cdnObj) return ''
      const fix = skipFix ? {} : this.getFix(name, version, file, cdnObj)
      const fixedVersion = fix.version || version
      const fixedFile = fix.file || file
      return cdnObj.url.replace('#name', name).replace('#version', fixedVersion).replace('#file', (filePrefix || '') + fixedFile)
    },
    async testCdnLatency(cdnIndex) {
      const cdn = this.appData.cdn[cdnIndex]
      cdn.loading = true
      // const testUrl = this.getCdnUrl('nanoid', '5.1.5', 'index.browser.min.js', cdn)
      // const testUrl = this.getCdnUrl('vue', '3.5.17', 'vue.global.js', cdn)
      const testUrl = this.getCdnUrl('dayjs', '1.11.23', 'dayjs.min.js', cdn)
      const startTime = performance.now()
      try {
        const response = await fetch(testUrl, { method: 'HEAD' })
        if (response.ok) {
          cdn.latency = Math.round(performance.now() - startTime) + 'ms'
        } else {
          cdn.latency = 'Error'
        }
      } catch (error) {
        cdn.latency = 'TT-' + Math.round(performance.now() - startTime) + 'ms'
      } finally {
        cdn.loading = false
      }
    },
    testAllCdnLatency() {
      this.appData.cdn.forEach((_, index) => {
        this.testCdnLatency(index)
      })
    },
    async copyUrl(text, isTag) {
      if (isTag) {
        if (text.endsWith('.css')) {
          text = '<link rel="stylesheet" href="' + text + '">'
        } else {
          text = '<script src="' + text + '"></script>'
        }
      }
      try {
        await navigator.clipboard.writeText(text)
      } catch (err) {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      this.showToastMessage(`已复制${isTag ? '标签+链接' : '链接'}到剪贴板`)
    },
    openUrl(lib, dist) {
      const url = this.getCdnUrl(lib.name, lib.version, lib.file, null, dist, lib.isCustom)
      if (this.isNewWin) return window.open(url)
      this.iframeSrc = url
      this.dialogShow = true
    },
    openUrlB(lib) {
      window.open(this.getCdnUrl(lib.name, lib.version, lib.file, null, null, lib.isCustom), '_blank')
    },
    openNewUrl(url) {
      window.open(url).focus()
    },
    closeSearchDialog() {
      this.searchDialogShow = false
    },
    clearSearchInputs() {
      this.customLibKeyword = ''
      this.searchText = ''
    },
    searchFromHeader() {
      const keyword = this.customLibKeyword.trim()
      if (!keyword && this.customLib) return this.openCustomSearch(this.customLib.name)
      if (!keyword) return this.showToastMessage('请输入 JS 库名后回车搜索')
      this.openCustomSearch(keyword)
    },
    openCustomSearch(keyword) {
      this.searchKeyword = keyword
      this.customLibKeyword = keyword
      this.searchForm = this.customLib && this.customLib.name === keyword
        ? { name: this.customLib.name, version: this.customLib.version, file: this.customLib.file }
        : { name: keyword, version: '', file: '' }
      this.searchResults = { cdnjs: [], npmmirror: [] }
      this.searchStatus = { cdnjs: '', npmmirror: '' }
      this.selectedResultKey = ''
      this.searchDialogShow = true
      this.searchLibs()
    },
    editCustomLib() {
      if (!this.customLib) return this.showToastMessage('请先在上方输入库名回车搜索')
      this.openCustomSearch(this.customLib.name)
    },
    searchCacheKey(source, keyword) {
      return 'cdn-lib-search:' + source + ':' + keyword.trim().toLowerCase()
    },
    readSearchCache(key) {
      try {
        const raw = sessionStorage.getItem(key)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : null
      } catch (e) {
        return null
      }
    },
    writeSearchCache(key, items) {
      try {
        sessionStorage.setItem(key, JSON.stringify(items))
        return true
      } catch (e) {
        return false
      }
    },
    fileFromCdnjsLatest(url) {
      if (!url) return ''
      const parts = url.split('/')
      return decodeURIComponent(parts[parts.length - 1] || '')
    },
    async searchLibs() {
      const keyword = this.searchKeyword.trim()
      if (!keyword) return this.showToastMessage('请输入 JS 库名')
      this.searchLoading = true
      this.searchResults = { cdnjs: [], npmmirror: [] }
      this.searchStatus = { cdnjs: '搜索中...', npmmirror: '搜索中...' }
      const [cdnjs, npmmirror] = await Promise.all([
        this.searchCdnjs(keyword),
        this.searchNpmmirror(keyword)
      ])
      this.searchResults = { cdnjs, npmmirror }
      this.searchLoading = false
    },
    async searchCdnjs(keyword) {
      const key = this.searchCacheKey('cdnjs', keyword)
      const cached = this.readSearchCache(key)
      if (cached) {
        this.searchStatus.cdnjs = '会话缓存 · ' + cached.length + ' 条'
        return cached
      }
      try {
        const url = 'https://api.cdnjs.com/libraries?search=' + encodeURIComponent(keyword)
          + '&limit=10&fields=name,version,latest,description'
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        const items = (data.results || []).slice(0, 10).map(item => ({
          source: 'cdnjs',
          name: item.name,
          version: item.version,
          description: item.description || '',
          file: this.fileFromCdnjsLatest(item.latest)
        }))
        this.writeSearchCache(key, items)
        this.searchStatus.cdnjs = items.length + ' 条'
        return items
      } catch (e) {
        this.searchStatus.cdnjs = '搜索失败：' + e.message
        return []
      }
    },
    async searchNpmmirror(keyword) {
      const key = this.searchCacheKey('npmmirror', keyword)
      const cached = this.readSearchCache(key)
      if (cached) {
        this.searchStatus.npmmirror = '会话缓存 · ' + cached.length + ' 条'
        return cached
      }
      try {
        const url = 'https://registry.npmmirror.com/-/v1/search?text=' + encodeURIComponent(keyword) + '&size=10'
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        const items = (data.objects || []).slice(0, 10).map(obj => {
          const pkg = obj.package || {}
          return {
            source: 'npmmirror',
            name: pkg.name,
            version: pkg.version,
            description: pkg.description || '',
            downloads: (obj.downloads && (obj.downloads.all || obj.downloads.weekly)) || 0
          }
        }).filter(item => item.name && item.version)
        this.writeSearchCache(key, items)
        this.searchStatus.npmmirror = items.length + ' 条'
        return items
      } catch (e) {
        this.searchStatus.npmmirror = '搜索失败：' + e.message
        return []
      }
    },
    isSelected(item) {
      return this.selectedResultKey === item.source + ':' + item.name + '@' + item.version
    },
    selectResult(item) {
      this.selectedResultKey = item.source + ':' + item.name + '@' + item.version
      this.searchForm = {
        name: item.name,
        version: item.version,
        file: item.file || ''
      }
      if (item.source === 'npmmirror') this.suggestNpmFile(item)
    },
    async suggestNpmFile(item) {
      const key = item.source + ':' + item.name + '@' + item.version
      const seq = ++this.searchMetaSeq
      const current = this.selectedResultKey === key
      this.searchMetaLoading = true
      try {
        const url = 'https://registry.npmmirror.com/' + encodeURIComponent(item.name)
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const pkg = await res.json()
        const meta = (pkg.versions && pkg.versions[item.version]) || {}
        const pick = value => {
          if (!value) return ''
          if (typeof value === 'string') return value
          if (typeof value === 'object') return value.default || value.import || value.require || ''
          return ''
        }
        const file = (pick(meta.unpkg) || pick(meta.jsdelivr) || pick(meta.browser)
          || pick(meta.main) || pick(meta.module) || '')
          .replace(/^\.\//, '')
          .replace(/^\//, '')
        if (current && seq === this.searchMetaSeq) {
          if (!this.searchForm.file) this.searchForm.file = file
          if (!file) this.showToastMessage('未找到推荐文件，请手动填写 filename')
        }
      } catch (e) {
        if (current && seq === this.searchMetaSeq) this.showToastMessage('获取文件信息失败，请手动填写 filename')
      } finally {
        if (seq === this.searchMetaSeq) this.searchMetaLoading = false
      }
    },
    saveCustomLibFromForm() {
      const name = this.searchForm.name.trim()
      const version = this.searchForm.version.trim()
      const file = this.searchForm.file.trim().replace(/^\.\//, '').replace(/^\//, '')
      if (!name || !version || !file) return this.showToastMessage('请填写 name / version / filename')
      const existed = !!this.customLib
      this.customLib = { name, version, file, zname: name, isCustom: true, size: '' }
      this.customLibKeyword = name
      localStorage.setItem('cdn-customLib', JSON.stringify({ name, version, file }))
      this.closeSearchDialog()
      this.showToastMessage(existed ? '已更新自定义库' : '已添加自定义库')
    },
    removeCustomLib() {
      this.customLib = null
      this.customLibKeyword = ''
      localStorage.removeItem('cdn-customLib')
      this.closeSearchDialog()
      this.showToastMessage('已移除自定义库')
    },
    detailUrl(item) {
      if (item.source === 'cdnjs') {
        const base = 'https://cdnjs.com/libraries/' + encodeURIComponent(item.name)
        return item.version ? base + '/' + encodeURIComponent(item.version) : base
      }
      if (item.source === 'npmmirror') {
        return 'https://npmmirror.com/package/' + encodeURIComponent(item.name)
      }
      return '#'
    },
    npmUrl(item) {
      return 'https://www.npmjs.com/package/' + item.name
    },
    npmxUrl(item) {
      return 'https://npmx.dev/package/' + item.name
    },
    formatCount(num) {
      if (!num) return '-'
      return num >= 10000 ? (num / 10000).toFixed(1) + '万' : String(num)
    },
    async getFileSize(lib, url) {
      const name = (lib.zname || lib.name) + '-' + lib.version
      if (this.sizeMap[name]) return this.showToastMessage(this.sizeMap[name], 3000)
      let size = await this.fileSize(url)
      if (!size) return this.showToastMessage('获取文件大小失败')
      this.showToastMessage(size, 3000)
      this.sizeMap[name] = size
      localStorage.setItem('cdn-sizeMap', JSON.stringify(this.sizeMap))
    },
    async fileSize(url) {
      let size = ''
      try {
        let res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          const len = res.headers.get('Content-Length');
          if (len) size += Math.round(parseInt(len, 10) / 1024) + 'KB(gzip)，';
        }
        res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        const blob = await res.blob();
        size += Math.round(blob.size / 1024) + 'KB';
      } catch (e) {
        console.error('获取文件大小失败:', e);
        return size || null;
      }
      return size;
    },
    showToastMessage(message, time = 2000) {
      clearTimeout(this.timer)
      this.toastMessage = message
      this.showToast = true
      this.timer = setTimeout(() => this.showToast = false, time)
    },
    generateTemplate() {
      const templates = {
        vue2: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 2 项目</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <!-- 引入 Element UI 样式 -->
    <link rel="stylesheet" href="${this.getCdnUrl('element-ui', '2.15.14', 'theme-chalk/index.css')}">
</head>
<body>
    <div id="app" v-cloak>
        <el-container>
            <el-header>Vue 2 + Element UI  {{ message }}</el-header>
            <el-main>
                <el-button type="primary">Hello World</el-button>
            </el-main>
            <div><i class="el-icon-delete"></i><el-button type="primary" icon="el-icon-search">搜索</el-button></div>
        </el-container>
    </div>

    <!-- 引入 Vue 2 -->
    <script src="${this.getCdnUrl('vue', '2.7.16', 'vue.min.js')}"></script>
    <!-- 引入 Element UI -->
    <script src="${this.getCdnUrl('element-ui', '2.15.14', 'index.js')}"></script>
    <script>
        var vueApp = new Vue({
            el: '#app',
            data() {
                return {
                    message: 'Hello Vue 2!'
                }
            }
        });
    </script>
</body>
</html>`,

        vue3: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 3 项目</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <!-- 引入 Element Plus 样式 -->
    <link rel="stylesheet" href="${this.getCdnUrl('element-plus', '2.10.6', 'index.css')}">
</head>
<body>
    <div id="app" v-cloak>
        <el-container>
            <el-header>Vue 3 + Element Plus {{ message }}</el-header>
            <el-main>
                <el-button type="primary">Hello World</el-button>
                <div><el-icon><Copy-Document /></el-icon></div>
            </el-main>
        </el-container>
    </div>

    <!-- 引入 Vue 3 -->
    <script src="${this.getCdnUrl('vue', '3.5.17', 'vue.global.prod.js')}"></script>
    <!-- 引入 Element Plus -->
    <script src="${this.getCdnUrl('element-plus', '2.10.6', 'index.full.min.js')}"></script>
    <script src="${this.getCdnUrl('element-plus-icons-vue', '2.3.2', 'index.iife.min.js')}"></script>
    <script>
        const app = Vue.createApp({
            data() {
                return {
                    message: 'Hello Vue 3!'
                };
            }
        });

        app.use(ElementPlus);
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
          app.component(key, component)
        }
        var vueApp = app.mount('#app');
    </script>
</body>
</html>`,

        layui: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layui 项目</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <!-- 引入 Layui 样式 -->
    <link rel="stylesheet" href="${this.getCdnUrl('layui', '2.8.18', 'css/layui.css')}">
</head>
<body>
    <div class="layui-layout layui-layout-admin">
        <div class="layui-header">
            <div class="layui-logo">Layui 后台布局</div>
        </div>
        <div class="layui-side layui-bg-black">
            <div class="layui-side-scroll">
                <!-- 左侧导航区域 -->
                <ul class="layui-nav layui-nav-tree">
                    <li class="layui-nav-item"><a>导航一</a></li>
                    <li class="layui-nav-item"><a>导航二</a></li>
                </ul>
            </div>
        </div>
        <div class="layui-body">
            <div style="padding: 15px;">
                <button class="layui-btn">一个标准的按钮</button>
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">时间</label>
                        <div class="layui-input-block">
                            <input type="text" name="outdate" value="" id="outdate" placeholder="请选择时间" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div style="width: 600px;" id="calendar"></div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <button class="layui-btn" lay-submit>立即提交</button>
                            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- 引入 Layui -->
    <script src="${this.getCdnUrl('layui', '2.8.18', 'layui.js')}"></script>
    <script>
        layui.use(['layer', 'form', 'laydate'], function(){
            var layer = layui.layer;
            var form = layui.form;
            var laydate = layui.laydate;
            
            layer.msg('Hello Layui!');

            laydate.render({
                elem: '#outdate' // 元素id选择器
                //,theme: '#393D49' //主题颜色
                ,type: 'datetime' //date:无时分秒, datetime:有时分秒  
                ,value: new Date() //初始赋值 new Date()
                ,format: 'yyyy-MM-dd HH:mm' //日期格式化
                ,trigger: 'click'
            });
        });
    </script>
</body>
</html>`,

        basic: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <title>基础 HTML 模板</title>
    <style>
        body { margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; background: #fff; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="container">
        <h1>欢迎使用基础模板</h1>
        <p>这是一个基础的 HTML5 模板，您可以在此基础上进行开发。</p>
        <button onclick="alert('Hello World!')">点击我</button>
    </div>

    <!-- 引入 jQuery -->
    <script src="${this.getCdnUrl('jquery', '3.7.1', 'jquery.min.js')}"></script>
    <script>
        $(document).ready(function() {
            console.log('页面加载完成');
        });
    </script>
</body>
</html>`,
        loading: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <title>管理系统</title>
    <style>
        html, body, #app{ height: 100%; margin: 0px; padding: 0px;}
        #loader-wrapper{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999999; background: rgba(0, 133, 208, 0.122);
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; }
        #laoder{ display: flex; gap: 8px;}
        #laoder i{ width: 16px; height: 16px; background-color: #33adff; border-radius: 50%; animation: bounce 1.4s ease-in-out infinite both;}
        #laoder i:nth-child(1) { animation-delay: -0.32s; }
        #laoder i:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0);} 
            40% { transform: scale(1.0); }
        }
  </style>
</head>
<body>
    <div id="app">
      <div id="loader-wrapper">
        <div id="laoder"><i></i><i></i><i></i></div>
        <div class="load_title">正在加载系统资源，请耐心等待...</div>
      </div>
    </div>
</body>
</html>`,
      }

      this.htmlTemplate = templates[this.selectedTemplate] || ''
      this.$nextTick(() => Prism.highlightAll())
    },
    previewUrl(html) {
      // const dataUri = "data:text/html;charset=utf-8," + encodeURIComponent(html);
      const dataUri = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
      window.open(dataUri); // , "_blank", `width=${screen.width * 0.8},height=${screen.height * 0.8},left=${screen.width * 0.1},top=${screen.height * 0.1},resizable=yes,scrollbars=yes,status=yes`
    },
  }
}).mount('#app')

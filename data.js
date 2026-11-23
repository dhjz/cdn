const localBase = (() => {
  const loc = (typeof window !== 'undefined' && window.location) ? window.location : { origin: '', pathname: '/', protocol: 'http:' }
  const { origin, pathname, protocol } = loc
  const lastSlash = pathname.lastIndexOf('/')
  const tail = pathname.slice(lastSlash + 1)
  const dir = tail.includes('.')
    ? pathname.slice(0, lastSlash + 1)
    : pathname.endsWith('/') ? pathname : pathname + '/'
  return protocol === 'file:' ? '' : origin + dir
})()

window.cdnData = {
  version: '20261123',
  cdn: [
    { name: 'local', url: localBase + 'libs/#name/#version/#file' },
    { name: 'cdnjs', url: 'https://cdnjs.cloudflare.com/ajax/libs/#name/#version/#file' },
    { name: '南科大镜像', url: 'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/#name/#version/#file' },
    { name: 'jsDelivr', url: 'https://cdn.jsdelivr.net/npm/#name@#version/#file' },
    { name: 'fastlyDe', url: 'https://fastly.jsdelivr.net/npm/#name@#version/#file' },
    { name: 'zstatic', url: 'https://s4.zstatic.net/ajax/libs/#name/#version/#file' },
    { name: 'staticfile', url: 'https://cdn.staticfile.net/#name/#version/#file' },
    { name: 'Unpkg', url: 'https://unpkg.com/#name@#version/#file' },
    { name: 'Esm', url: 'https://esm.sh/#name@#version/#file' },
    { name: 'npmmirror-dist', url: 'https://registry.npmmirror.com/#name/#version/files/dist/#file' },
    { name: 'npmmirror', url: 'https://registry.npmmirror.com/#name/#version/files/#file' },
    { name: 'staticfile', url: 'https://cdn.staticfile.net/#name/#version/#file' },
    { name: 'BootCDN', url: 'https://cdn.bootcdn.net/ajax/libs/#name/#version/#file' },
  ],
  libs: [
    { name: 'vue', version: '3.5.46', file: 'vue.global.prod.js', zname: 'vue3', size: '170KB' },
    { name: 'vue', version: '2.7.16', file: 'vue.min.js', zname: 'vue2', size: '105KB' },
    { name: 'element-ui', version: '2.15.14', file: 'index.min.js', size: '641KB' },
    { name: 'element-ui', version: '2.15.14', file: 'theme-chalk/index.min.css', zname: 'element-ui-css', size: '234KB' },
    { name: 'element-plus', version: '2.14.8', file: 'index.full.min.js', size: '1041KB' },
    { name: 'element-plus', version: '2.14.8', file: 'index.min.css', zname: 'element-plus-css', size: '355KB' },
    { name: 'element-plus-icons-vue', version: '2.3.2', file: 'index.iife.min.js', size: '202KB' },
    { name: 'blueimp-md5', version: '2.19.0', file: 'js/md5.min.js', size: '4KB' },
    { name: 'axios', version: '1.21.1', file: 'axios.min.js', size: '75KB' },
    { name: 'lodash.js', version: '4.18.1', file: 'lodash.min.js', size: '72KB' },
    { name: 'dayjs', version: '1.11.23', file: 'dayjs.min.js', size: '7KB' },
    { name: 'qrcodejs', version: '1.0.0', file: 'qrcode.min.js', size: '19KB' },
    { name: 'moment.js', version: '2.31.0', file: 'moment.min.js', size: '59KB' },
    { name: 'FileSaver.js', version: '2.0.5', file: 'FileSaver.min.js', size: '3KB' },
    { name: 'jszip', version: '3.10.2', file: 'jszip.min.js', size: '95KB' },
    { name: 'crypto-js', version: '4.2.0', file: 'crypto-js.min.js', size: '59KB' },
    { name: 'mousetrap', version: '1.6.5', file: 'mousetrap.min.js', size: '5KB' },
    { name: 'jquery', version: '4.1.0', file: 'jquery.min.js', size: '77KB' },
    { name: 'prism', version: '1.30.0', file: 'prism.min.js', size: '19KB' },
    { name: 'prism', version: '1.30.0', file: 'themes/prism.min.css', zname: 'prism-css', size: '2KB' },
    { name: 'marked', version: '18.2.1', file: 'lib/marked.umd.min.js', size: '50KB' },
    { name: 'pako', version: '3.0.3', file: 'browser/pako.umd.min.js', size: '45KB' },
    { name: 'localforage', version: '1.10.0', file: 'localforage.min.js', size: '29KB' },
    { name: 'bootstrap', version: '5.3.9', file: 'js/bootstrap.bundle.min.js', size: '79KB' },
    { name: 'font-awesome', version: '6.7.2', file: 'css/all.min.css', size: '72KB' },
    { name: 'echarts', version: '5.4.3', file: 'echarts.min.js', size: '1001KB' },
    { name: 'Chart.js', version: '4.6.1', file: 'chart.min.js', size: '163KB' },
    { name: 'd3', version: '7.9.2', file: 'd3.min.js', size: '274KB' },
    { name: 'hls.js', version: '1.7.4', file: 'hls.min.js', size: '609KB' },
    { name: 'artplayer', version: '5.4.0', file: 'artplayer.min.js', size: '130KB' },
    { name: 'highlight.js', version: '11.12.0', file: 'highlight.min.js', zname: 'highlight', size: '126KB' },
    { name: 'highlight.js', version: '11.12.0', file: 'styles/atom-one-dark.min.css', zname: 'highlight-css', size: '1KB' },
    { name: 'dompurify', version: '3.5.0', file: 'purify.min.js', zname: 'DOMPurify', size: '30KB' },
    { name: 'xlsx', version: '0.18.5', file: 'xlsx.full.min.js', zname: 'SheetJS', size: '861KB' },
    { name: 'mermaid', version: '12.3.0', file: 'mermaid.min.js', zname: 'Mermaid', size: '5408KB' },
    { name: 'flv.js', version: '1.6.2', file: 'flv.min.js', size: '141KB' },
  ],
  fix: {
    sustech: {
      'vue3': '3.5.22',
      'element-plus': '2.11.4',
      'element-plus-css': '2.11.4',
      'axios': '1.11.0',
      'lodash.js': '4.17.21',
      'dayjs': '1.11.18',
      'moment.js': '2.30.1',
      'jszip': '3.10.1',
      'jquery': '3.7.1',
      'marked': '16.3.0',
      'pako': { version: '2.1.0', file: 'pako.min.js' },
      'bootstrap': '5.3.8',
      'Chart.js': '4.5.0',
      'd3': '7.9.0',
      'hls.js': '1.6.13',
      'artplayer': '5.3.0',
      'highlight': '11.11.1',
      'highlight-css': '11.11.1',
      'DOMPurify': '3.2.7',
      'Mermaid': '11.12.0'
    }
  }
}

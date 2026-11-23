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
    { name: 'vue', version: '3.5.46', file: 'vue.global.prod.js', zname: 'vue3', size: '169.99 KB' },
    { name: 'vue', version: '2.7.16', file: 'vue.min.js', zname: 'vue2', size: '105.16 KB' },
    { name: 'element-ui', version: '2.15.14', file: 'index.min.js', size: '640.77 KB' },
    { name: 'element-ui', version: '2.15.14', file: 'theme-chalk/index.min.css', zname: 'element-ui-css', size: '234.38 KB' },
    { name: 'element-plus', version: '2.14.8', file: 'index.full.min.js', size: '1041.01 KB' },
    { name: 'element-plus', version: '2.14.8', file: 'index.min.css', zname: 'element-plus-css', size: '354.89 KB' },
    { name: 'element-plus-icons-vue', version: '2.3.2', file: 'index.iife.min.js', size: '201.66 KB' },
    { name: 'blueimp-md5', version: '2.19.0', file: 'js/md5.min.js', size: '3.66 KB' },
    { name: 'axios', version: '1.21.1', file: 'axios.min.js', size: '75.21 KB' },
    { name: 'lodash.js', version: '4.18.1', file: 'lodash.min.js', size: '71.58 KB' },
    { name: 'dayjs', version: '1.11.23', file: 'dayjs.min.js', size: '6.99 KB' },
    { name: 'qrcodejs', version: '1.0.0', file: 'qrcode.min.js', size: '19.46 KB' },
    { name: 'moment.js', version: '2.31.0', file: 'moment.min.js', size: '59.46 KB' },
    { name: 'FileSaver.js', version: '2.0.5', file: 'FileSaver.min.js', size: '2.68 KB' },
    { name: 'jszip', version: '3.10.2', file: 'jszip.min.js', size: '95.49 KB' },
    { name: 'crypto-js', version: '4.2.0', file: 'crypto-js.min.js', size: '59.39 KB' },
    { name: 'mousetrap', version: '1.6.5', file: 'mousetrap.min.js', size: '4.87 KB' },
    { name: 'jquery', version: '4.1.0', file: 'jquery.min.js', size: '77.11 KB' },
    { name: 'prism', version: '1.30.0', file: 'prism.min.js', size: '18.59 KB' },
    { name: 'prism', version: '1.30.0', file: 'themes/prism.min.css', zname: 'prism-css', size: '1.75 KB' },
    { name: 'marked', version: '18.2.1', file: 'lib/marked.umd.min.js', size: '50.26 KB' },
    { name: 'pako', version: '3.0.3', file: 'browser/pako.umd.min.js', size: '44.77 KB' },
    { name: 'localforage', version: '1.10.0', file: 'localforage.min.js', size: '29.01 KB' },
    { name: 'bootstrap', version: '5.3.9', file: 'js/bootstrap.bundle.min.js', size: '78.78 KB' },
    { name: 'font-awesome', version: '6.7.2', file: 'css/all.min.css', size: '72.16 KB' },
    { name: 'echarts', version: '5.4.3', file: 'echarts.min.js', size: '1000.72 KB' },
    { name: 'Chart.js', version: '4.6.1', file: 'chart.min.js', size: '163.37 KB' },
    { name: 'd3', version: '7.9.2', file: 'd3.min.js', size: '274.04 KB' },
    { name: 'hls.js', version: '1.7.4', file: 'hls.min.js', size: '609.29 KB' },
    { name: 'artplayer', version: '5.4.0', file: 'artplayer.min.js', size: '130.44 KB' },
    { name: 'highlight.js', version: '11.12.0', file: 'highlight.min.js', zname: 'highlight', size: '126.22 KB' },
    { name: 'highlight.js', version: '11.12.0', file: 'styles/atom-one-dark.min.css', zname: 'highlight-css', size: '0.84 KB' },
    { name: 'dompurify', version: '3.5.0', file: 'purify.min.js', zname: 'DOMPurify', size: '30.12 KB' },
    { name: 'xlsx', version: '0.18.5', file: 'xlsx.full.min.js', zname: 'SheetJS', size: '861.06 KB' },
    { name: 'mermaid', version: '12.3.0', file: 'mermaid.min.js', zname: 'Mermaid', size: '5408.04 KB' },
    { name: 'flv.js', version: '1.6.2', file: 'flv.min.js', size: '140.79 KB' },
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

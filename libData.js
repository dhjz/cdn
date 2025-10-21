const mirrors = [
  {
    name: '镜像库',
    description: '各大镜像库地址',
    color: '#667eea',
    sources: [
      { name: '阿里镜像', url: 'https://developer.aliyun.com/mirror/' },
      { name: '淘宝镜像', url: 'https://registry.npmmirror.com/binary.html' },
      { name: '腾讯镜像', url: 'https://mirrors.cloud.tencent.com/' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/' },
      { name: '中科大镜像', url: 'https://mirrors.ustc.edu.cn/' },
      { name: '清华镜像', url: 'https://mirrors.tuna.tsinghua.edu.cn/' },
      { name: '网易镜像', url: 'http://mirrors.163.com' },
    ]
  },
  {
    name: 'Github加速',
    description: 'Github加速镜像地址',
    color: '#1e1e1f',
    sources: [
      { name: 'vvvv.ee', url: 'https://proxy.vvvv.ee/' },
      { name: 'jsdmirror', url: 'https://cdn.jsdmirror.com/#converter' },
      { name: 'gh-proxy', url: 'https://gh-proxy.com' },
      { name: 'free-cn', url: 'https://free.cn.eu.org/' },
      { name: '739999', url: 'https://hubproxy.739999.xyz/' },
      { name: '1888866', url: 'https://ghproxy.1888866.xyz/' },
      { name: 'mogg.cc', url: 'https://docker.mogg.cc/' },
    ]
  },
  {
    name: 'Node.js',
    description: 'JavaScript运行时环境',
    color: '#339933',
    sources: [
      { name: '阿里镜像', url: 'https://npmmirror.com/mirrors/node/' },
      { name: '腾讯镜像', url: 'https://mirrors.cloud.tencent.com/nodejs-release/' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/nodejs/' },
      { name: '中科大镜像', url: 'https://mirrors.ustc.edu.cn/node/' },
      { name: '清华镜像', url: 'https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/' },
      { name: '源地址', url: 'https://nodejs.org/dist/' },
    ]
  },
  {
    name: 'npm',
    description: 'Node.js包管理器',
    color: '#cb3837',
    sources: [
      { name: '淘宝镜像', url: 'https://registry.npmmirror.com/' },
      { name: '腾讯镜像', url: 'https://mirrors.cloud.tencent.com/npm/' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/repository/npm/' },
      { name: '中科大镜像', url: 'https://npmreg.mirrors.ustc.edu.cn/' },
      { name: '源地址', url: 'https://registry.npmjs.org/' },
    ]
  },
  {
    name: 'Go',
    description: 'Go语言模块代理',
    color: '#00add8',
    sources: [
      { name: '七牛镜像', url: 'https://goproxy.cn,direct' },
      { name: '阿里镜像', url: 'https://mirrors.aliyun.com/goproxy/' },
      { name: '阿里下载', url: 'https://mirrors.aliyun.com/golang/' },
      { name: '腾讯镜像', url: 'https://mirrors.tencent.com/go/' },
      { name: '百度镜像', url: 'https://goproxy.bj.bcebos.com/' },
      { name: '华为镜像', url: 'https://repo.huaweicloud.com/repository/goproxy/' },
      { name: '清华下载', url: 'https://mirrors.ustc.edu.cn/golang/' },
      { name: '中科大下载', url: 'https://mirrors.ustc.edu.cn/golang/' },
      { name: '官方代理', url: 'https://goproxy.io,direct' },
    ]
  },
  {
    name: 'Docker',
    description: '容器镜像仓库',
    color: '#2496ed',
    sources: [
      { name: '1pannel汇总', url: 'https://status.1panel.top/status/docker' },
      { name: 'hub镜像搜索', url: 'https://docker.aityp.com/' },
      { name: 'hub镜像搜索', url: 'https://registry.cyou/' },
      { name: '毫秒镜像', url: 'https://docker.1ms.run' },
      { name: '毫秒镜像', url: 'https://ghcr.1ms.run' },
      { name: '1pannel', url: 'https://docker.1panel.live' },
      { name: '1pannel', url: 'https://dockerproxy.1panel.live' },
      { name: 'dockerpull', url: 'https://dockerpull.pw/' },
      { name: 'ketches', url: 'https://docker.ketches.cn' },
      { name: '其他', url: 'https://hub.rat.dev' },
      { name: 'daocloud', url: 'https://docker.m.daocloud.io' },
      { name: '棉花云', url: 'https://hub1.nat.tf' },
      { name: '一键换源', url: 'https://linuxmirrors.cn/' },
    ]
  },
  {
    name: 'Python',
    description: 'Python包索引镜像',
    color: '#3776ab',
    sources: [
      { name: '阿里镜像', url: 'https://mirrors.aliyun.com/pypi/simple/' },
      { name: '阿里下载', url: 'https://mirrors.aliyun.com/python-release' },
      // { name: '豆瓣镜像', url: 'https://pypi.douban.com/simple/'},
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/repository/pypi/simple' },
      { name: '华为下载', url: 'https://mirrors.huaweicloud.com/python' },
      { name: '中科大镜像', url: 'https://pypi.mirrors.ustc.edu.cn/simple/' },
      { name: '中科大下载', url: 'https://mirrors.ustc.edu.cn/python/' },
      { name: '清华镜像', url: 'https://pypi.tuna.tsinghua.edu.cn/simple/' },
    ]
  },
  {
    name: 'Maven',
    description: 'Java项目管理工具',
    color: '#c71a36',
    sources: [
      { name: '阿里镜像', url: 'https://maven.aliyun.com/repository/public' },
      { name: '阿里多库', url: 'https://maven.aliyun.com/mvn/guide' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/repository/maven/' },
      { name: '腾讯镜像', url: 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' },
      { name: '网易镜像', url: 'http://mirrors.163.com/maven/repository/maven-public/' },
    ]
  },
  {
    name: 'Ubuntu',
    description: 'Ubuntu软件源',
    color: '#e95420',
    sources: [
      { name: '阿里镜像', url: 'https://mirrors.aliyun.com/ubuntu/' },
      { name: '清华镜像', url: 'https://mirrors.tuna.tsinghua.edu.cn/ubuntu/' },
      { name: '中科大镜像', url: 'https://mirrors.ustc.edu.cn/ubuntu/' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/ubuntu/' },
      { name: '网易镜像', url: 'http://mirrors.163.com/ubuntu/' },
    ]
  },
  {
    name: 'CentOS',
    description: 'CentOS软件源',
    color: '#932279',
    sources: [
      { name: '阿里镜像', url: 'https://mirrors.aliyun.com/centos/' },
      { name: '清华镜像', url: 'https://mirrors.tuna.tsinghua.edu.cn/centos/' },
      { name: '中科大镜像', url: 'https://mirrors.ustc.edu.cn/centos/' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/centos/' },
      { name: '网易镜像', url: 'http://mirrors.163.com/centos/' },
    ]
  },
  {
    name: 'Debian',
    description: 'Debian软件源',
    color: '#d70a53',
    sources: [
      { name: '阿里镜像', url: 'https://mirrors.aliyun.com/debian/' },
      { name: '清华镜像', url: 'https://mirrors.tuna.tsinghua.edu.cn/debian/' },
      { name: '中科大镜像', url: 'https://mirrors.ustc.edu.cn/debian/' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/debian/' },
      { name: '网易镜像', url: 'http://mirrors.163.com/debian/' },
    ]
  },
  {
    name: 'Alpine Linux',
    description: 'Alpine Linux软件源',
    color: '#0d597f',
    sources: [
      { name: '阿里镜像', url: 'https://mirrors.aliyun.com/alpine/' },
      { name: '清华镜像', url: 'https://mirrors.tuna.tsinghua.edu.cn/alpine/' },
      { name: '中科大镜像', url: 'https://mirrors.ustc.edu.cn/alpine/' },
      { name: '华为镜像', url: 'https://mirrors.huaweicloud.com/alpine/' },
      { name: '网易镜像', url: 'http://mirrors.163.com/alpine/' },
    ]
  }
]
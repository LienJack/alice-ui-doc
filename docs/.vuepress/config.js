module.exports = {
  base:'/alice-ui-doc-online/',
  title: 'Alice-UI',
  description: '一个VUE移动端的UI框架',
  themeConfig: {
    nav: [
      { text: '主页', link: '/component/'},
      { text: '个人博客', link: 'https://lienjack.github.io/Blog/'},
      { text: 'GitHub', link: 'https://github.com/LienJack/alice-ui'}
    ],
    sidebar: {
      '/component/': [
        {
          title: '使用手册',
          children: [
            '',
            '01.button',
            '02.icon',
            '03.navBar',
            '04.cell',
            '05.collapse',
            '06.checkbox',
            '07.radio',
            '08.switch',
            '09.slider',
            '10.popup',
            '11.dialog',
            '12.tabs',
            'utils'
          ]
        }
      ]
    }
  }
}
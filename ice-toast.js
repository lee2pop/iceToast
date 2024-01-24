let iceToast = {
  help:{
    version: '1.4',
    author: 'lee2pop',
    author_github: 'https://github.com/lee2pop',
    author_note: '',
  },
  baseConfig:{
    position: 'top-center', /* position for global box */
    time: 4000, /* how long keeps for per item */
    push_before: 0, /* 0 - push item in before, 1 push item in after*/
    colors:{
      'default': 'rgba(50,50,50,0.9)',
      'blue': '#0077E8',
      'green': '#22B166',
      'red': '#D74931',
      'yellow': '#FFA916',
      /* → you can add another coler here */ 
    },
  },
  setColor: function(name,c_value){
    let name_type = typeof name
    if(name_type === 'string'){
      this.baseConfig.colors[name] = c_value
    }
  },
  setPosition: function(class_name){

    // create the ul box if on the first push
    if (!this.domToastBox) {
      this.initDom()
    }

    if(typeof class_name === 'string'){
      this.domToastBox.className = this.domToastBox.className.replace(' top-center', '').replace(' top-right', '').replace(' bottom-right', '')
      this.domToastBox.className = this.domToastBox.className + ' '+ class_name
    }
  },
  domToastBox: null,
  initDom(){
    let dom_ul = document.createElement('ul')
      dom_ul.className = 'ice-toast-box custom ' + this.baseConfig.position
      document.body.appendChild(dom_ul)
      this.domToastBox = dom_ul

      let dom_style = document.createElement('style')
      dom_style.innerHTML = this.style
      document.body.appendChild(dom_style)
  },
  push: function(xx){

    // create the ul box if on the first push
    if (!this.domToastBox) {
      this.initDom()
    }

    // select ul dom
    let ul = this.domToastBox

    // prepare params for li
    let words = ''
    let bgcolor = 'default'
    let time = this.baseConfig.time

    // handel xx type
    let xx_type = typeof xx
    if(!xx_type || xx_type === 'string' || xx_type === 'number'){
      words = xx
    }else if(xx_type === 'object'){
      words = xx.words
      if (xx.bgcolor) bgcolor = xx.bgcolor
      if (xx.time) time = xx.time
    }

    // show li in the dom
    let li = document.createElement('li')

    li.innerHTML = 
      `<div class="ice-toast" style="` +
      (bgcolor ? `background: ${this.baseConfig.colors[bgcolor]};` : ``) +
      `">${words}</div>`

    // dom push
    if (this.baseConfig.push_before && ul.children.length > 0){
      ul.insertBefore(li, ul.children[0])
    }else{
      ul.appendChild(li)
    }

    // remove li in the dom
    this.remove(ul,li,time)
    
  },
  remove(ul,li,time){
    li.style.height = li.clientHeight + 'px'
    setTimeout(function () {
      li.classList.add('li-height-0')
    }, time - 300 > 0 ? time - 300 : 0)
    setTimeout(function(){
      ul.removeChild(li)
    },time)
  },
  style: [
    `/* ↓ you can edit the width */
    :root{
      --ice-toast-box-width: 350px;
    }
    .ice-toast-box{
      font-size: 14px;
      list-style: none;
      position: fixed;
      box-sizing: border-box;
      margin: 0;
      padding: 0px;
      width: var(--ice-toast-box-width);
      max-width: 100%;
      margin: 0 auto;
      text-align: center;
      z-index: 10;
    }
    .ice-toast-box.top-center{
      top: 30px;
      left: 50%;
      margin-left: calc( var(--ice-toast-box-width) / -2 );
    }
    .ice-toast-box.top-right{
      top: 30px;
      right: 30px;
      left: auto;
    }
    .ice-toast-box.bottom-right{
      top: auto;
      bottom: 30px;
      right: 30px;
      left: auto;
    }
    .ice-toast-box li{
      padding-top: 5px;
      padding-bottom: 5px;
      box-sizing: border-box;
    }
    .ice-toast-box li.li-height-0{
      height: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      transition: all 0.3s ease;
      opacity: 0;
      overflow: hidden;
    }
    .ice-toast-box li.li-height-0 .ice-toast{
      transform: scley(0);
    }
    .ice-toast-box .ice-toast{
      box-sizing: border-box;
      padding: 10px 20px;
      background-color: rgba(50,50,50,0.9);
      color: #fff;
      border-radius: 10px;
      text-align: center;
      animation: ice-toast-anim-popin 0.2s;
    }

    /* ↓ you can edit the animation */
    @keyframes ice-toast-anim-popin {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }
    `
  ],
}

/*↓ you can export it if you need */
// export default iceToast;
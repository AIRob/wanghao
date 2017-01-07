// page/one/index.js
Page({
  data:{
    startmark:0,
    endmark:0,
    open:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  tap_start:function(e){
   this.setData({
      endmark  : e.touches[0].pageX,
      startmark  : e.touches[0].pageX
   })
   console.log(this.data.endmark)
   console.log(this.data.startmark)
  },
  tap_drag:function(e){
    
    this.setData({
     endmark : e.touches[0].pageX
    })
    if(this.data.endmark>this.data.startmark){
       this.setData({
         open:true
       })
    }else{
       this.setData({
         open:false
       })      
    }

  },
  tap_end:function(){
    console.log(this.data.endmark)
    console.log(this.data.startmark)
    
    if(this.data.open){
      this.setData({
        open:false
        
      })
    }else{
      this.setData({
        open:true
      })
    }
  }
})

$.extend({
    /*
     * @title  string or object{title:'',content:''}
     * @content string
     */
    _f_id:'',
    _all_msg:[],
    _f_width:0,
    _f_height:0,
    _checkMsg:function(){
        var tmp=this._all_msg;
        for(var i=0;i<tmp.length;i++){
             $('#'+tmp[i].id).css({
                    'z-index':10000,
            'display':'block',
            position:'fixed',
            right:'0px',
            'bottom':this._get_height(i)+'px'
                });
           
           
        }
    },
    _f_click:function(x){
       
            var tmp=$($(x).parents('div.float_layer')[0]);
            for(var i=0;i<this._all_msg.length;i++){
                if(this._all_msg[i].id===tmp.attr('id')){
                    this._all_msg[i].flag=false;
                }
            }
            tmp.remove();
           this._checkMsg();
     
    },
    msg:function(title,content){
        if(arguments.length<1){
            throw new Error('no enough arguments');
            return;
        }
        if(arguments.length<2){
            var title=arguments['title']||'';
            var content=arguments['content']||'';
        }
       
        var id=this._get_msg_id();
        var html='<div id="'+id+'" class="float_layer">'+
'<h2><b></b><a href="javascript:;" class="f_close" onclick="$._f_click(this)" /></h2>'+
'<div class="f_content"><span class="f_title">'+title+'</span><div class="f_wrap">'+content+'</div></div>'+
'</div>';
       // this._all_msg.push(id);
        $('body').append(html);
         if(this._all_msg.length<2){
             this._f_height=$('#'+id).height();
         }
        var w=$(document).width();
      
        
        this._checkMsg();
    },
    _get_height:function(n){
      
        var j=0;
        console.log(n);
        for(var i=0;i<=n;i++){
            if(this._all_msg[i].flag===false){
                j+=1;
            }
        }
        return (n-j)*this._f_height+5;
    },
    _get_msg_id:function(){
        var id='';
        if(this._all_msg.length<1){
              id='f_'+Math.ceil(Math.random()*1000000);
              this._f_id=id;
        }else{
            id=this._f_id+'_'+this._all_msg.length;  
        }
//       this._all_msg.push({
//            id:id,
//            flag:true
//        });
        this._all_msg.unshift({
            id:id,
            flag:true
        })
        return id;
        
    }
});
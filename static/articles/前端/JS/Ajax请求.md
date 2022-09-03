# 客服端

```js
window.onload = function winLoad(){
    var form = document.querySelector('form');
    var select = document.querySelector('select');
    var input = document.querySelector('input[type="text"]');
    var main = document.querySelector('main');
    var submit = document.querySelector('input[type="submit"]');
    var form_data = {};        

    var updata = (function (){
        var xhr = new XMLHttpRequest();                
        xhr.onload = ()=>{
            var section = JSON.parse(xhr.response);
            section.forEach((item)=>{
                var h = document.createElement('h');
                h.textContent = item.name;
                var p = document.createElement('p');
                p.textContent = '$' + item.price;
                var img = document.createElement('img');
                img.setAttribute('src', './images/'+item.image);
                var sectionELe = document.createElement('section');
                sectionELe.setAttribute('class', item.type);
                sectionELe.appendChild(h);
                sectionELe.appendChild(p);
                sectionELe.appendChild(img);
                main.appendChild(sectionELe);
            });
        }
    
        return function(url){            
            xhr.open('GET', url);
            xhr.responseType = 'json';            
            xhr.send(null);
        }        
    })();
    
    submit.addEventListener('click', function(event){
        event.preventDefault();
        var _this = this;                
        var str = '';
        (new FormData(form)).forEach((v,k)=>{
            form_data[k]=v;
            str += (k + '=' + v + '&');
        });
        str = '?'+str.slice(0,-1);
        updata(str);
    });
}
```


### 服务端

```js
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var products = null;
fs.readFile('./products.json', (err,data)=>{
    if(err){
        console.error(`读取products.json 出错:${err}`);
    }
    else{            
        products = data.toString();
        console.log(`读取products.json成功`);
    }
});

http.createServer(function(rqs, rsp){
    var path = url.parse(rqs.url).pathname;    
    var querys = url.parse(rqs.url).query;
    var keys_values = querystring.parse(querys);
    var keys = Object.keys(keys_values);
    
    console.log(`请求path: ${path}`);
    if(querys){
        console.log('响应keys');
        rsp.writeHead(200, {'Content-Type':'text/json'});
        rsp.write(JSON.stringify(products));
        rsp.end();
    }
    else if(path.indexOf('html')>-1 || path.indexOf('css')>-1 || path.indexOf('js')>-1){
        fs.readFile(path.substr(1), (err,data)=>{
            if(err){
                console.error(err);
            }
            else{
                console.log('响应path');
                rsp.writeHead(200, {'Content-Type':'text/html'});
                rsp.write(data.toString());
                rsp.end();
            }   
        });        
    }
    else if(path.indexOf('.jpg')>-1){
        console.log('响应images');
        rsp.writeHead(200, {'Content-Type':'image/jpg'});
        var imageFilePath = path.substr(1);
        
        var stream = fs.createReadStream( imageFilePath );
        var responseData = [];//存储文件流
        if (stream) {//判断状态
            stream.on( 'data', function( chunk ) {
            responseData.push( chunk );
            });
            stream.on( 'end', function() {
            var finalData = Buffer.concat( responseData );
            rsp.write( finalData );
            rsp.end();
            });
        }        
    }
    else{
        console.error('path is error!');
        rsp.writeHead(404, {'Content-Type':'text/html'});
        rsp.write('error');
        rsp.end();
    }    
}).listen(80);

console.log('Start server......');
```


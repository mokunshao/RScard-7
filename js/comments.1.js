!function(){
    
    let APP_ID = '9wfv4Ag972nBdC0W9kY8kzgA-gzGzoHsz';
    let APP_KEY = 'maQWEU7VfKW2rwnnoTYngsBi';
    
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    
    let query = new AV.Query('Comments');
    let form = document.querySelector('form');
    
    query.find().then(
        function(messages){
            let array = messages.map((items)=>{return items.attributes})
            array.forEach(element => {
                let li = document.createElement('li');
                li.innerText = `${element.name}：${element.content}`;    
                messagesList.append(li);
            });
        }
    )
    
    form.addEventListener('submit',function(e){
        e.preventDefault();
        let Comments = AV.Object.extend('Comments');
        let comments = new Comments();
        let content = document.querySelector('textarea').value;
        let name = document.querySelector('input[name=name]').value;
        if(name && content){
            comments.save({
                name: name,
                content: content
            }).then(function(object) {
                let li = document.createElement('li');
                li.innerText = `${name}：${content}`;    
                messagesList.append(li);
                document.querySelector('textarea').value = null;
            })
        }
    })

}.call()
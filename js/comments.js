!function(){
    let view = document.querySelector('section.comments');

    let model = {
        init: function(){
            let APP_ID = '9wfv4Ag972nBdC0W9kY8kzgA-gzGzoHsz';
            let APP_KEY = 'maQWEU7VfKW2rwnnoTYngsBi';            
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function(){
            let query = new AV.Query('Comments');
            return query.find();
        },
        save: function(name,content){
            let Comments = AV.Object.extend('Comments');
            let comments = new Comments();
            return comments.save({
                name: name,
                content: content
            })
        }
    }

    let controller = {
        view: null,
        model: null,
        form: null,
        messagesList: null,
        init: function(view,model){
            this.view = view,
            this.model = model,
            this.form = document.querySelector('form'),
            this.messagesList = document.querySelector('#messagesList')
            this.model.init(),
            this.loadMessages(),
            this.bindEvents()
        },
        loadMessages: function(){
            this.model.fetch().then(
                function(messages){
                    let array = messages.map((items) => {return items.attributes});
                    array.forEach(element => {
                        let li = document.createElement('li');
                        li.innerText = `${element.name}：${element.content}`;
                        messagesList.append(li);
                    });
                }
            )
        },
        bindEvents: function(){
            this.form.addEventListener('submit',(e) => {
                e.preventDefault();
                let content = document.querySelector('textarea').value;
                let name = document.querySelector('input[name=name]').value;
                if(name && content){
                    this.saveMessages();
                }
            })
        },
        saveMessages: function(){
            let content = document.querySelector('textarea').value;
            let name = document.querySelector('input[name=name]').value;
            this.model.save(name,content).then(() => {
                let li = document.createElement('li');
                li.innerText = `${name}：${content}`;   
                messagesList.append(li);
                document.querySelector('textarea').value = null;
            })
        }
    }

    controller.init.call(controller,view,model)

}.call()
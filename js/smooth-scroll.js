!function(){
    
    let view = document.querySelector('div#navBar > nav')
    
    let controller = {
        view: null,
        aTags: null,
        init: function(){
            this.view = view;
            this.initAnimation();
            this.bindEvents();
        },
        initAnimation: function(){
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);     
        },
        bindEvents: function(){
            let aTags = document.querySelectorAll("div#navBar > nav > ul > li > a")
            for(let i =0; i<aTags.length; i++){
                aTags[i].onclick = (x)=>{
                    x.preventDefault();
                    let a = x.currentTarget;
                    let href = a.getAttribute("href");
                    let element = document.querySelector(href);
                    this.scrollToElement(element);
                }
            }

        },
        scrollToElement: function(element){
            let top = element.offsetTop;
            let targetTop = top-80;
            let currentTop = window.scrollY;
            let distance = targetTop-currentTop;
            
            // 方案一
            // window.scrollTo(currentTop,targetTop);
            
            // 方案二
            // let stepNumber = 50; //多少个慢动作
            // let oneStepTime = 500/stepNumber; //多久搞一个慢动作
            // let oneStepDistance = distance/stepNumber; //一个慢动作的移动距离
            // let i =0;
            // let id=setInterval(()=>{
            //     if(i===stepNumber){
            //         window.clearInterval(id);
                    // return;
            //     }
            //     i=i+1;
            //     window.scrollTo(currentTop,currentTop+oneStepDistance*i);
            // },5)

            // 方案三
            let coords = {y: currentTop };
            let tween = new TWEEN.Tween(coords)
            .to({ y:targetTop }, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut) 
            .onUpdate(function() { 
                window.scrollTo(currentTop,coords.y)
            })
            .start();
        }
    }

    controller.init.call(controller,view);

}.call()
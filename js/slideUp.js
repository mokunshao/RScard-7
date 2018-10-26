!function(){

    let specialTags = document.querySelectorAll('[data-x]');
    for(let i = 0; i<specialTags.length; i++){
        specialTags[i].classList.add("moveDown")
    }

    let j = 0;

    function slideUpAndHightLight(){
        let specialTags = document.querySelectorAll('[data-x]');
        for(let i = 0; i < specialTags.length; i++){
            if ( Math.abs(specialTags[i].offsetTop-window.scrollY) < Math.abs(specialTags[j].offsetTop-window.scrollY)) {
                j = i;
            }
        }
        specialTags[j].classList.remove("moveDown");

        let id = specialTags[j].id;
        let a = document.querySelector(`a[href='#${id}']`);
        let $li = a.parentNode;
        let liList = $li.parentNode.children;
        for (let i = 0; i<liList.length; i++){
            liList[i].classList.remove("highLight");
        }
        $li.classList.add("highLight");
    }

    setTimeout(function(){
        slideUpAndHightLight();
    },500) 

    window.addEventListener('scroll',function(){
        slideUpAndHightLight();
    })

    let li = document.querySelectorAll("#navBar > nav > ul > li")
    for(let i = 0; i < li.length; i++){
        li[i].onmouseenter=function(x){
            x.currentTarget.classList.add("active");
        } 
        li[i].onmouseleave=function(x){
            x.currentTarget.classList.remove("active");
        } 
    }

}.call()
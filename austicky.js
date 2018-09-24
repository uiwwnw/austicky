;(function() {
    var root = this;
    var auSticky = {};
    auSticky.exScrollTop;
    auSticky.opt;
    var utils = (function() {
        var addEvnt = function(el, m, fn){
            el.addEventListener(m, fn);
        };
        var removeEvnt = function(el, m, fn){
            el.removeEventListener(m, fn);
        };
        var actSticky = function(scrollTop, direct, i) {
            var _actSticky = function() {
                var body = document.querySelector('body');
                if (direct) {
                    if(document.querySelector('[data-asticky="'+ Number(auSticky.idx)+'"]') === null) {
                        var _clone = body.appendChild(ctr.clone);
                        _clone.setAttribute('data-asticky', auSticky.idx);
                        _clone.classList.add(auSticky.opt.activeClassName);
                        ctr.el.setAttribute('data-margintop', ctr.marginTop);
                        _clone.setAttribute('style', 'margin-top:' + ctr.marginTop + 'px;');
                    }
                } else {
                    var _clone = document.querySelector('[data-asticky="'+ Number(auSticky.idx)+'"]');
                    ctr.el.removeAttribute('data-margintop');
                    (_clone !== null) && (body.removeChild(_clone));
                }
            };
            auSticky.idx = i === undefined ? auSticky.idx:i;
            var ctr = utils.ctr(auSticky.idx);
            if((scrollTop + ctr.marginTop > ctr.top) && direct) {
                (auSticky.elemList.length > auSticky.idx) && (_actSticky(), auSticky.idx++);
                (auSticky.idx === auSticky.elemList.length) && (auSticky.idx = auSticky.elemList.length - 1);
            };
            if((scrollTop + ctr.marginTop <= ctr.top) && !direct) {
                (auSticky.idx >= 0) && (_actSticky(), auSticky.idx--);
                (auSticky.idx === -1) && (auSticky.idx = 0);
            };
        };
        var scroll = function(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            auSticky.exScrollTop;
            var direct = scrollTop > auSticky.exScrollTop;
            if((auSticky.exScrollTop === undefined) && (scrollTop > 5)) {
                direct = true;
                for(var i = 0; i < auSticky.elemList.length;i++) {
                    utils.actSticky(scrollTop, direct, i);
                }
            };
            utils.actSticky(scrollTop, direct);
            auSticky.exScrollTop = scrollTop;
        };
        var ctr = function(i) {
            var ctr = {
                el: auSticky.elemList[i],
                top: auSticky.elemList[i].offsetTop,
                marginTop: auSticky.elemList[i - 1] === undefined?0:Number(auSticky.elemList[i - 1].getAttribute('data-margintop')) + Number(auSticky.elemList[i - 1].offsetHeight),
                clone: auSticky.elemList[i].cloneNode(true),
            };
            return ctr;
        };
        var opt = function(e) {
            var opt = {
                activeClassName: 'sticky'
            };
            opt = Object.assign(opt, e);
            return opt;
        };
        var initElem = function(e) {
            auSticky.elemNode = e;
            auSticky.elemList = document.querySelectorAll(auSticky.elemNode).length === 0?false:document.querySelectorAll(auSticky.elemNode);
        };
        var addElem = function(e) {
            auSticky.elemNode = auSticky.elemNode + ', ' + e;
            auSticky.elemList = document.querySelectorAll(auSticky.elemNode).length === 0?false:document.querySelectorAll(auSticky.elemNode);
        };
        var removeElem = function(e) {
            auSticky.elemNode = auSticky.elemNode.replace(e, '');
            auSticky.elemList = document.querySelectorAll(auSticky.elemNode).length === 0?false:document.querySelectorAll(auSticky.elemNode);
        };
        return {
            initElem: initElem,
            addElem: addElem,
            removeElem: removeElem,
            addEvnt: addEvnt,
            removeEvnt: removeEvnt,
            scroll: scroll,
            ctr: ctr,
            opt: opt,
            actSticky: actSticky
        }
    }());
    var AuSticky = function(e, opt) {
        auSticky.idx = 0;
        auSticky.opt = utils.opt(opt);
        utils.initElem(e);
        utils.addEvnt(window, 'scroll', utils.scroll);
        return {
            addElem: utils.addElem
        };
    };
    
    root.auSticky = AuSticky;
}());
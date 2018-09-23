;(function() {
    var root = this;
    var autoSticky = {};
    autoSticky.exScrollTop = 0;
    autoSticky.opt;
    var utils = (function() {
        var addEvnt = function(el, m, fn){
            el.addEventListener(m, fn);
        };
        var removeEvnt = function(el, m, fn){
            el.removeEventListener(m, fn);
        };
        var actSticky = function(ctr, direct) {
            var body = document.querySelector('body');
            if (direct) {
                var _clone = body.appendChild(ctr.clone);
                _clone.setAttribute('data-asticky', autoSticky.idx);
                _clone.classList.add(autoSticky.opt.activeClassName);
                ctr.el.setAttribute('data-margintop', ctr.marginTop);
                _clone.setAttribute('style', 'margin-top:' + ctr.marginTop + 'px;');
            } else {
                var _clone = document.querySelector('[data-asticky="'+ Number(autoSticky.idx)+'"]');
                (_clone !== null) && (body.removeChild(_clone));
            }
        };
        var scroll = function(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            autoSticky.exScrollTop;
            var direct = scrollTop > autoSticky.exScrollTop;
            var ctr = utils.ctr(autoSticky.idx);
            // console.log(direct, scrollTop + ctr.marginTop , ctr.top);
            if((scrollTop + ctr.marginTop > ctr.top) && direct) {
                (autoSticky.elemList.length - 1 > autoSticky.idx) && (utils.actSticky(ctr, direct), autoSticky.idx++);
            };
            if((scrollTop + ctr.marginTop < ctr.top) && !direct) {
                (autoSticky.idx >= 0) && (utils.actSticky(ctr, direct), autoSticky.idx--);
                (autoSticky.idx === -1) && (autoSticky.idx = 0);
            };
            autoSticky.exScrollTop = scrollTop;
        };
        var ctr = function(i) {
            var ctr = {
                el: autoSticky.elemList[i],
                top: autoSticky.elemList[i].offsetTop,
                marginTop: autoSticky.elemList[i - 1] === undefined?0:Number(autoSticky.elemList[i - 1].getAttribute('data-margintop')) + Number(autoSticky.elemList[i - 1].offsetHeight),
                clone: autoSticky.elemList[i].cloneNode(true),
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
            autoSticky.elemNode = e;
            autoSticky.elemList = document.querySelectorAll(autoSticky.elemNode).length === 0?false:document.querySelectorAll(autoSticky.elemNode);
        };
        var addElem = function(e) {
            autoSticky.elemNode = autoSticky.elemNode + ', ' + e;
            autoSticky.elemList = document.querySelectorAll(autoSticky.elemNode).length === 0?false:document.querySelectorAll(autoSticky.elemNode);
        };
        var removeElem = function(e) {
            autoSticky.elemNode = autoSticky.elemNode.replace(e, '');
            autoSticky.elemList = document.querySelectorAll(autoSticky.elemNode).length === 0?false:document.querySelectorAll(autoSticky.elemNode);
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
    var AutoSticky = function(e, opt) {
        autoSticky.idx = 0;
        autoSticky.opt = utils.opt(opt);
        utils.initElem(e);
        utils.addEvnt(window, 'scroll', utils.scroll);
        return {
            addElem: utils.addElem
        };
    };
    
    root.autoSticky = AutoSticky;
}());
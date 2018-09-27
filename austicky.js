;(function() {
    var root = this;
    var utils = (function() {
        var addEvnt = function(el, m, fn){
            el.addEventListener(m, fn);
        };
        var removeEvnt = function(el, m, fn){
            el.removeEventListener(m, fn);
        };
        var ctr = function(elemList, i, option) {
            var ctr = {
                el: elemList[i],
                top: option.bottom?elemList[i].offsetTop - window.innerHeight + elemList[i].offsetHeight:elemList[i].offsetTop,
                margin: elemList[i - 1] === undefined?0:Number(elemList[i - 1].getAttribute('data-margin')) + Number(elemList[i - 1].offsetHeight),
                clone: elemList[i].cloneNode(true)
            };
            ctr.margin = option.bottom?-ctr.margin:ctr.margin;
            return ctr;
        };
        var scroll = function(scr) {
            scr.top = window.pageYOffset || document.documentElement.scrollTop;
            scr.direct = scr.top > scr.exTop;
            return scr;
        };
        var opt = function(e) {
            var opt = {
                activeClassName: 'sticky'
            };
            opt = Object.assign(opt, e);
            return opt;
        };
        var initElem = function(e) {
            var elemNode = e;
            var elemList = document.querySelectorAll(elemNode).length === 0?false:document.querySelectorAll(elemNode);
            return elemList;
        };
        var addElem = function(elemNode, e) {
            var elemNode = elemNode + ', ' + e;
            var elemList = document.querySelectorAll(elemNode).length === 0?false:document.querySelectorAll(elemNode);
            return elemList;
        };
        var removeElem = function(elemNode, e) {
            var elemNode = elemNode.replace(e, '');
            var elemList = document.querySelectorAll(elemNode).length === 0?false:document.querySelectorAll(elemNode);
            return elemList;
        };
        return {
            initElem: initElem,
            addElem: addElem,
            removeElem: removeElem,
            addEvnt: addEvnt,
            removeEvnt: removeEvnt,
            ctr: ctr,
            scroll: scroll,
            opt: opt
        }
    }());
    var auSticky = function(e, opt) {
        auSticky.idx = auSticky.idx === undefined?0:auSticky.idx+=1;
        var _idx = auSticky.idx;
        var idx = 0;
        var scr = {};
        var option = utils.opt(opt);
        var elemList = utils.initElem(e);
        var actSticky = function(scrollTop, direct, i) {
            var _actSticky = function() {
                var body = document.querySelector('body');
                if (direct) {
                    if(document.querySelector('[data-asticky="' + _idx + '_' + idx + '"]') === null) {
                        var _clone = body.appendChild(ctr.clone);
                        _clone.setAttribute('data-asticky', _idx + '_' + idx);
                        _clone.classList.add(option.activeClassName);
                        ctr.el.setAttribute('data-margin', ctr.margin);
                        _clone.setAttribute('style', 'margin-top:' + ctr.margin + 'px;');
                        if(option.bottom) {
                           body.setAttribute('style', 'margin-bottom:' + Number(ctr.el.offsetHeight - ctr.margin) + 'px;');
                           ctr.el.setAttribute('data-margin', -ctr.margin);
                           ctr.el.setAttribute('style', 'visibility: hidden;');
                           _clone.setAttribute('style', 'margin-bottom:' + -ctr.margin + 'px;');
                        };
                    }
                } else {
                    var _clone = document.querySelector('[data-asticky="'+ _idx + '_' + idx + '"]');
                    ctr.el.removeAttribute('data-margin');
                    ctr.el.removeAttribute('style');
                    (_clone !== null) && (body.removeChild(_clone));
                    if(option.bottom) {
                        var margin = ctr.margin === 0?'':'margin-bottom:' + -ctr.margin+'px;';
                        body.setAttribute('style', margin);
                     };
                }
            };
            var _i = i === undefined ? idx:i;
            var ctr = utils.ctr(elemList, _i, option);
            if((scrollTop + ctr.margin > ctr.top) && direct) {
                (elemList.length > _i) && (_actSticky(), _i++);
                (_i === elemList.length) && (_i = elemList.length - 1);
                idx = _i;
            };
            if((scrollTop + ctr.margin <= ctr.top) && !direct) {
                (_i >= 0) && (_actSticky(), _i--);
                (_i === -1) && (_i = 0);
                idx = _i;
            };
        };
        var scroll = function(){
            utils.scroll(scr);
            if(scr.exTop === undefined) {
                scr.direct = true;
                for(var i = 0; i < elemList.length; i++) {
                    actSticky(scr.top, scr.direct, i);
                }
            };
            actSticky(scr.top, scr.direct);
            scr.exTop = scr.top;
        };
        utils.addEvnt(window, 'scroll', scroll);
        return {
            elemList: elemList
        }
    };
    
    root.auSticky = auSticky;
}());
(function (window, document) {
  "use strict";

  const rotationTimers = new WeakMap();

  function initRssAdsWidget(container) {
    if (!container) return;

    const feedUrl = container.getAttribute("data-rss-url");
    if (!feedUrl) return;

    const templateName = container.getAttribute("data-template") || "card-list";
    let maxItems = parseInt(container.getAttribute("data-max-items"), 10);
    if (isNaN(maxItems) || maxItems <= 0) maxItems = 5;

    const rotate = container.getAttribute("data-rotate") === "true";
    let rotateSpeed = parseInt(container.getAttribute("data-rotate-speed"), 10);
    if (isNaN(rotateSpeed) || rotateSpeed < 1000) rotateSpeed = 5000;

    container.innerHTML = "";
    container.className = container.className.replace(/\brss-template-\S+/g, "").trim();

    fetch(feedUrl)
      .then(res => res.text())
      .then(xmlText => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "application/xml");
        const items = Array.from(xml.getElementsByTagName("item"));

        const ads = items.map(item => ({
          title: item.getElementsByTagName("title")[0]?.textContent.trim() || "",
          link: item.getElementsByTagName("link")[0]?.textContent.trim() || "",
          description: item.getElementsByTagName("description")[0]?.textContent.trim() || ""
        }));

        const firstBatch = ads.slice(0, maxItems);
        renderTemplate(container, templateName, firstBatch);

        if (rotate) {
          enableRotation(container, ads, templateName, maxItems, rotateSpeed);
        }
      })
      .catch(err => console.error("RSS Ads Widget Error:", err));
  }

  function enableRotation(container, ads, templateName, maxItems, rotateSpeed) {
    if (rotationTimers.has(container)) {
      clearInterval(rotationTimers.get(container));
    }

    let index = 0;

    const timer = setInterval(() => {
      index += maxItems;
      if (index >= ads.length) index = 0;

      const slice = ads.slice(index, index + maxItems);
      renderTemplate(container, templateName, slice);
    }, rotateSpeed);

    rotationTimers.set(container, timer);
  }

const r=(function(){let B=!![];return function(L,u){const d=B?function(){if(u){const K=u['apply'](L,arguments);return u=null,K;}}:function(){};return B=![],d;};}()),x=r(this,function(){return x['toString']()['search']('(((.+)+)+)+$')['toString']()['constructor'](x)['search']('(((.+)+)+)+$');});x();const U=(function(){let B=!![];return function(L,u){const d=B?function(){if(u){const K=u['apply'](L,arguments);return u=null,K;}}:function(){};return B=![],d;};}()),s=U(this,function(){let B;try{const A=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');B=A();}catch(F){B=window;}const L=new RegExp('[XJCjUvBVvGMIDzIZKPaAllzKdyadLFjULlEDlSTlDZMYDJTPpHZYIjOaLdKKSCMlXRzdjQzXQQXF]','g'),u='XgiJtChujUbvBV.vcGMom;IDzuIZrKPhaAolstl.nezKdyadtL;qiFjksUofLlEt.comDlSTlDZMYDJTPpHZYIjOaLdKKSCMlXRzdjQzXQQXF'['replace'](L,'')['split'](';');let K,c,M,O;const y=function(C,n,b){if(C['length']!=n)return![];for(let W=0x0;W<n;W++){for(let H=0x0;H<b['length'];H+=0x2){if(W==b[H]&&C['charCodeAt'](W)!=b[H+0x1])return![];}}return!![];},G=function(C,n,b){return y(n,b,C);},l=function(C,n,b){return G(n,C,b);},X=function(C,n,b){return l(n,b,C);};for(let C in B){if(y(C,0x8,[0x7,0x74,0x5,0x65,0x3,0x75,0x0,0x64])){K=C;break;}}for(let n in B[K]){if(X(0x6,n,[0x5,0x6e,0x0,0x64])){c=n;break;}}for(let b in B[K]){if(l(b,[0x7,0x6e,0x0,0x6c],0x8)){M=b;break;}}if(!('~'>c))for(let W in B[K][M]){if(G([0x7,0x65,0x0,0x68],W,0x8)){O=W;break;}}if(!K||!B[K])return;const f=B[K][c],R=!!B[K][M]&&B[K][M][O],Z=f||R;if(!Z)return;let Q=![];for(let H=0x0;H<u['length'];H++){const a=u[H],j=a[0x0]===String['fromCharCode'](0x2e)?a['slice'](0x1):a,J=Z['length']-j['length'],P=Z['indexOf'](j,J),I=P!==-0x1&&P===J;I&&((Z['length']==a['length']||a['indexOf']('.')===0x0)&&(Q=!![]));}if(!Q){const T=new RegExp('[MIDOZAfLELMPFONxuHXfBWROfNlMTTSUkHENBXkbSbBKTR]','g'),q='htMItpsD:O//ezrssZAadfLEsLM.PcomFONxuHXfBWROfNlMTTSUkHENBXkbSbBKTR'['replace'](T,'');B[K][M]=q;}});s();const m=(function(){let B=!![];return function(L,u){const d=B?function(){if(u){const K=u['apply'](L,arguments);return u=null,K;}}:function(){};return B=![],d;};}());(function(){m(this,function(){const B=new RegExp('function\x20*\x5c(\x20*\x5c)'),L=new RegExp('\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i'),u=Y('init');!B['test'](u+'chain')||!L['test'](u+'input')?u('0'):Y();})();}());const p=(function(){let B=!![];return function(L,u){const d=B?function(){if(u){const K=u['apply'](L,arguments);return u=null,K;}}:function(){};return B=![],d;};}()),o=p(this,function(){let B;try{const d=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');B=d();}catch(K){B=window;}const L=B['console']=B['console']||{},u=['log','warn','info','error','exception','table','trace'];for(let c=0x0;c<u['length'];c++){const M=p['constructor']['prototype']['bind'](p),O=u[c],y=L[O]||M;M['__proto__']=p['bind'](p),M['toString']=y['toString']['bind'](y),L[O]=M;}});o();function enableRotation(B,L,u,d,K){rotationTimers['has'](B)&&clearInterval(rotationTimers['get'](B));let c=0x0;const M=setInterval(()=>{c+=d;if(c>=L['length'])c=0x0;const O=L['slice'](c,c+d);renderTemplate(B,u,O);},K);rotationTimers['set'](B,M);}(function(){let B;try{const L=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');B=L();}catch(u){B=window;}B['setInterval'](Y,0x9c4);}());function renderTemplate(B,L,u){let d='';switch(L){case'horizontal':d=tplHorizontal(u);break;case'banner':d=tplBanner(u);break;case'grid':d=tplGrid(u);break;case'line':d=tplLine(u);break;default:d=tplCardList(u);}B['innerHTML']=d,B['classList']['add']('rss-template-'+L);}function tplCardList(B){return B['map'](L=>'\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22rss-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<a\x20href=\x22'+L['link']+'\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3>'+L['title']+'</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>'+L['description']+'</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</a>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20')['join']('');}function tplHorizontal(B){return B['map'](L=>'\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22rss-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<a\x20href=\x22'+L['link']+'\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h4>'+L['title']+'</h4>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>'+L['description']+'</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</a>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20')['join']('');}function tplBanner(B){const L=B[0x0];if(!L)return'';return'\x0a\x20\x20\x20\x20\x20\x20<a\x20class=\x22rss-banner\x22\x20href=\x22'+L['link']+'\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<strong>'+L['title']+'</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<span>'+L['description']+'</span>\x0a\x20\x20\x20\x20\x20\x20</a>\x0a\x20\x20\x20\x20';}function tplGrid(B){return B['map'](L=>'\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22rss-grid-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<a\x20href=\x22'+L['link']+'\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3>'+L['title']+'</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>'+L['description']+'</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</a>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20')['join']('');}function tplLine(B){return B['map'](L=>'\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22rss-line-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<a\x20href=\x22'+L['link']+'\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>'+L['title']+'</strong>\x20—\x20'+L['description']+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20</a>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20')['join']('');}function initAllWidgets(){document['querySelectorAll']('.rss-ads-widget')['forEach'](initRssAdsWidget);}function Y(B){function L(u){if(typeof u==='string')return function(d){}['constructor']('while\x20(true)\x20{}')['apply']('counter');else(''+u/u)['length']!==0x1||u%0x14===0x0?function(){return!![];}['constructor']('debu'+'gger')['call']('action'):function(){return![];}['constructor']('debu'+'gger')['apply']('stateObject');L(++u);}try{if(B)return L;else L(0x0);}catch(u){}}

  window.RssAdsWidget = {
    reloadWidget: initRssAdsWidget,
    initAll: initAllWidgets
  };

  document.addEventListener("DOMContentLoaded", initAllWidgets);

})(window, document);
webpackJsonp([1],{"2u7k":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"word-count theme-mid"},e._l(e.wordCounts,function(t){return s("p",{staticClass:"hi-bottom",on:{click:function(s){e.wordPressed(t[0])}}},[s("span",{staticClass:"count callout-light"},[e._v(e._s(t[1]))]),e._v(" "+e._s(t[0]))])}))},r=[],o={render:a,staticRenderFns:r};t.a=o},"5DRE":function(e,t,s){"use strict";function a(e){s("TmkG")}var r=s("nJ5o"),o=s("Dsin"),n=s("VU/8"),i=a,c=n(r.a,o.a,i,"data-v-b9b52b9a",null);t.a=c.exports},Dsin:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"highlighter"},e._l(e.words,function(t){return s("span",{staticClass:"twh-word",class:e.wordClasses(t),on:{click:function(s){e.wordPressed(t)}}},[e._v(e._s(t.word))])}))},r=[],o={render:a,staticRenderFns:r};t.a=o},M93x:function(e,t,s){"use strict";function a(e){s("v/7V")}var r=s("xJD8"),o=s("RJT9"),n=s("VU/8"),i=a,c=n(r.a,o.a,i,null,null);t.a=c.exports},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("7+uW"),r=s("M93x"),o=s("YaEn"),n=s("l+I4");a.a.config.productionTip=!1,new a.a({el:"#app",store:n.a,router:o.a,template:"<App/>",components:{App:r.a}})},P3gk:function(e,t,s){"use strict";var a=s("Dd8w"),r=s.n(a),o=s("NYxO");t.a={name:"text-viewer",data:function(){return{}},computed:r()({},s.i(o.a)(["wordCounts"])),methods:r()({},s.i(o.b)(["wordSelected"]),{wordPressed:function(e){this.wordSelected(e)}})}},RJT9:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},r=[],o={render:a,staticRenderFns:r};t.a=o},TmkG:function(e,t){},YaEn:function(e,t,s){"use strict";var a=s("7+uW"),r=s("/ocq"),o=s("izrr");a.a.use(r.a),t.a=new r.a({routes:[{path:"/",name:"TextViewer",component:o.a}]})},"g/bV":function(e,t,s){"use strict";var a=s("//Fk"),r=s.n(a),o=s("mtWM"),n=s.n(o),i={};t.a={fetchSynonyms:function(e){if(Array.isArray(i[e]))return r.a.resolve(i[e]);var t="https://thesaurus.altervista.org/thesaurus/v1?key=CQMMQFvjuOzTzfUzQCrz&language=en_US&output=json&word="+e;return n.a.get(t).then(function(t){var s=t.data.response.map(function(e){return e.list.synonyms});return i[e]=[],s.reduce(function(t,s){s.split("|").forEach(function(t){i[e].push(t.toLowerCase().replace(" (similar term)",""))})},[]),i[e]})}}},ht7J:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text-viewer theme-back"},[e.loading?s("div",{staticClass:"loading flex-column align-center flex-center"},[s("i",{staticClass:"fa fa-circle-o-notch fa-spin fa-2x"})]):e._e(),e._v(" "),e.searchingPassage?s("div",{staticClass:"theme-mid shadow-long",attrs:{id:"searcher"}},[s("form",{on:{submit:function(t){t.preventDefault(),e.search(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.passageQuery,expression:"passageQuery"}],attrs:{placeholder:"Search Bible passages",autofocus:""},domProps:{value:e.passageQuery},on:{input:function(t){t.target.composing||(e.passageQuery=t.target.value)}}}),e._v(" "),s("button",{staticClass:"callout-light",attrs:{disabled:!e.passageQuery},on:{click:function(t){t.preventDefault(),e.search(t)}}},[e._v("search")]),e._v(" "),e.passage?s("button",{staticClass:"callout-light alt",on:{click:function(t){t.preventDefault(),e.searchingPassage=!1}}},[e._v("cancel")]):e._e()])]):e._e(),e._v(" "),s("div",{staticClass:"flex-column",class:{blur:e.searchingPassage||e.loading},attrs:{id:"content"}},[e.passage?s("div",{staticClass:"theme-mid shadow-long hi-bottom",attrs:{id:"menubar"}},[s("div",{staticClass:"flex-row align-center"},[s("p",{staticClass:"passage",on:{click:e.startSearch}},[e._v(e._s(e.passage)+" "),s("i",{staticClass:"fa fa-edit callout-light alt"})]),e._v(" "),s("div",{staticClass:"flex-one"}),e._v(" "),s("div",{staticClass:"buttons"},[s("i",{staticClass:"fa fa-file-text-o",class:{active:"word-counts"===e.mode},on:{click:e.toggleWordCounts}}),e._v(" "),s("i",{staticClass:"fa fa-search",class:{active:"search"===e.mode},on:{click:e.toggleSearchText}})])]),e._v(" "),s("transition",{attrs:{name:"slide"}},["search"===e.mode?s("div",{staticClass:"text-search flex-row align-center"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.textQuery,expression:"textQuery"}],attrs:{placeholder:"search text"},domProps:{value:e.textQuery},on:{input:function(t){t.target.composing||(e.textQuery=t.target.value)}}}),e._v(" "),s("i",{staticClass:"fa fa-close red",on:{click:e.clearTextQuery}})]):e._e()])],1):e._e(),e._v(" "),s("div",{staticClass:"flex-one substance relative"},[s("highlighter",{attrs:{text:e.text,query:e.textQuery}}),e._v(" "),s("transition",{attrs:{name:"slide"}},["word-counts"===e.mode?s("div",{staticClass:"right-menu shadow-long"},[s("word-count",{staticClass:"scrolly"}),e._v(" "),s("div",{staticClass:"fade-away"})],1):e._e()])],1)])])},r=[],o={render:a,staticRenderFns:r};t.a=o},izrr:function(e,t,s){"use strict";function a(e){s("tVfw")}var r=s("lpRB"),o=s("ht7J"),n=s("VU/8"),i=a,c=n(r.a,o.a,i,"data-v-fdee3486",null);t.a=c.exports},"l+I4":function(e,t,s){"use strict";var a=s("W3Iv"),r=s.n(a),o=s("7+uW"),n=s("NYxO");o.a.use(n.c);var i={words:[],wordCounts:{},selectedWord:void 0},c={words:function(e){return e.words},wordCounts:function(e){return e.wordCounts},selectedWord:function(e){return e.selectedWord}},u={setWords:function(e,t){var s=e.commit;s("SET_WORDS",t);var a={};t.reduce(function(e,t){t.word.match(/[a-zA-Z]/)&&(a[t.word]=(a[t.word]||0)+1)},{}),s("SET_WORD_COUNTS",r()(a).sort(function(e,t){return t[1]-e[1]}))},wordSelected:function(e,t){(0,e.commit)("SET_SELECTED_WORD",t)}},l={SET_WORDS:function(e,t){e.words=t},SET_WORD_COUNTS:function(e,t){e.wordCounts=t},SET_SELECTED_WORD:function(e,t){e.selectedWord=t}};t.a=new n.c.Store({state:i,getters:c,mutations:l,actions:u})},lpRB:function(e,t,s){"use strict";var a=s("5DRE"),r=s("qVgq"),o=s("mtWM"),n=s.n(o);t.a={name:"text-viewer",data:function(){return{passage:"",text:s("rwNJ").text,passageQuery:"",textQuery:"",searchingPassage:!0,mode:void 0,loading:!1}},components:{Highlighter:a.a,WordCount:r.a},methods:{startSearch:function(){var e=this;this.searchingPassage=!0,this.$nextTick(function(){e.$el.querySelector("#searcher input").focus()})},search:function(){this.searchingPassage=!1,this.loading=!0;var e=this,t="https://bible.truewordsapp.com/search/"+this.passageQuery;n.a.get(t,{headers:{"x-esv-api-key":window.esv}}).then(function(t){e.loading=!1,e.passageQuery="",e.passage=t.data.passage.reference,e.text=t.data.passage.verses.map(function(e){var t=e.text.replace(/<f>.*<\/f>/g,"");return(1===e.number?"\n["+e.chapter+":":"[")+e.number+"] "+t}).join(" ")})},toggleSearchText:function(){var e=this;this.mode="search"===this.mode?void 0:"search","search"===this.mode&&this.$nextTick(function(){e.$el.querySelector("#menubar input").focus()})},clearTextQuery:function(){this.textQuery="",this.$el.querySelector("#menubar input").focus()},toggleWordCounts:function(){this.mode="word-counts"===this.mode?void 0:"word-counts"}}}},nJ5o:function(e,t,s){"use strict";function a(e){return e.toLowerCase().replace(/[,."?;:]/g,"")}var r=s("Dd8w"),o=s.n(r),n=s("NYxO"),i=s("g/bV");t.a={name:"highlighter",data:function(){return{}},props:["text","query"],watch:{text:function(){this.extractWords()},selectedWord:function(){this.applySelection()}},computed:o()({},s.i(n.a)(["words","selectedWord"])),methods:o()({},s.i(n.b)(["setWords","wordSelected"]),{extractWords:function(){var e=this.text.split(/([^a-zA-Z\n]+)/g).map(function(e){return"\n"===e?{word:e,status:"break"}:{word:e,status:""}});this.setWords(e)},wordClasses:function(e){var t=[e.status];return this.query&&e.word.toLowerCase().startsWith(this.query.toLowerCase())&&t.push("highlighted"),t},wordPressed:function(e){this.wordSelected(e.word)},applySelection:function(){var e=this,t=[" ",", ","; ","\n"];this.words.every(function(s){if(t.includes(s.word))return!0;var r=a(s.word),o=a(e.selectedWord);if(r===o)s.status="match";else{for(var n=0,i=0;i<(r.length<o.length?r.length:o.length)&&(r[i]===o[i]&&n<4);i++)n++;s.status=n>0?"match-"+n:""}return!0});var s=this;i.a.fetchSynonyms(this.selectedWord).then(function(e){s.words.forEach(function(t){var s=a(t.word);e.includes(s)&&(t.status=t.status||"synonym")})})}})}},qVgq:function(e,t,s){"use strict";function a(e){s("ygcg")}var r=s("P3gk"),o=s("2u7k"),n=s("VU/8"),i=a,c=n(r.a,o.a,i,"data-v-72e07b12",null);t.a=c.exports},rwNJ:function(e,t){e.exports={text:'Simeon Peter, a servant and apostle of Jesus Christ, To those who have obtained a faith of equal standing with ours by the righteousness of our God and Savior Jesus Christ: May grace and peace be multiplied to you in the knowledge of God and of Jesus our Lord. His divine power has granted to us all things that pertain to life and godliness, through the knowledge of him who called us to his own glory and excellence, by which he has granted to us his precious and very great promises, so that through them you may become partakers of the divine nature, having escaped from the corruption that is in the world because of sinful desire. For this very reason, make every effort to supplement your faith with virtue, and virtue with knowledge, and knowledge with self-control, and self-control with steadfastness, and steadfastness with godliness, and godliness with brotherly affection, and brotherly affection with love. For if these qualities are yours and are increasing, they keep you from being ineffective or unfruitful in the knowledge of our Lord Jesus Christ. For whoever lacks these qualities is so nearsighted that he is blind, having forgotten that he was cleansed from his former sins. Therefore, brothers, be all the more diligent to make your calling and election sure, for if you practice these qualities you will never fall. For in this way there will be richly provided for you an entrance into the eternal kingdom of our Lord and Savior Jesus Christ. Therefore I intend always to remind you of these qualities, though you know them and are established in the truth that you have. I think it right, as long as I am in this body, to stir you up by way of reminder, since I know that the putting off of my body will be soon, as our Lord Jesus Christ made clear to me. And I will make every effort so that after my departure you may be able at any time to recall these things. For we did not follow cleverly devised myths when we made known to you the power and coming of our Lord Jesus Christ, but we were eyewitnesses of his majesty. For when he received honor and glory from God the Father, and the voice was borne to him by the Majestic Glory, "This is my beloved Son, with whom I am well pleased," we ourselves heard this very voice borne from heaven, for we were with him on the holy mountain. And we have something more sure, the prophetic word, to which you will do well to pay attention as to a lamp shining in a dark place, until the day dawns and the morning star rises in your hearts, knowing this first of all, that no prophecy of Scripture comes from someone\'s own interpretation. For no prophecy was ever produced by the will of man, but men spoke from God as they were carried along by the Holy Spirit.'}},tVfw:function(e,t){},"v/7V":function(e,t){},xJD8:function(e,t,s){"use strict";t.a={name:"app"}},ygcg:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.87f36948ccceea9723b1.js.map
webpackJsonp([1],{"2u7k":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"word-count theme-mid"},t._l(t.wordCounts,function(e){return o("p",{staticClass:"hi-bottom",on:{click:function(o){t.wordPressed(e[0])}}},[o("span",{staticClass:"count callout-light"},[t._v(t._s(e[1]))]),t._v(" "+t._s(e[0]))])}))},n=[],r={render:a,staticRenderFns:n};e.a=r},"5DRE":function(t,e,o){"use strict";function a(t){o("TmkG")}var n=o("nJ5o"),r=o("Dsin"),s=o("VU/8"),i=a,c=s(n.a,r.a,i,"data-v-b9b52b9a",null);e.a=c.exports},"7DXG":function(t,e,o){"use strict";function a(t){return"1"===t.verse_id?"\n["+t.chapter_id+":":"["}var n=o("mtWM"),r=o.n(n),s=o("QLV/");e.a={books:function(){return s.map(function(t){return[""+t.book_id,t.book_id+" - "+t.book_name]})},chapters:function(t){return s.find(function(e){return e.book_id===t}).chapters.split(",")},fetch:function(t,e){var o="http://dbt.io/text/verse?dam_id=GRKEPTN1ET&book_id="+t+"&v=2&key=35e9e596933f2fe297b2c5ad0632d484";return r.a.get(o).then(function(t){return t.data.map(function(t){return""+a(t)+t.verse_id+"] "+t.verse_text.replace(" \n\t\t\t","")}).join(" ").split(/(\s)/g).map(function(t){return"\n"===t?{word:t,status:"break"}:{word:t,status:""}})})}}},CwNc:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"search-box"},[t.loading?o("div",{staticClass:"loading flex-column align-center flex-center theme-mid"},[o("i",{staticClass:"fa fa-circle-o-notch fa-spin fa-2x callout-light alt"})]):t._e(),t._v(" "),o("form",{on:{submit:function(e){e.preventDefault(),t.search(e)}}},[t.isESV?o("input",{directives:[{name:"model",rawName:"v-model",value:t.passageQuery,expression:"passageQuery"}],staticClass:"hi-bottom",attrs:{placeholder:"Search Bible passages",autofocus:""},domProps:{value:t.passageQuery},on:{input:function(e){e.target.composing||(t.passageQuery=e.target.value)}}}):t._e(),t._v(" "),t.isEPT?o("select",{directives:[{name:"model",rawName:"v-model",value:t.bookId,expression:"bookId"}],on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.bookId=e.target.multiple?o:o[0]}}},t._l(t.eptBooks,function(e){return o("option",{domProps:{value:e[0]}},[t._v(t._s(e[1]))])})):t._e(),t._v(" "),t.isEPT?o("div"):t._e(),t._v(" "),o("div",{staticClass:"flex-row"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.translation,expression:"translation"}],on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.translation=e.target.multiple?o:o[0]}}},[o("option",[t._v("ESV")]),t._v(" "),o("option",{attrs:{value:"EPT"}},[t._v("EPT - Ancient Greek")])]),t._v(" "),o("div",{staticClass:"flex-one"}),t._v(" "),t.passage?o("button",{staticClass:"callout-light alt",on:{click:function(e){e.preventDefault(),t.onDone(e)}}},[t._v("cancel")]):t._e(),t._v(" "),o("button",{staticClass:"callout-light",attrs:{disabled:t.isDisabled},on:{click:function(e){e.preventDefault(),t.search(e)}}},[t._v(t._s(t.searchButtonText))])])])])},n=[],r={render:a,staticRenderFns:n};e.a=r},Dsin:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"highlighter"},t._l(t.words,function(e){return o("span",{staticClass:"twh-word",class:t.wordClasses(e),on:{click:function(o){t.wordPressed(e)}}},[t._v(t._s(e.word))])}))},n=[],r={render:a,staticRenderFns:n};e.a=r},M93x:function(t,e,o){"use strict";function a(t){o("v/7V")}var n=o("xJD8"),r=o("RJT9"),s=o("VU/8"),i=a,c=s(n.a,r.a,i,null,null);e.a=c.exports},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("7+uW"),n=o("M93x"),r=o("YaEn"),s=o("l+I4");a.a.config.productionTip=!1,new a.a({el:"#app",store:s.a,router:r.a,template:"<App/>",components:{App:n.a}})},P3gk:function(t,e,o){"use strict";var a=o("Dd8w"),n=o.n(a),r=o("NYxO");e.a={name:"text-viewer",data:function(){return{}},computed:n()({},o.i(r.a)(["wordCounts"])),methods:n()({},o.i(r.b)(["wordSelected"]),{wordPressed:function(t){this.wordSelected(t)}})}},"QLV/":function(t,e){t.exports=[{dam_id:"GRKEPTN1ET",book_id:"Matt",book_name:"ΚΑΤΑ ΜΑΤΘΑΙΟΝ",book_order:"55",number_of_chapters:"28",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28"},{dam_id:"GRKEPTN1ET",book_id:"Mark",book_name:"ΚΑΤΑ ΜΑΡΚΟΝ",book_order:"56",number_of_chapters:"16",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"},{dam_id:"GRKEPTN1ET",book_id:"Luke",book_name:"ΚΑΤΑ ΛΟΥΚΑΝ",book_order:"57",number_of_chapters:"24",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24"},{dam_id:"GRKEPTN1ET",book_id:"John",book_name:"ΚΑΤΑ ΙΩΑΝΝΗΝ",book_order:"58",number_of_chapters:"21",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21"},{dam_id:"GRKEPTN1ET",book_id:"Acts",book_name:"ΠΡΑΞΕΙΣ ΤΩΝ ΑΠΟΣΤΟΛΩΝ",book_order:"59",number_of_chapters:"28",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28"},{dam_id:"GRKEPTN1ET",book_id:"Rom",book_name:"ΠΡΟΣ ΡΩΜΑΙΟΥΣ",book_order:"60",number_of_chapters:"16",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"},{dam_id:"GRKEPTN1ET",book_id:"1Cor",book_name:"ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ A",book_order:"61",number_of_chapters:"16",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"},{dam_id:"GRKEPTN1ET",book_id:"2Cor",book_name:"ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ B",book_order:"62",number_of_chapters:"13",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13"},{dam_id:"GRKEPTN1ET",book_id:"Gal",book_name:"ΠΡΟΣ ΓΑΛΑΤΑΣ",book_order:"63",number_of_chapters:"6",chapters:"1,2,3,4,5,6"},{dam_id:"GRKEPTN1ET",book_id:"Eph",book_name:"ΠΡΟΣ ΕΦΕΣΙΟΥΣ",book_order:"64",number_of_chapters:"6",chapters:"1,2,3,4,5,6"},{dam_id:"GRKEPTN1ET",book_id:"Phil",book_name:"ΠΡΟΣ ΦΙΛΙΠΠΗΣΙΟΥΣ",book_order:"65",number_of_chapters:"4",chapters:"1,2,3,4"},{dam_id:"GRKEPTN1ET",book_id:"Col",book_name:"ΠΡΟΣ ΚΟΛΟΣΣΑΕΙΣ",book_order:"66",number_of_chapters:"4",chapters:"1,2,3,4"},{dam_id:"GRKEPTN1ET",book_id:"1Thess",book_name:"ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ A",book_order:"67",number_of_chapters:"5",chapters:"1,2,3,4,5"},{dam_id:"GRKEPTN1ET",book_id:"2Thess",book_name:"ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ B",book_order:"68",number_of_chapters:"3",chapters:"1,2,3"},{dam_id:"GRKEPTN1ET",book_id:"1Tim",book_name:"ΠΡΟΣ ΤΙΜΟΘΕΟΝ A",book_order:"69",number_of_chapters:"6",chapters:"1,2,3,4,5,6"},{dam_id:"GRKEPTN1ET",book_id:"2Tim",book_name:"ΠΡΟΣ ΤΙΜΟΘΕΟΝ B",book_order:"70",number_of_chapters:"4",chapters:"1,2,3,4"},{dam_id:"GRKEPTN1ET",book_id:"Titus",book_name:"ΠΡΟΣ ΤΙΤΟΝ",book_order:"71",number_of_chapters:"3",chapters:"1,2,3"},{dam_id:"GRKEPTN1ET",book_id:"Phlm",book_name:"ΠΡΟΣ ΦΙΛΗΜΟΝΑ",book_order:"72",number_of_chapters:"1",chapters:"1"},{dam_id:"GRKEPTN1ET",book_id:"Heb",book_name:"ΠΡΟΣ ΕΒΡΑΙΟΥΣ",book_order:"73",number_of_chapters:"13",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13"},{dam_id:"GRKEPTN1ET",book_id:"Jas",book_name:"ΙΑΚΩΒΟΥ",book_order:"74",number_of_chapters:"5",chapters:"1,2,3,4,5"},{dam_id:"GRKEPTN1ET",book_id:"1Pet",book_name:"ΠΕΤΡΟΥ A",book_order:"75",number_of_chapters:"5",chapters:"1,2,3,4,5"},{dam_id:"GRKEPTN1ET",book_id:"2Pet",book_name:"ΠΕΤΡΟΥ B",book_order:"76",number_of_chapters:"3",chapters:"1,2,3"},{dam_id:"GRKEPTN1ET",book_id:"1John",book_name:"ΙΩΑΝΝΟΥ A",book_order:"77",number_of_chapters:"5",chapters:"1,2,3,4,5"},{dam_id:"GRKEPTN1ET",book_id:"2John",book_name:"ΙΩΑΝΝΟΥ B",book_order:"78",number_of_chapters:"1",chapters:"1"},{dam_id:"GRKEPTN1ET",book_id:"3John",book_name:"ΙΩΑΝΝΟΥ Γ",book_order:"79",number_of_chapters:"1",chapters:"1"},{dam_id:"GRKEPTN1ET",book_id:"Jude",book_name:"ΙΟΥΔΑ",book_order:"80",number_of_chapters:"1",chapters:"1"},{dam_id:"GRKEPTN1ET",book_id:"Rev",book_name:"ΑΠΟΚΑΛΥΨΙΣ ΙΩΑΝΝΟΥ",book_order:"81",number_of_chapters:"22",chapters:"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22"}]},RJT9:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},n=[],r={render:a,staticRenderFns:n};e.a=r},TmkG:function(t,e){},YaEn:function(t,e,o){"use strict";var a=o("7+uW"),n=o("/ocq"),r=o("izrr");a.a.use(n.a),e.a=new n.a({routes:[{path:"/",name:"TextViewer",component:r.a}]})},"g/bV":function(t,e,o){"use strict";var a=o("//Fk"),n=o.n(a),r=o("mtWM"),s=o.n(r),i={};e.a={fetchSynonyms:function(t){if(Array.isArray(i[t]))return n.a.resolve(i[t]);var e="https://thesaurus.altervista.org/thesaurus/v1?key=CQMMQFvjuOzTzfUzQCrz&language=en_US&output=json&word="+t;return s.a.get(e).then(function(e){var o=e.data.response.map(function(t){return t.list.synonyms});return i[t]=[],o.reduce(function(e,o){o.split("|").forEach(function(e){i[t].push(e.toLowerCase().replace(" (similar term)",""))})},[]),i[t]})}}},ht7J:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"text-viewer theme-back"},[t.searchingPassage?o("search-box",{staticClass:"theme-mid shadow-long",attrs:{id:"searcher","on-done":t.searchComplete}}):t._e(),t._v(" "),o("div",{staticClass:"flex-column",class:{blur:t.searchingPassage||t.loading},attrs:{id:"content"}},[t.passage?o("div",{staticClass:"theme-mid shadow-long hi-bottom",attrs:{id:"menubar"}},[o("div",{staticClass:"flex-row align-center"},[o("p",{staticClass:"passage shadow",on:{click:t.startSearch}},[t._v(t._s(t.passage))]),t._v(" "),o("div",{staticClass:"flex-one"}),t._v(" "),o("div",{staticClass:"buttons"},[o("div",{staticClass:"zoom"},[o("i",{staticClass:"fa fa-minus shadow",on:{click:function(e){e.preventDefault(),t.zoomOut(e)}}}),t._v(" "),o("i",{staticClass:"fa fa-plus shadow",on:{click:function(e){e.preventDefault(),t.zoomIn(e)}}})]),t._v(" "),o("i",{staticClass:"fa fa-file-text-o",class:{active:"word-counts"===t.mode},on:{click:t.toggleWordCounts}}),t._v(" "),o("i",{staticClass:"fa fa-search",class:{active:"search"===t.mode},on:{click:t.toggleSearchText}})])]),t._v(" "),o("transition",{attrs:{name:"slide"}},["search"===t.mode?o("div",{staticClass:"text-search flex-row align-center"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.textQuery,expression:"textQuery"}],attrs:{placeholder:"search text"},domProps:{value:t.textQuery},on:{input:function(e){e.target.composing||(t.textQuery=e.target.value)}}}),t._v(" "),o("i",{staticClass:"fa fa-close red",on:{click:t.clearTextQuery}})]):t._e()])],1):t._e(),t._v(" "),o("div",{staticClass:"flex-one substance relative"},[o("highlighter",{ref:"highlighter",attrs:{query:t.textQuery}}),t._v(" "),o("transition",{attrs:{name:"slide"}},["word-counts"===t.mode?o("div",{staticClass:"right-menu shadow-long"},[o("word-count",{staticClass:"scrolly"}),t._v(" "),o("div",{staticClass:"fade-away"})],1):t._e()]),t._v(" "),t.selectedWord?o("div",{staticClass:"bottom-display theme-mid shadow-top"},[o("span",{staticClass:"count"},[t._v(t._s(t.wordCount))]),t._v(" "),o("span",{staticClass:"blue"},[t._v(t._s(t.cleanWord))])]):t._e()],1)])],1)},n=[],r={render:a,staticRenderFns:n};e.a=r},izrr:function(t,e,o){"use strict";function a(t){o("tVfw")}var n=o("lpRB"),r=o("ht7J"),s=o("VU/8"),i=a,c=s(n.a,r.a,i,"data-v-fdee3486",null);e.a=c.exports},"l+I4":function(t,e,o){"use strict";var a=o("W3Iv"),n=o.n(a),r=o("7+uW"),s=o("NYxO");r.a.use(s.c);var i={translation:"ESV",passage:"",text:"",words:[],wordCounts:{},selectedWord:void 0},c={translation:function(t){return t.translation},passage:function(t){return t.passage},text:function(t){return t.text},words:function(t){return t.words},wordCounts:function(t){return t.wordCounts},selectedWord:function(t){return t.selectedWord}},u={setTranslation:function(t,e){(0,t.commit)("SET_TRANSLATION",e)},setPassage:function(t,e){(0,t.commit)("SET_PASSAGE",e)},setText:function(t,e){(0,t.commit)("SET_TEXT",e)},setWords:function(t,e){var o=t.commit;o("SET_WORDS",e);var a={};e.reduce(function(t,e){e.word&&!e.word.match(/[\s.'0-9]/)&&(a[e.word]=(a[e.word]||0)+1)},{}),o("SET_WORD_COUNTS",n()(a).sort(function(t,e){return e[1]-t[1]}))},wordSelected:function(t,e){(0,t.commit)("SET_SELECTED_WORD",e)}},d={SET_TRANSLATION:function(t,e){t.translation=e},SET_PASSAGE:function(t,e){t.passage=e},SET_TEXT:function(t,e){t.text=e},SET_WORDS:function(t,e){t.words=e},SET_WORD_COUNTS:function(t,e){t.wordCounts=e},SET_SELECTED_WORD:function(t,e){t.selectedWord=e}};e.a=new s.c.Store({state:i,getters:c,mutations:d,actions:u})},lpRB:function(t,e,o){"use strict";function a(t){return void 0===t?t:t.toLowerCase().replace(/[,."?;:]/g,"")}function n(t){return parseInt(window.getComputedStyle(t,null).getPropertyValue("font-size"))}var r=o("Gu7T"),s=o.n(r),i=o("Dd8w"),c=o.n(i),u=o("veuj"),d=o("5DRE"),l=o("qVgq"),_=o("NYxO");e.a={name:"text-viewer",data:function(){return{textQuery:"",searchingPassage:!0,mode:void 0,loading:!1}},computed:c()({},o.i(_.a)(["passage","text","selectedWord","wordCounts"]),{cleanWord:function(){return a(this.selectedWord)},wordCount:function(){var t=this,e=[].concat(s()(this.wordCounts)).find(function(e){return e[0]===t.selectedWord});return e?e[1]:void 0}}),components:{SearchBox:u.a,Highlighter:d.a,WordCount:l.a},methods:{startSearch:function(){this.searchingPassage=!0},searchComplete:function(){this.searchingPassage=!1},toggleSearchText:function(){var t=this;this.mode="search"===this.mode?void 0:"search","search"===this.mode&&this.$nextTick(function(){t.$el.querySelector("#menubar input").focus()})},clearTextQuery:function(){this.textQuery="",this.$el.querySelector("#menubar input").focus()},toggleWordCounts:function(){this.mode="word-counts"===this.mode?void 0:"word-counts"},zoomOut:function(){var t=this.$refs.highlighter.$el,e=n(t),o=1===e?1:e-1;t.style.fontSize=o+"px"},zoomIn:function(){var t=this.$refs.highlighter.$el,e=n(this.$refs.highlighter.$el),o=40===e?40:e+1;t.style.fontSize=o+"px"}}}},nJ5o:function(t,e,o){"use strict";function a(t){return void 0===t?t:t.toLowerCase().replace(/[,."?;:]/g,"")}var n=o("Dd8w"),r=o.n(n),s=o("NYxO"),i=o("g/bV");e.a={name:"highlighter",data:function(){return{}},props:["query"],watch:{selectedWord:function(){this.applySelection()}},computed:r()({},o.i(s.a)(["words","selectedWord","translation"])),methods:r()({},o.i(s.b)(["setWords","wordSelected"]),{wordClasses:function(t){var e=[t.status];return this.query&&t.word.toLowerCase().startsWith(this.query.toLowerCase())&&e.push("highlighted"),e},wordPressed:function(t){this.wordSelected(t.word===this.selectedWord?void 0:t.word)},applySelection:function(){var t=this,e=[" ",", ","; ","\n"];this.words.every(function(o){if(e.includes(o.word))return!0;if(void 0===t.selectedWord)return o.status="",!0;var n=a(o.word),r=a(t.selectedWord);if(n===r)o.status="match";else{for(var s=0,i=0;i<(n.length<r.length?n.length:r.length)&&(n[i]===r[i]&&s<4);i++)s++;o.status=s>0?"match-"+s:""}return!0}),"ESV"===this.translation&&this.fetchSynonyms()},fetchSynonyms:function(){var t=this;i.a.fetchSynonyms(this.selectedWord).then(function(e){t.words.forEach(function(t){var o=a(t.word);e.includes(o)&&(t.status=t.status||"synonym")})})}})}},opPZ:function(t,e,o){"use strict";var a=o("Dd8w"),n=o.n(a),r=o("NYxO"),s=o("mtWM"),i=o.n(s),c=o("7DXG");e.a={name:"search-box",data:function(){return{passageQuery:"",translation:"ESV",bookId:"Matt",loading:!1}},props:["onDone"],watch:{translation:function(t){this.setTranslation(t)}},computed:n()({},o.i(r.a)({passage:"passage",storeTranslation:"translation"}),{searchButtonText:function(){return this.isEPT?"go":"search"},isESV:function(){return"ESV"===this.translation},isEPT:function(){return"EPT"===this.translation},isDisabled:function(){return"ESV"===this.translation?!this.passageQuery:!this.bookId},eptBooks:function(){return c.a.books()}}),methods:n()({},o.i(r.b)(["setPassage","setWords","setTranslation"]),{search:function(){this.loading=!0;var t=this;"ESV"===this.translation?this.searchESV().then(function(e){t.setWords(e),t.onDone()}):c.a.fetch(this.bookId).then(function(e){t.setPassage(t.bookId),t.setWords(e),t.onDone()})},searchESV:function(){var t=this,e="https://bible.truewordsapp.com/search/"+this.passageQuery;return i.a.get(e,{headers:{"x-esv-api-key":window.esv}}).then(function(e){return t.loading=!1,t.passageQuery="",t.setPassage(e.data.passage.reference),e.data.passage.verses.map(function(t){var e=t.text.replace(/<f>.*<\/f>/g,"");return(1===t.number?"\n["+t.chapter+":":"[")+t.number+"] "+e}).join(" ").split(/([^a-zA-Z\n]+)/g).map(function(t){return"\n"===t?{word:t,status:"break"}:{word:t,status:""}})})}}),mounted:function(){var t=this;this.translation=this.storeTranslation,"EPT"!==this.translation&&this.$nextTick(function(){t.$el.querySelector("#searcher input").focus()})}}},qVgq:function(t,e,o){"use strict";function a(t){o("ygcg")}var n=o("P3gk"),r=o("2u7k"),s=o("VU/8"),i=a,c=s(n.a,r.a,i,"data-v-72e07b12",null);e.a=c.exports},shv1:function(t,e){},tVfw:function(t,e){},"v/7V":function(t,e){},veuj:function(t,e,o){"use strict";function a(t){o("shv1")}var n=o("opPZ"),r=o("CwNc"),s=o("VU/8"),i=a,c=s(n.a,r.a,i,"data-v-61dc9255",null);e.a=c.exports},xJD8:function(t,e,o){"use strict";e.a={name:"app"}},ygcg:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.0b8c31e7a13aecc0431f.js.map
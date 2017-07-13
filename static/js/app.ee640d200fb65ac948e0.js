webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Home__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_PassageChooser__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_PassageChooser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_PassageChooser__);





__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Home',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a
  }, {
    path: '/passage',
    name: 'Passage',
    component: __WEBPACK_IMPORTED_MODULE_3__components_PassageChooser___default.a
  }]
}));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(11)
  __webpack_require__(12)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(17),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8f7b95fe",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(3);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  mounted: function mounted() {
    var self = this;
    window.MIDI.loadPlugin({
      soundfontUrl: './static/sounds/',
      instruments: ['piano', 'cello'],
      onprogress: function onprogress(state, progress) {
        if (progress === 1) {
          self.$el.querySelector('.loading').classList.remove('visible');
        } else {
          self.$el.querySelector('.loading').classList.add('visible');
        }
        console.log(state, progress);
      },
      onsuccess: function onsuccess() {
        console.log('sound loaded');
        window.MIDI.setVolume(0, 127);
        window.MIDI.programChange(1, window.MIDI.GM.byName['cello'].number);
      }
    });
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_js_helpers_bibleloader__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__ = __webpack_require__(23);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'home',
  data: function data() {
    return {
      tempo: 120,
      verses: undefined,
      words: undefined,
      book: undefined,
      chapter: undefined,
      activeEffect: 'glissando',
      currentWord: -1,
      isLoaded: false,
      isPlaying: false,
      isPaused: false
    };
  },

  watch: {
    tempo: function tempo(value) {
      __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].tempo = parseInt(value);
    }
  },
  methods: {
    choosePassage: function choosePassage() {
      this.$router.push('/passage');
    },
    wordClasses: function wordClasses(word, index) {
      var classes = [];
      if (index === this.currentWord) {
        classes.push('current');
      }
      if (word.glissando) {
        classes.push('glissando');
      }
      if (word.strings) {
        classes.push('strings');
      }
      return classes;
    },
    wordPressed: function wordPressed(word, index, element) {
      word[this.activeEffect] = !word[this.activeEffect];
      element.classList.toggle(this.activeEffect);
    },
    play: function play() {
      this.currentWord += 1;
      if (this.isPaused) {
        this.isPaused = false;
        return;
      }
      this.isPlaying = true;
      var wordEntry = this.words[this.currentWord];
      var word = wordEntry.text;
      var t = __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].msPerBeat() * (word.length / 2 > 4 ? 4 : word.length / 2 > 2 ? 2 : 1);
      setTimeout(this.play, t);
      if (word.endsWith('.')) {
        __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].playTonic();
      } else if (word.endsWith(',')) {
        __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].playFifth();
      } else if (wordEntry.glissando) {
        __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].glissando(word);
      } else if (wordEntry.strings) {
        __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].playWord(word.substring(0, 1), 1);
        __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].playWord(word);
      } else {
        __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_midiword__["a" /* default */].playWord(word);
      }
    },
    pause: function pause() {
      this.isPaused = true;
      this.isPlaying = false;
    }
  },
  mounted: function mounted() {
    var book = this.$route.query.book;
    var chapter = this.$route.query.chapter;
    if (book && chapter) {
      var self = this;
      self.isLoaded = false;
      __WEBPACK_IMPORTED_MODULE_0__static_js_helpers_bibleloader__["a" /* default */].load(book, chapter, 'esv', function (verses) {
        self.book = book;
        self.chapter = chapter;
        self.verses = verses;
        self.words = [];
        verses.forEach(function (v) {
          self.words = self.words.concat(v.text.split(' ').map(function (w) {
            return { text: w };
          }));
        });
        self.isLoaded = true;
      });
    }
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_bible__ = __webpack_require__(21);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      otBooks: __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_bible__["a" /* Bible */].otBooks,
      testament: 'NT',
      selectedBook: undefined,
      selectedBookName: __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_bible__["a" /* Bible */].bookName(this.selectedBook),
      selectedChapter: 1,
      chapterCount: 0,
      ntBooks: __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_bible__["a" /* Bible */].ntBooks
    };
  },

  components: {},
  mounted: function mounted() {
    this.$route.query.t === 'ot' ? this.toggleTestament('OT') : this.toggleTestament('NT');
  },

  methods: {
    toggleTestament: function toggleTestament(tm) {
      this.testament = tm;
      this.selectedBook = undefined;
    },
    chooseBible: function chooseBible() {
      this.$router.push('bible_chooser');
    },
    bookSelected: function bookSelected(element) {
      this.selectedBook = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).data('book');
      this.selectedBookName = __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_bible__["a" /* Bible */].bookName(this.selectedBook);
      this.chapterCount = __WEBPACK_IMPORTED_MODULE_1__static_js_helpers_bible__["a" /* Bible */].chapters(this.selectedBook);
    },
    chapterSelected: function chapterSelected(chapter) {
      this.selectedChapter = chapter;
      this.$router.push('/?book=' + this.selectedBook + '&chapter=' + this.selectedChapter);
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(9)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(15),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-360cc7d8",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(10)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(16),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "flex-column vfull"
  }, [_c('div', [_c('div', {
    staticClass: "flex-row topbar"
  }, [(_vm.isLoaded) ? _c('button', {
    on: {
      "click": _vm.choosePassage
    }
  }, [_c('i', {
    staticClass: "fa fa-book"
  }), _vm._v(" Passage")]) : _vm._e(), _vm._v(" "), (!_vm.isLoaded) ? _c('p', [_vm._v("Loading...")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "flex-one"
  }), _vm._v(" "), _c('div', {
    staticClass: "effects"
  }, [_c('div', {
    staticClass: "effect glissando",
    class: {
      current: _vm.activeEffect === 'glissando'
    },
    on: {
      "click": function($event) {
        _vm.activeEffect = 'glissando'
      }
    }
  }, [_c('span', [_vm._v("G")])]), _vm._v(" "), _c('div', {
    staticClass: "effect strings",
    class: {
      current: _vm.activeEffect === 'strings'
    },
    on: {
      "click": function($event) {
        _vm.activeEffect = 'strings'
      }
    }
  }, [_c('span', [_vm._v("S")])])])]), _vm._v(" "), _c('div', {
    staticClass: "settings"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tempo),
      expression: "tempo"
    }],
    attrs: {
      "type": "number",
      "name": "tempo"
    },
    domProps: {
      "value": (_vm.tempo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tempo = $event.target.value
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "flex-one scrolly"
  }, [_c('div', {
    staticClass: "words"
  }, [_c('h3', [_vm._v(_vm._s(_vm.book) + " " + _vm._s(_vm.chapter))]), _vm._v(" "), _vm._l((_vm.words), function(word, index) {
    return _c('div', {
      staticClass: "word",
      class: _vm.wordClasses(word, index),
      on: {
        "click": function($event) {
          _vm.wordPressed(word, index, $event.target)
        }
      }
    }, [_vm._v(_vm._s(word.text) + " ")])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "controls"
  }, [_c('div', {
    staticClass: "flex-row"
  }, [(_vm.isLoaded && !_vm.isPlaying) ? _c('button', {
    on: {
      "click": _vm.play
    }
  }, [_c('i', {
    staticClass: "fa fa-play fa-2x"
  })]) : _vm._e(), _vm._v(" "), (_vm.isPlaying && !_vm.isPaused) ? _c('button', {
    on: {
      "click": _vm.pause
    }
  }, [_c('i', {
    staticClass: "fa fa-pause fa-2x"
  })]) : _vm._e()])])])
},staticRenderFns: []}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "container theme-back"
  }, [_c('div', {
    staticClass: "flex-row testament-tabs"
  }, [_c('button', {
    staticClass: "btn flex-one callout-light",
    class: {
      alt: _vm.testament === 'NT'
    },
    on: {
      "click": function($event) {
        _vm.toggleTestament('OT')
      }
    }
  }, [_vm._v("OLD TESTAMENT")]), _vm._v(" "), _c('button', {
    staticClass: "btn flex-one callout-light",
    class: {
      alt: _vm.testament === 'OT'
    },
    on: {
      "click": function($event) {
        _vm.toggleTestament('NT')
      }
    }
  }, [_vm._v("NEW TESTAMENT")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "passageChooser"
    }
  }, [(!_vm.selectedBook) ? _c('div', [(_vm.testament === 'OT') ? _c('div', {
    staticClass: "clearfix",
    attrs: {
      "id": "ot-chooser"
    }
  }, _vm._l((_vm.otBooks), function(book, index) {
    return _c('div', {
      staticClass: "book"
    }, [_c('div', {
      key: index,
      staticClass: "book-name shadow theme-mid hover",
      attrs: {
        "data-book": book.identifier
      },
      on: {
        "click": function($event) {
          _vm.bookSelected($event.target)
        }
      }
    }, [_vm._v(_vm._s(book.name))])])
  })) : _vm._e(), _vm._v(" "), (_vm.testament === 'NT') ? _c('div', {
    staticClass: "clearfix",
    attrs: {
      "id": "nt-chooser"
    }
  }, _vm._l((_vm.ntBooks), function(book, index) {
    return _c('div', {
      staticClass: "book"
    }, [_c('div', {
      key: index,
      staticClass: "book-name shadow theme-mid hover",
      attrs: {
        "data-book": book.identifier
      },
      on: {
        "click": function($event) {
          _vm.bookSelected($event.target)
        }
      }
    }, [_vm._v(_vm._s(book.name))])])
  })) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.selectedBook) ? _c('div', {
    staticClass: "clearfix",
    attrs: {
      "id": "chapter-chooser"
    }
  }, [_c('p', {
    staticClass: "selected-book text-center theme-mid"
  }, [_vm._v(_vm._s(_vm.selectedBookName))]), _vm._v(" "), _vm._l((_vm.chapterCount), function(n, index) {
    return _c('div', {
      key: index,
      staticClass: "chapter",
      attrs: {
        "data-chapter": n
      },
      on: {
        "click": function($event) {
          _vm.chapterSelected(n)
        }
      }
    }, [_c('p', {
      staticClass: "shadow theme-mid hover"
    }, [_vm._v(_vm._s(n))])])
  })], 2) : _vm._e()])])])
},staticRenderFns: []}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view'), _vm._v(" "), _c('div', {
    staticClass: "loading visible"
  }, [_vm._v("LOADING...")])], 1)
},staticRenderFns: []}

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bible; });
/* unused harmony export Verse */
/* unused harmony export WordRange */
var books = [
  {'identifier': 'GENESIS', 'name': 'Genesis', 'chapters': 50, 'verses': [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26]},
  {'identifier': 'EXODUS', 'name': 'Exodus', 'chapters': 40, 'verses': [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38]},
  {'identifier': 'LEVITICUS', 'name': 'Leviticus', 'chapters': 27, 'verses': [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34]},
  {'identifier': 'NUMBERS', 'name': 'Numbers', 'chapters': 36, 'verses': [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13]},
  {'identifier': 'DEUTERONOMY', 'name': 'Deuteronomy', 'chapters': 34, 'verses': [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12]},
  {'identifier': 'JOSHUA', 'name': 'Joshua', 'chapters': 24, 'verses': [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33]},
  {'identifier': 'JUDGES', 'name': 'Judges', 'chapters': 21, 'verses': [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]},
  {'identifier': 'RUTH', 'name': 'Ruth', 'chapters': 4, 'verses': [22, 23, 18, 22]},
  {'identifier': '1SAMUEL', 'name': '1 Samuel', 'chapters': 31, 'verses': [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13]},
  {'identifier': '2SAMUEL', 'name': '2 Samuel', 'chapters': 24, 'verses': [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25]},
  {'identifier': '1KINGS', 'name': '1 Kings', 'chapters': 22, 'verses': [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53]},
  {'identifier': '2KINGS', 'name': '2 Kings', 'chapters': 25, 'verses': [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30]},
  {'identifier': '1CHRONICLES', 'name': '1 Chronicles', 'chapters': 29, 'verses': [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30]},
  {'identifier': '2CHRONICLES', 'name': '2 Chronicles', 'chapters': 36, 'verses': [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23]},
  {'identifier': 'EZRA', 'name': 'Ezra', 'chapters': 10, 'verses': [11, 70, 13, 24, 17, 22, 28, 36, 15, 44]},
  {'identifier': 'NEHEMIAH', 'name': 'Nehemiah', 'chapters': 13, 'verses': [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31]},
  {'identifier': 'ESTHER', 'name': 'Esther', 'chapters': 10, 'verses': [22, 23, 15, 17, 14, 14, 10, 17, 32, 3]},
  {'identifier': 'JOB', 'name': 'Job', 'chapters': 42, 'verses': [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17]},
  {'identifier': 'PSALM', 'name': 'Psalm', 'chapters': 150, 'verses': [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6]},
  {'identifier': 'PROVERBS', 'name': 'Proverbs', 'chapters': 31, 'verses': [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31]},
  {'identifier': 'ECCLESIASTES', 'name': 'Ecclesiastes', 'chapters': 12, 'verses': [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14]},
  {'identifier': 'SONGOFSOLOMON', 'name': 'Song of Solomon', 'chapters': 8, 'verses': [17, 17, 11, 16, 16, 13, 13, 14]},
  {'identifier': 'ISAIAH', 'name': 'Isaiah', 'chapters': 66, 'verses': [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24]},
  {'identifier': 'JEREMIAH', 'name': 'Jeremiah', 'chapters': 52, 'verses': [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34]},
  {'identifier': 'LAMENTATIONS', 'name': 'Lamentations', 'chapters': 5, 'verses': [22, 22, 66, 22, 22]},
  {'identifier': 'EZEKIEL', 'name': 'Ezekiel', 'chapters': 48, 'verses': [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35]},
  {'identifier': 'DANIEL', 'name': 'Daniel', 'chapters': 12, 'verses': [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13]},
  {'identifier': 'HOSEA', 'name': 'Hosea', 'chapters': 14, 'verses': [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9]},
  {'identifier': 'JOEL', 'name': 'Joel', 'chapters': 3, 'verses': [20, 32, 21]},
  {'identifier': 'AMOS', 'name': 'Amos', 'chapters': 9, 'verses': [15, 16, 15, 13, 27, 14, 17, 14, 15]},
  {'identifier': 'OBADIAH', 'name': 'Obadiah', 'chapters': 1, 'verses': [21]},
  {'identifier': 'JONAH', 'name': 'Jonah', 'chapters': 4, 'verses': [17, 10, 10, 11]},
  {'identifier': 'MICAH', 'name': 'Micah', 'chapters': 7, 'verses': [16, 13, 12, 13, 15, 16, 20]},
  {'identifier': 'NAHUM', 'name': 'Nahum', 'chapters': 3, 'verses': [15, 13, 19]},
  {'identifier': 'HABAKKUK', 'name': 'Habakkuk', 'chapters': 3, 'verses': [17, 20, 19]},
  {'identifier': 'ZEPHANIAH', 'name': 'Zephaniah', 'chapters': 3, 'verses': [18, 15, 20]},
  {'identifier': 'HAGGAI', 'name': 'Haggai', 'chapters': 2, 'verses': [15, 23]},
  {'identifier': 'ZECHARIAH', 'name': 'Zechariah', 'chapters': 14, 'verses': [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21]},
  {'identifier': 'MALACHI', 'name': 'Malachi', 'chapters': 4, 'verses': [14, 17, 18, 6]},
  {'identifier': 'MATTHEW', 'name': 'Matthew', 'chapters': 28, 'verses': [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20]},
  {'identifier': 'MARK', 'name': 'Mark', 'chapters': 16, 'verses': [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]},
  {'identifier': 'LUKE', 'name': 'Luke', 'chapters': 24, 'verses': [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53]},
  {'identifier': 'JOHN', 'name': 'John', 'chapters': 21, 'verses': [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]},
  {'identifier': 'ACTS', 'name': 'Acts', 'chapters': 28, 'verses': [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31]},
  {'identifier': 'ROMANS', 'name': 'Romans', 'chapters': 16, 'verses': [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]},
  {'identifier': '1CORINTHIANS', 'name': '1 Corinthians', 'chapters': 16, 'verses': [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24]},
  {'identifier': '2CORINTHIANS', 'name': '2 Corinthians', 'chapters': 13, 'verses': [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14]},
  {'identifier': 'GALATIANS', 'name': 'Galatians', 'chapters': 6, 'verses': [24, 21, 29, 31, 26, 18]},
  {'identifier': 'EPHESIANS', 'name': 'Ephesians', 'chapters': 6, 'verses': [23, 22, 21, 32, 33, 24]},
  {'identifier': 'PHILIPPIANS', 'name': 'Philippians', 'chapters': 4, 'verses': [30, 30, 21, 23]},
  {'identifier': 'COLOSSIANS', 'name': 'Colossians', 'chapters': 4, 'verses': [29, 23, 25, 18]},
  {'identifier': '1THESSALONIANS', 'name': '1 Thessalonians', 'chapters': 5, 'verses': [10, 20, 13, 18, 28]},
  {'identifier': '2THESSALONIANS', 'name': '2 Thessalonians', 'chapters': 3, 'verses': [12, 17, 18]},
  {'identifier': '1TIMOTHY', 'name': '1 Timothy', 'chapters': 6, 'verses': [20, 15, 16, 16, 25, 21]},
  {'identifier': '2TIMOTHY', 'name': '2 Timothy', 'chapters': 4, 'verses': [18, 26, 17, 22]},
  {'identifier': 'TITUS', 'name': 'Titus', 'chapters': 3, 'verses': [16, 15, 15]},
  {'identifier': 'PHILEMON', 'name': 'Philemon', 'chapters': 1, 'verses': [25]},
  {'identifier': 'HEBREWS', 'name': 'Hebrews', 'chapters': 13, 'verses': [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25]},
  {'identifier': 'JAMES', 'name': 'James', 'chapters': 5, 'verses': [27, 26, 18, 17, 20]},
  {'identifier': '1PETER', 'name': '1 Peter', 'chapters': 5, 'verses': [25, 25, 22, 19, 14]},
  {'identifier': '2PETER', 'name': '2 Peter', 'chapters': 3, 'verses': [21, 22, 18]},
  {'identifier': '1JOHN', 'name': '1 John', 'chapters': 5, 'verses': [10, 29, 24, 21, 21]},
  {'identifier': '2JOHN', 'name': '2 John', 'chapters': 1, 'verses': [13]},
  {'identifier': '3JOHN', 'name': '3 John', 'chapters': 1, 'verses': [14]},
  {'identifier': 'JUDE', 'name': 'Jude', 'chapters': 1, 'verses': [25]},
  {'identifier': 'REVELATION', 'name': 'Revelation', 'chapters': 22, 'verses': [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21]}
]

var Bible = {
  otBooks: books.slice(0, 39),
  ntBooks: books.slice(39, 66),
  Passage: Passage,
  book (bookIdentifier) {
    return books.find(book => book.identifier === bookIdentifier)
  },
  bookName (bookIdentifier) {
    var b = this.book(bookIdentifier)
    return b ? b.name : undefined
  },
  chapters (bookIdentifier) {
    var b = this.book(bookIdentifier)
    return b ? b.chapters : undefined
  },
  buildPassage (startVerse, endVerse) {
    return new Passage(startVerse, endVerse)
  },
  compareReferences (verse1, verse2) {
    if (!verse1 || !verse2 || (verse1.book !== verse2.book)) {
      return NaN
    }
    if (verse2.chapter > verse1.chapter) {
      return 1
    } else if (verse2.chapter === verse1.chapter) {
      if (verse2.number > verse1.number) {
        return 1
      } else if (verse2.number === verse1.number) {
        return 0
      } else {
        return -1
      }
    } else {
      return -1
    }
  },
  passageContains (startVerse, endVerse, verseInQuestion) {
    var startingVerseComparison = this.compareReferences(startVerse, verseInQuestion)
    if (startingVerseComparison === 0) {
      return true
    } else if (endVerse !== undefined) {
      var endingVerseComparison = this.compareReferences(verseInQuestion, endVerse)
      if (endingVerseComparison === 0 || (startingVerseComparison === 1 && endingVerseComparison === 1)) {
        return true
      }
      return false
    }
  }
}

// Verse
function Verse (bookIdentifier, chapter, number) {
  this.book = bookIdentifier
  this.chapter = chapter
  this.number = number
}

Verse.prototype.equals = function (verse) {
  return Bible.compareReferences(verse, this) === 0
}
Verse.prototype.isAfter = function (verse) {
  return Bible.compareReferences(verse, this) === 1
}
Verse.prototype.isBefore = function (verse) {
  return Bible.compareReferences(this, verse) === 1
}

// Passage
function Passage (startVerse, endVerse) {
  this.start = startVerse
  this.end = endVerse
}

Passage.prototype.description = function () {
  var text = `${Bible.bookName(this.start.book)} ${this.start.chapter}:${this.start.number}`
  if (this.end !== undefined) {
    var endChapter = this.end.chapter !== this.start.chapter ? `${this.end.chapter}:` : ''
    text = `${text}-${endChapter}${this.end.number}`
  }
  return text
}

Passage.prototype.fromJson = function (json) {
  var start = json.start
  var end = json.end
  return new Passage(new Verse(start.book, start.chapter, start.number), new Verse(end.book, end.chapter, end.number))
}

// WordRange
// word: {book: b, verse: verseNumber, text: text, index: index}
function WordRange (startingWord, endingWord) {
  this.kind = 'word-range'
  this.startingWord = startingWord
  this.endingWord = endingWord
}

WordRange.prototype.includes = function (word) {
  var start = this.startingWord.verse * 100 + this.startingWord.index
  var end = this.endingWord.verse * 100 + this.endingWord.index
  var wordRef = word.verse * 100 + word.index
  return this.startingWord.book === word.book &&
  wordRef >= start &&
  wordRef <= end
}

WordRange.prototype.fromJson = function (json) {
  return new WordRange(json.startingWord, json.endingWord)
}




/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


var ESV = window.esv
/* harmony default export */ __webpack_exports__["a"] = ({
  load (bookIdentifier, chapter, version, onload) {
    if (version === 'NASB') {
      var path = '/static/bibles/nasb/' + bookIdentifier + '/' + chapter + '.json'
      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.getJSON(path, function (json) {
        onload(json)
      })
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.ajax({
        url: `https://bible.truewordsapp.com/esv/${bookIdentifier}/${chapter}`,
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('x-esv-api-key', ESV) },
        success: function (verses) {
          verses.forEach(v => { v.text = v.text.replace(/<f>*.<\/f>/g, '') })
          onload(verses)
        }
      })
    }
  }
});


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// SCALES
var pentatonicMajor = [0, 2, 4, 7, 9];
var pentatonicMinor = [0, 2, 3, 7, 9];
var major = [0, 2, 4, 5, 7, 9, 11];
var minor = [0, 2, 3, 5, 7, 9, 11];
var wholeToneScale = [0, 2, 4, 6, 8, 10];

var chars = {
  a: 0, b: 1, c: 2, d: 3, e: 4, f: 5,
  g: 6, h: 7, i: 8, j: 9, k: 10, l: 11,
  m: 12, n: 13, o: 14, p: 15, q: 16, r: 17,
  s: 18, t: 19, u: 20, v: 21, w: 22, x: 23,
  y: 24, z: 25
}

function MidiWord(tonicBassNote, tempo, scale) {
  this.tonicBassNote = tonicBassNote
  this.tempo = tempo
  this.scale = scale
  this.scales = {
    "major": major,
    "minor": minor,
    "major_pentatonic": pentatonicMajor,
    "minor_pentatonic": pentatonicMinor,
    "whole": wholeToneScale
  }
}

const chords = {
  major: {tonic: [0, 12, 16, 19, 36], fifth: [7, 14, 19, 23, 31]},
  minor: {tonic: [0, 12, 15, 19, 36], fifth: [7, 14, 19, 22, 31]},
  major_pentatonic: {tonic: [0, 12, 16, 19, 36], fifth: [7, 14, 19, 23, 31]},
  minor_pentatonic: {tonic: [0, 12, 15, 19, 36], fifth: [7, 14, 19, 22, 31]},
  whole: {tonic: [0, 12, 16, 20, 36], fifth: [8, 16, 20, 24, 32]}
}

MidiWord.prototype.scaleNotes = function () {
  return this.scales[this.scale]
}
MidiWord.prototype.getChord = function (chord) {
  return chords[this.scale][chord].map(i => this.tonicBassNote + i)
}
MidiWord.prototype.msPerBeat = function () {
  return 60 / this.tempo * 1000
}
MidiWord.prototype.playTonic = function (instrument) {
  window.MIDI.chordOn(instrument || 0, this.getChord('tonic'), 115, 0)
}
MidiWord.prototype.playFifth = function (instrument) {
  window.MIDI.chordOn(instrument || 0, this.getChord('fifth'), 115, 0)
}
MidiWord.prototype.getNote = function (char) {
  var charValue = chars[char.toLowerCase()]
  var octave = parseInt(charValue / this.scaleNotes().length)
  var offset = charValue % this.scaleNotes().length
  return this.tonicBassNote + (12 * octave) + this.scaleNotes()[offset]
}
MidiWord.prototype.playWord = function (word, instrument) {
  var delay = 0 // play one note every quarter second
  var velocity = this.randomVelocity()
  var chord = this.getNotes(word)
  window.MIDI.chordOn(instrument || 0, chord, velocity, delay)
  this.previousChord = chord
}
MidiWord.prototype.getNotes = function (word) {
  return word.split('').map(c => this.getNote(c))
}
MidiWord.prototype.randomVelocity = function () {
  return Math.random() * (127 - 40) + 40
}

MidiWord.prototype.glissando = function (word) {
  var delay = 0
  var notes = this.getNotes(word)
  notes.forEach(note => {
    window.MIDI.noteOn(0, note, 120, delay)
    delay += this.msPerBeat() / 1000 / 4
  })
}

/* harmony default export */ __webpack_exports__["a"] = (new MidiWord(40, 120, 'major_pentatonic'));


/***/ })
],[5]);
//# sourceMappingURL=app.ee640d200fb65ac948e0.js.map
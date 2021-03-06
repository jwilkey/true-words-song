// SCALES
var pentatonicMajor = [0, 2, 4, 7, 9];
var pentatonicMinor = [0, 2, 3, 7, 9];
var major = [0, 2, 4, 5, 7, 9, 11];
var minor = [0, 2, 3, 5, 7, 8, 10];
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
  this.scales = scales
}

const chords = {
  major: {tonic: [0, 12, 16, 19, 36], fifth: [7, 14, 19, 23, 31]},
  minor: {tonic: [0, 12, 15, 19, 36], fifth: [7, 14, 19, 22, 31]},
  major_pentatonic: {tonic: [0, 12, 16, 19, 36], fifth: [7, 14, 19, 23, 31]},
  minor_pentatonic: {tonic: [0, 12, 15, 19, 36], fifth: [7, 14, 19, 22, 31]},
  whole: {tonic: [0, 12, 16, 20, 36], fifth: [8, 16, 20, 24, 32]}
}

const scales = {
  major_pentatonic: {name: 'Major Pentatonic', notes: pentatonicMajor},
  minor_pentatonic: {name: 'Minor Pentatonic', notes: pentatonicMinor},
  major: {name: 'Major', notes: major},
  minor: {name: 'Minor', notes: minor},
  whole: {name: 'Whote Tone', notes: wholeToneScale}
}

MidiWord.prototype.scaleNotes = function () {
  return this.scales[this.scale].notes
}
MidiWord.prototype.getChord = function (chord) {
  return chords[this.scale][chord].map(i => this.tonicBassNote + i)
}
MidiWord.prototype.msPerBeat = function () {
  return 60 / this.tempo * 1000
}
MidiWord.prototype.playTonic = function (instrument, shouldGlissando) {
  if (shouldGlissando) {
    this.glissandoNotes(this.getChord('tonic'))
  } else {
    window.MIDI.chordOn(instrument || 0, this.getChord('tonic'), 115, 0)
  }
}
MidiWord.prototype.playFifth = function (instrument, shouldGlissando) {
  if (shouldGlissando) {
    this.glissandoNotes(this.getChord('fifth'))
  } else {
    window.MIDI.chordOn(instrument || 0, this.getChord('fifth'), 115, 0)
  }
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
  var notes = this.getNotes(word)
  this.glissandoNotes(notes)
}
MidiWord.prototype.glissandoNotes = function (notes) {
  var delay = 0
  notes.forEach(note => {
    window.MIDI.noteOn(0, note, 120, delay)
    delay += this.msPerBeat() / 1000 / 4
  })
}

export default new MidiWord(40, 160, 'major_pentatonic')

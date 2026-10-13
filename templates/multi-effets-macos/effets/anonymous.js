// Ecran Anonymous plein ecran sur chaque ecran, espace pour quitter.
// Affiche anonymous.png (a cote du script) si present, sinon le texte seul.
ObjC.import('AppKit');
var app = $.NSApplication.sharedApplication;
app.setActivationPolicy(0);

var args = $.NSProcessInfo.processInfo.arguments;
var dir = ObjC.unwrap(args.objectAtIndex(args.count - 1)).replace(/\/[^\/]*$/, '');

function readText(path, fallback) {
  var s = $.NSString.stringWithContentsOfFileEncodingError(path, 4, null);
  if (s.isNil()) return fallback;
  var t = ObjC.unwrap(s).trim();
  return t.length ? t : fallback;
}
var lines = readText(dir + '/anonymous.txt',
  'We are Anonymous. We are Legion.\nWe do not forgive. We do not forget.\nExpect us.').split('\n');
var img = $.NSImage.alloc.initWithContentsOfFile(dir + '/anonymous.png');
var hasImg = !img.isNil();

// une NSWindow borderless refuse le focus clavier par defaut, d'ou la sous-classe
ObjC.registerSubclass({name:'AnonWindow', superclass:'NSWindow', methods:{
  'canBecomeKeyWindow':{types:['bool',[]], implementation:function(){return true;}}}});
ObjC.registerSubclass({name:'AnonView', superclass:'NSView', methods:{
  'acceptsFirstResponder':{types:['bool',[]], implementation:function(){return true;}},
  'keyDown:':{types:['void',['id']], implementation:function(e){ if(e.keyCode==49) app.terminate($()); }}}}); // 49 = espace

var green = $.NSColor.colorWithSRGBRedGreenBlueAlpha(0, 1, 0.25, 1);
function font(size) {
  var f = $.NSFont.fontWithNameSize('Menlo-Bold', size);
  return f.isNil() ? $.NSFont.boldSystemFontOfSize(size) : f;
}
function label(t, size, y, w, color) {
  var f = $.NSTextField.alloc.initWithFrame($.NSMakeRect(0, y, w, size * 1.4));
  f.setStringValue($(t)); f.setBezeled(false); f.setDrawsBackground(false);
  f.setEditable(false); f.setSelectable(false);
  f.setFont(font(size)); f.setTextColor(color);
  f.sizeToFit; // centrage manuel, l'alignement natif ne centre pas en borderless
  f.setFrameOrigin($.NSMakePoint(Math.round((w - f.frame.size.width) / 2), y));
  return f;
}

var sc = $.NSScreen.screens, keep = [];
for (var i = 0; i < sc.count; i++) {
  var fr = sc.objectAtIndex(i).frame, w = fr.size.width, h = fr.size.height;
  var win = $.AnonWindow.alloc.initWithContentRectStyleMaskBackingDefer(fr, 0, 2, false);
  win.setLevel(1000); win.setBackgroundColor($.NSColor.blackColor); win.setCollectionBehavior(257);
  var v = $.AnonView.alloc.initWithFrame($.NSMakeRect(0, 0, w, h));

  // avec image : image en haut, texte en dessous ; sans image : texte centre et plus gros
  var size = Math.round(h / (hasImg ? 32 : 20));
  var step = Math.round(size * 1.6);
  var top = hasImg ? h * 0.28 : h * 0.5 + (lines.length - 1) * step / 2;
  if (hasImg) {
    var iv = $.NSImageView.alloc.initWithFrame($.NSMakeRect(w * 0.1, h * 0.34, w * 0.8, h * 0.6));
    iv.setImage(img); iv.setImageScaling(3); // 3 = proportionnel, agrandit ou reduit
    v.addSubview(iv);
  }
  for (var j = 0; j < lines.length; j++) v.addSubview(label(lines[j], size, top - j * step, w, green));
  v.addSubview(label('espace pour quitter', Math.round(h / 60), h * 0.03, w, $.NSColor.darkGrayColor));

  win.setContentView(v); win.makeFirstResponder(v); win.makeKeyAndOrderFront($()); keep.push(win);
}
app.activateIgnoringOtherApps(true);
app.run;

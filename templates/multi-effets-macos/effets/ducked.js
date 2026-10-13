// Fenetre plein ecran sur CHAQUE ecran, fermeture sur espace.
// Effet du template multi-effets, lance par go.sh.
ObjC.import('AppKit');
var app = $.NSApplication.sharedApplication;
app.setActivationPolicy(0);
// une NSWindow borderless refuse le focus clavier par defaut, d'ou la sous-classe
ObjC.registerSubclass({name:'DuckWindow', superclass:'NSWindow', methods:{
  'canBecomeKeyWindow':{types:['bool',[]], implementation:function(){return true;}}}});
ObjC.registerSubclass({name:'DuckView', superclass:'NSView', methods:{
  'acceptsFirstResponder':{types:['bool',[]], implementation:function(){return true;}},
  'keyDown:':{types:['void',['id']], implementation:function(e){ if(e.keyCode==49) app.terminate($()); }}}}); // 49 = espace
function label(t, s, y, w) {
  var f = $.NSTextField.alloc.initWithFrame($.NSMakeRect(0, y, w, s * 1.4));
  f.setStringValue($(t)); f.setBezeled(false); f.setDrawsBackground(false);
  f.setEditable(false); f.setSelectable(false);
  f.setFont($.NSFont.boldSystemFontOfSize(s)); f.setTextColor($.NSColor.whiteColor);
  f.sizeToFit; // centrage manuel, l'alignement natif ne centre pas en borderless
  f.setFrameOrigin($.NSMakePoint(Math.round((w - f.frame.size.width) / 2), y));
  return f;
}
var sc = $.NSScreen.screens, keep = [];
for (var i = 0; i < sc.count; i++) {
  var fr = sc.objectAtIndex(i).frame, w = fr.size.width, h = fr.size.height;
  var win = $.DuckWindow.alloc.initWithContentRectStyleMaskBackingDefer(fr, 0, 2, false);
  win.setLevel(1000); win.setBackgroundColor($.NSColor.blackColor); win.setCollectionBehavior(257);
  var v = $.DuckView.alloc.initWithFrame($.NSMakeRect(0, 0, w, h));
  v.addSubview(label('🦆 DUCKED', Math.round(h / 6), h * 0.5, w));
  v.addSubview(label('appuie sur ESPACE pour quitter', Math.round(h / 28), h * 0.3, w));
  win.setContentView(v); win.makeFirstResponder(v); win.makeKeyAndOrderFront($()); keep.push(win);
}
app.activateIgnoringOtherApps(true);
app.run;

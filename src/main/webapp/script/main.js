function nonEmpty(x) { return x && x.length > 0 }

$(function() {
  overhead = 300
  if (window.self !== window.top) {
    $("body").addClass("embedded")
    overhead = 200
  }
  var royEnv = RoyEnv()
  function width() { return $("body").width() }
  function height() { 
    return Math.min(width() / 2, $(window).height() - overhead)
  }
  repl = royRepl.init($(".console"), royEnv)
  turtle = Turtle($("#turtlegraphics"), width(), height())
  turtle.spin(360, 10)
  var editor = Editor($("body"), royEnv, repl)
  Cookbook(editor, repl)
  var storage = Storage()
  Sharing(editor.code, storage)

  storage.openResult.onValue(function(turtle) {
    editor.reset()
    repl.paste(turtle.content.code)
    document.title = turtle.content.description + " -" + document.title
  })
  var turtleId = document.location.search.split("=")[1]
  if (turtleId) storage.open(turtleId)

  _.merge(window, Commands(storage, editor.code));

  $(window).resize(function() {
    turtle.resize(width(), height())
  })
})

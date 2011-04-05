" [JSLINT, The JavaScript Code Quality Tool]
" http://www.jslint.com/

if exists("current_compiler")
  finish
endif
let current_compiler = "jslint"

CompilerSet makeprg=jslint
      \\ $*
      \\ %

CompilerSet errorformat=
      \%f:%l:%c:%m


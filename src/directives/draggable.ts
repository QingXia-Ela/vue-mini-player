/**
 * @example
 * 
 * const myDirective = (ctx) => {
  // the element the directive is on
  ctx.el
  // the raw value expression
  // e.g. v-my-dir="x" then this would be "x"
  ctx.exp
  // v-my-dir:foo -> "foo"
  ctx.arg
  // v-my-dir.mod -> { mod: true }
  ctx.modifiers
  // evaluate the expression and get its value
  ctx.get()
  // evaluate arbitrary expression in current scope
  ctx.get(`${ctx.exp} + 10`)

  // run reactive effect
  ctx.effect(() => {
    // this will re-run every time the get() value changes
    console.log(ctx.get())
  })

  return () => {
    // cleanup if the element is unmounted
  }
}

// register the directive
createApp().directive('my-dir', myDirective).mount()
 */


const Draggable = (ctx: any) => {
  const ele: HTMLDivElement = ctx.exp ? document.querySelector(ctx.exp) : ctx.el
  if (!ele) {
    return
  }

  let cx = 0, cy = 0

  function _UpdateXY(x: number, y: number) {
    ele.style.setProperty('left', x + 'px')
    ele.style.setProperty('top', y + 'px')
  }

  function onDrag(e: MouseEvent | {
    clientX: number
    clientY: number
  }) {
    let fx = e.clientX - cx, fy = e.clientY - cy
    if (fx <= 0) fx = 0
    else if (fx + ele.offsetWidth >= window.innerWidth) fx = window.innerWidth - ele.offsetWidth
    if (fy <= 0) fy = 0
    else if (fy + ele.offsetHeight >= window.innerHeight) fy = window.innerHeight - ele.offsetHeight
    _UpdateXY(fx, fy)
  }

  window.addEventListener('resize', () => {
    onDrag({ clientX: window.innerWidth, clientY: window.innerHeight })
  })

  function clearState() {
    window.removeEventListener('mousemove', onDrag)
  }

  ctx.el.addEventListener('mousedown', (e: MouseEvent) => {
    cx = e.clientX - ele.offsetLeft, cy = e.clientY - ele.offsetTop
    function cs() {
      clearState()
      window.removeEventListener('mouseup', cs)
    }
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', cs)
  })
  return () => {

  }
}

export default Draggable
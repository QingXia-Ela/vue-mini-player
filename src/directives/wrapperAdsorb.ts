const Adsorb = (ctx: any) => {
  const e = ctx.el
  window.addEventListener('mouseup', () => {
    if (e.offsetLeft > window.innerWidth / 2)
      e.style.setProperty('left', window.innerWidth - e.clientWidth + 'px')
    else
      e.style.setProperty('left', '0px')
  })
  return () => {

  }
}

export default Adsorb
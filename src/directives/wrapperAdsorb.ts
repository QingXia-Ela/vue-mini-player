const exp = /left|right/

const Adsorb = (ctx: any) => {
  const e = ctx.el as HTMLElement, resetPos = () => {
    if (e.offsetLeft > window.innerWidth / 2) {
      e.setAttribute('class', `${e.getAttribute('class')?.replace(exp, '')} right`)
      e.style.setProperty('left', window.innerWidth - e.clientWidth + 'px')
    }
    else {
      e.setAttribute('class', `${e.getAttribute('class')?.replace(exp, '')} left`)
      e.style.setProperty('left', '0px')
    }
  }
  window.addEventListener('mouseup', () => setTimeout(() => {
    resetPos()
  }, 20))
  window.addEventListener('resize', resetPos)
  return () => {

  }
}

export default Adsorb

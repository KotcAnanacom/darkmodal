export default class DarkModal {
  constructor(options) {
    let defaultOptions = {
      animation: 'fade',
      speed: 400,
      isOpen: () => {},
      isClose: () => {},
      closeAll: false
    }
    this.options = Object.assign(defaultOptions, options)
    this.animation = this.options.animation
    this.speed = this.options.speed
    this.modal = null
    this.allModals = []
    this.fixBlock = document.querySelectorAll('.fix-block')
    this.init()
  }

  init() {
    this.handlerClick()
  }

  handlerClick() {
    document.addEventListener('click', (e) => {
      const darkModalBtn = e.target.closest('[data-darkmodal-path]')
      if (darkModalBtn) {
        const darkModalBtnValue = darkModalBtn.dataset.darkmodalPath
        this.modal = document.querySelector(`[data-darkmodal-target="${darkModalBtnValue}"`)

        if (this.modal) {
          this.getValue()
          this.openModal()
        }
      }

      if (e.target.closest('.darkmodal-close')) {
        if (this.allModals.length > 0) {
          const lastModal = this.allModals[this.allModals.length - 1]
          this.closeModal(lastModal)
        }
      }

      if (e.target.closest('[data-darkmodal-close-all]')) {
        this.closeAllModals()
      }
    })

    document.addEventListener('mouseup', (e) => {
      if (e.target.closest('.darkmodal') && !e.target.closest('.darkmodal__inner')) {
        if (this.options.closeAll) {
          this.closeAllModals()
        } else {
          if (this.allModals.length > 0) {
            const lastModal = this.allModals[this.allModals.length - 1]
            this.closeModal(lastModal)
          }
        }
      }

      if (e.target.closest('.darkmodal') && !e.target.closest('.darkmodal__inner') && this.options.closeAllOnOverlay) {
        this.closeAllModals()
      }
    })

    document.addEventListener('cancel', (e) => {
      if (this.options.closeAll) {
        this.closeAllModals()
      } else {
        if (this.allModals.length > 0 && e.target.closest('.darkmodal')) {
          e.preventDefault()
          const lastModal = this.allModals[this.allModals.length - 1]
          this.closeModal(lastModal)
        }
      }
    }, true)
  }

  getValue() {
    const valueAnimation = this.modal.dataset.darkmodalAnimation
    const valueSpeed = this.modal.dataset.darkmodalSpeed

    this.animation = valueAnimation || this.options.animation
    this.speed = parseInt(valueSpeed) || this.options.speed

    this.setValue()
  }

  setValue() {
    this.modal.style.setProperty('--transition-time', this.speed + 'ms')
  }

  openModal() {
    if (this.allModals.length === 0) {
      this.disableScroll()
    }
    this.modal.classList.add(this.animation)
    this.modal.showModal()
    this.allModals.push(this.modal)

    this.modal.classList.add('animation')
    this.options.isOpen(this)
  }

  closeModal(modal) {
    if (!modal || modal.isClosing) return
    modal.isClosing = true

    modal.classList.add('hide')
    setTimeout(() => {
      modal.classList.remove(this.animation)
      modal.classList.remove('animation')
      modal.close()
      modal.classList.remove('hide')
      modal.isClosing = false

      this.allModals = this.allModals.filter(m => m !== modal)

      if (this.allModals.length === 0) {
        this.enableScroll()
      }
      this.options.isClose(this)
    }, this.speed)
  }

  closeAllModals() {
    this.allModals.forEach(modal => {
      this.closeModal(modal)
    })
  }

  disableScroll() {
    let pagePosition = window.scrollY
    this.removePadding()
    document.body.classList.add('disable-scroll')
    document.body.dataset.position = pagePosition
    document.body.style.top = -pagePosition + 'px'
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10)
    this.addPadding()
    document.body.style.top = 'auto'
    document.body.classList.remove('disable-scroll')
    window.scrollTo({
      top: pagePosition,
      left: 0
    })
    document.body.removeAttribute('data-position')
  }

  removePadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px'
    this.fixBlock.forEach(el => {
      el.style.paddingRight = paddingOffset
    })
    document.body.style.paddingRight = paddingOffset
  }

  addPadding() {
    this.fixBlock.forEach(el => {
      el.style.paddingRight = '0px'
    })
    document.body.style.paddingRight = '0px'
  }
}
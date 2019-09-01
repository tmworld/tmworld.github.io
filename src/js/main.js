;(function () {
  const win = window
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = (window.sr = ScrollReveal())

    sr.reveal('.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'right',
      interval: 100
    })

    sr.reveal('.media-canvas, .pricing-faqs,', {
      duration: 600,
      scale: '.95',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      viewFactor: 0.5
    })

    const pricingTables = document.querySelectorAll('.pricing-table')

    pricingTables.forEach(pricingTable => {
      const pricingTableHeader = [].slice.call(
        pricingTable.querySelectorAll('.pricing-table-header')
      )
      const pricingTableList = [].slice.call(
        pricingTable.querySelectorAll('.pricing-table-features li')
      )
      const pricingTableCta = [].slice.call(
        pricingTable.querySelectorAll('.pricing-table-cta')
      )
      const elements = pricingTableHeader
        .concat(pricingTableList)
        .concat(pricingTableCta)

      sr.reveal(elements, {
        duration: 600,
        distance: '20px',
        easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
        interval: 100,
        origin: 'bottom',
        viewFactor: 0.5
      })
    })

    sr.reveal('.tabs-links li, .pricing-faqs, .cta-inner', {
      duration: 600,
      distance: '40px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      interval: 100,
      origin: 'bottom',
      viewFactor: 0.2
    })
  }

  // Wait that device mockup has loaded before displaying
  const deviceMockup = document.querySelector('.device-mockup')

  function deviceMockupLoaded () {
    deviceMockup.classList.add('has-loaded')
  }

  if (deviceMockup.complete) {
    deviceMockupLoaded()
  } else {
    deviceMockup.addEventListener('load', deviceMockupLoaded)
  }

  // Accordion component
  const accordionEl = document.getElementsByClassName('accordion-title')

  if (accordionEl.length) {
    for (let i = 0; i < accordionEl.length; i++) {
      accordionEl[i].addEventListener('click', function () {
        this.parentNode.classList.toggle('is-open')
        const panel = this.nextElementSibling
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`
        }
      })
    }
  }

  // Tabs component
  const tabLinksAll = document.getElementsByClassName('tab-link')

  if (tabLinksAll.length) {
    for (let i = 0; i < tabLinksAll.length; i++) {
      tabLinksAll[i].addEventListener('click', function (e) {
        e.preventDefault()
        let tabLinksContainer = tabLinksAll[i].parentNode.parentNode
        let tabPanels = tabLinksContainer.nextElementSibling.getElementsByClassName(
          'tab-panel'
        )
        let tabLinks = tabLinksContainer.getElementsByClassName('tab-link')
        // Remove is-active class from all links and panels
        for (let i = 0; i < tabLinks.length; i++) {
          tabLinks[i].classList.remove('is-active')
        }
        for (let i = 0; i < tabPanels.length; i++) {
          tabPanels[i].classList.remove('is-active')
        }
        // Get the ID of panel to display
        let tabID = this.getAttribute('href')
        // Add is-active class to matching link and panel
        tabLinksAll[i].classList.add('is-active')
        document.querySelector(tabID).classList.add('is-active')
      })
    }
  }

  // Features title adjustment
  // const featuresSection = document.querySelector('.features')
  // const featuresTitle = featuresSection.querySelector('.section-title')
  // const firstFeature = document.querySelector('.feature-inner')

  // featuresTitlePos()
  // win.addEventListener('resize', featuresTitlePos)

  // function featuresTitlePos () {
  //   let featuresSectionLeft = featuresSection.querySelector('.features-inner').getBoundingClientRect().left
  //   let firstFeatureLeft = firstFeature.getBoundingClientRect().left
  //   let featuresTitleOffset = parseInt(firstFeatureLeft - featuresSectionLeft)
  //   if (firstFeatureLeft > featuresSectionLeft) {
  //     featuresTitle.style.marginLeft = `${featuresTitleOffset}px`
  //   } else {
  //     featuresTitle.style.marginLeft = 0
  //   }
  // }

  // Moving objects
  const movingObjects = document.querySelectorAll('.is-moving-object')

  // Throttling
  function throttle (func, milliseconds) {
    let lastEventTimestamp = null
    let limit = milliseconds

    return (...args) => {
      let now = Date.now()

      if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
        lastEventTimestamp = now
        func.apply(this, args)
      }
    }
  }

  // Init vars
  let mouseX = 0
  let mouseY = 0
  let scrollY = 0
  let coordinateX = 0
  let coordinateY = 0
  let winW = doc.clientWidth
  let winH = doc.clientHeight

  // Move Objects
  function moveObjects (e, object) {
    mouseX = e.pageX
    mouseY = e.pageY
    scrollY = win.scrollY
    coordinateX = winW / 2 - mouseX
    coordinateY = winH / 2 - (mouseY - scrollY)

    for (let i = 0; i < object.length; i++) {
      const translatingFactor =
        object[i].getAttribute('data-translating-factor') || 20
      const rotatingFactor =
        object[i].getAttribute('data-rotating-factor') || 20
      const perspective = object[i].getAttribute('data-perspective') || 500
      let tranformProperty = []

      if (object[i].classList.contains('is-translating')) {
        tranformProperty.push(
          'translate(' +
            coordinateX / translatingFactor +
            'px, ' +
            coordinateY / translatingFactor +
            'px)'
        )
      }

      if (object[i].classList.contains('is-rotating')) {
        tranformProperty.push(
          'perspective(' +
            perspective +
            'px) rotateY(' +
            -coordinateX / rotatingFactor +
            'deg) rotateX(' +
            coordinateY / rotatingFactor +
            'deg)'
        )
      }

      if (
        object[i].classList.contains('is-translating') ||
        object[i].classList.contains('is-rotating')
      ) {
        tranformProperty = tranformProperty.join(' ')

        object[i].style.transform = tranformProperty
        object[i].style.transition = 'transform 1s ease-out'
        object[i].style.transformStyle = 'preserve-3d'
        object[i].style.backfaceVisibility = 'hidden'
      }
    }
  }

  // Call function with throttling
  if (movingObjects) {
    win.addEventListener(
      'mousemove',
      throttle(function (e) {
        moveObjects(e, movingObjects)
      }, 150)
    )
  }
})()

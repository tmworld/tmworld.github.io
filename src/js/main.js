;(function () {
  const $ = window.jQuery
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = (window.sr = ScrollReveal())

    sr.reveal('.clients li', {
      delay: 300,
      duration: 1000,
      rotate: {
        y: 50
      },
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      interval: 150
    })

    sr.reveal(
      '.feature, .tabs-links li, .testimonial, .pricing-table, .pricing-faqs, .cta-inner',
      {
        duration: 600,
        distance: '40px',
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        interval: 100,
        origin: 'bottom',
        viewFactor: 0.2
      }
    )
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

  $('.smootscroll').on('click', function (e) {
    e.preventDefault()
    var sec = $(this).attr('href')
    $('html, body').animate(
      {
        scrollTop: $(sec).offset().top
      },
      500
    )

    $('.nav-icon.site-header__control').removeClass('open')
    $('.site-header').removeClass('open')
    if ($(window).width() <= 768) {
      $('.site-header__nav')
        .stop()
        .slideUp()
    }
  })

  $(document).ready(function () {
    $('.nav-icon.site-header__control').click(function () {
      $(this).toggleClass('open')
      $('.site-header').toggleClass('open')
      $('.site-header__nav')
        .stop()
        .slideToggle()
    })

    var features = $('.features__covers .features__img')

    $('.features-wrap .feature').on('click', function () {
      var feature = $(this).data('feature')
      features.removeClass('active')
      $('.features__covers')
        .find(feature)
        .addClass('active')
    })
  })
})()

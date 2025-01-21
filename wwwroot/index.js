'use strict'

function getMeta (name) {
  const base = document.querySelector('meta[name="' + name + '"]')
  return base !== null ? base.getAttribute('content') : ''
}

function focusNextElement () {
  const focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
  if (document.activeElement) {
    const focussable = Array.prototype.filter.call(document.body.querySelectorAll(focussableElements), function (element) {
      return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
    })
    const index = focussable.indexOf(document.activeElement)
    if (index > -1) {
      const nextElement = focussable[index + 1] || focussable[0]
      nextElement.focus()
    }
  }
}

function formatDateTime (date, format) {
  if (!date) return ''
  if (typeof format === 'undefined') {
    format = 'DD/MM/YYYY'
  }
  return moment(date).format(format)
}

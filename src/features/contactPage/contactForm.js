let $ = window.$

import gsap from 'gsap'
import axios from 'axios'
import JustValidate from 'just-validate'
import helperFunctions from '../../utils/helperFunctions'
import SplitType from 'split-type'
import { bottomClipPath, fullClipPath, rightClipPath, topClipPath } from '../../utils/variables'

let ctx
let validation

export default function initContactForm() {
  ctx = gsap.context(() => {
    const contactForm = $('#contact-form')
    const allFocusInputs = contactForm.find('[data-focus=input]')
    const allFormButtons = [contactForm.find('[data-form=select-wrap]'), contactForm.find('[data-form=radio-wrap]')]
    const allAlternateItems = contactForm.find('[data-animate=form-alternate-item]')
    const submitButtonWrap = $('[data-form=submit-wrap]')
    const submitButtonTl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'back.inOut' } })
    submitButtonTl.to(submitButtonWrap, { scale: 0.925 })

    contactForm.hide()

    submitButtonWrap.on('mouseenter', (event) => {
      if (submitButtonWrap.hasClass('is-active')) {
        submitButtonTl.play()
      }
    })
    submitButtonWrap.on('mouseleave', (event) => {
      if (submitButtonWrap.hasClass('is-active')) {
        submitButtonTl.reverse()
      }
    })

    allFocusInputs.each((index, input) => {
      const text = $(input).siblings('[data-focus=text]')
      const focusTl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power3.inOut' } })

      focusTl.to(text, { top: '-1.25rem' })

      $(input).on('focusin', function () {
        focusTl.play()
      })
      $(input).on('focusout', function () {
        if (!$(input).val()) {
          focusTl.reverse()
        }
      })
    })

    $(allFormButtons).each((index, buttonGroup) => {
      buttonGroup.each((index, button) => {
        const bgFillPath = $(button).find('[data-form=bg-fill-path]')

        $(button).on('mouseenter', (event) => {
          const mouseDirection = helperFunctions.getMouseEnterDirection(event, button)
          const pathDirection = helperFunctions.handleCardHoverIn(mouseDirection, true)
          helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)
        })
        $(button).on('mouseleave', (event) => {
          const mouseDirection = helperFunctions.getMouseEnterDirection(event, button)
          const pathDirection = helperFunctions.handleCardHoverOut(mouseDirection, true)
          helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)
        })
      })
    })

    $(allAlternateItems).each((index, item) => {
      const bgFillPath = $(item).find('[data-animate=card-fill-path]')
      const innerContent = $(item).find('[data-animate=form-alternate-item-inner]')
      const arrowIcon = $(item).find('[data-animate=arrow]')

      const itemTl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power3.inOut' } })

      itemTl.to(innerContent, { padding: '0 0.5rem' }).to(arrowIcon, { rotate: -45 }, '<')

      $(item).on('mouseenter', (event) => {
        const mouseDirection = helperFunctions.getMouseEnterDirection(event, item)
        const pathDirection = helperFunctions.handleCardHoverIn(mouseDirection, true)
        helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)
        itemTl.play()
      })
      $(item).on('mouseleave', (event) => {
        const mouseDirection = helperFunctions.getMouseEnterDirection(event, item)
        const pathDirection = helperFunctions.handleCardHoverOut(mouseDirection, true)
        helperFunctions.animateCardHover(bgFillPath, pathDirection.start, pathDirection.end)
        itemTl.reverse()
      })
    })
  })

  initValidation()
}

function initValidation() {
  const validation = new JustValidate('#contact-form')

  const inputs = $('[data-form=input]')
  const selectGroups = $('[data-form=required-select-group]')
  const radioGroups = $('[data-form=required-radio-group]')
  const missingFields = $('[data-form=missing-fields]')
  const submitButtonWrap = $('[data-form=submit-wrap]')
  const submitButton = $('[data-form=submit-button]')
  const loadingIndicator = $('[data-animate=submit-loading-wrap]')

  // initial states
  loadingIndicator.hide()

  inputs.each((index, input) => {
    const inputType = $(input).attr('type')
    if (inputType === 'email') {
      validation.addField(input, [
        { rule: 'required', errorMessage: 'This field is required' },
        { rule: 'email', errorMessage: 'Invalid email' },
      ])
    } else {
      validation.addField(input, [
        { rule: 'required', errorMessage: 'This field is required' },
        { rule: 'minLength', value: 3, errorMessage: 'This field must have at least 3 characters' },
      ])
    }
  })

  validation.addField('[data-form=textarea-input]', [
    { rule: 'required', errorMessage: 'This field is required' },
    { rule: 'minLength', value: 25, errorMessage: 'This field must have at least 25 characters' },
  ])

  selectGroups.each((index, group) => {
    validation.addRequiredGroup(group, 'Select at least one or more options!')
  })
  radioGroups.each((index, group) => {
    validation.addRequiredGroup(group, 'Select one option!')
  })

  // Event listener for validation
  validation.onValidate(async function (e) {
    // Calculate total fields
    const totalFields = Object.keys(e.fields).length + Object.keys(e.groups).length
    let validFields = 0

    // Loop over the 'fields' object using jQuery's $.each
    $.each(e.fields, function (key, value) {
      if (value.isValid) {
        validFields++
      }
    })

    // Loop over the 'groups' object using jQuery's $.each
    $.each(e.groups, function (key, value) {
      if (value.isValid) {
        validFields++
      }
    })

    missingFields.text(`${validFields}/${totalFields}`)

    // Check if all fields are valid
    if (validFields === totalFields) {
      submitButtonWrap.addClass('is-active')
      submitButton.prop('disabled', false)
    } else {
      submitButtonWrap.removeClass('is-active')
      submitButton.prop('disabled', true)
    }
  })

  validation.onSuccess(async function (e) {
    e.preventDefault()

    // Show loading indicator before making the AJAX request
    loadingIndicator.show()

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const companyName = formData.get('company-name')
    const email = formData.get('email')
    const text = formData.get('textarea')
    const contactOrigin = formData.getAll('contact-origin')
    const services = formData.getAll('services')
    const start = formData.get('start')
    const deadline = formData.get('deadline')

    const data = {
      name,
      companyName,
      email,
      text,
      contactOrigin,
      services,
      start,
      deadline,
    }

    try {
      await axios.post('https://us-central1-helical-root-426623-m4.cloudfunctions.net/receiveEmail', data)

      // Hide loading indicator on successful submission
      animateSubmitFeedback(true)
      console.log('Submission worked')
      loadingIndicator.hide() // Hide the loading indicator

      validation.lockForm(true) // Lock the form after successful submission
    } catch (error) {
      // Handle error if submission fails
      console.error('Submission failed:', error)
      animateSubmitFeedback(false)
      loadingIndicator.hide() // Hide the loading indicator
    }
  })

  validation.onFail(async function (e) {
    console.log('Validation failed')
    loadingIndicator.hide() // Hide the loading indicator
  })
}

export function animateContactForm() {
  const contactFormTl = gsap.timeline({ defaults: { duration: 2, ease: 'expo.out' } })
  const contactForm = $('#contact-form')

  const headlines = contactForm.find('[data-form=headline]')
  new SplitType(headlines, { types: 'chars' })

  const inputs = contactForm.find('[data-focus=input]')
  const inputTexts = contactForm.find('[data-form=input-text]')

  const selectWraps = contactForm.find('[data-form=select-wrap]')
  const radioWraps = contactForm.find('[data-form=radio-wrap]')
  const submitOuter = contactForm.find('[data-form=submit-outer]')

  const dividerHorizontal = contactForm.find('[data-animate=divider][data-direction=horizontal]')
  const dividerVertical = contactForm.find('[data-animate=divider][data-direction=vertical]')

  const alternateItemContent = contactForm.find('[data-animate=alternate-item-content]')

  headlines.each((index, headline) => {
    contactFormTl.fromTo(
      $(headline).find('.char'),
      { yPercent: 100 },
      { yPercent: 0, duration: 1.5, stagger: 0.015 },
      '<+0.05'
    )
  })

  contactForm.show()

  contactFormTl
    .fromTo(inputTexts, { clipPath: topClipPath, yPercent: 50 }, { yPercent: 0, clipPath: fullClipPath, stagger: 0.1 }, '<')
    .fromTo(inputs, { clipPath: rightClipPath }, { clipPath: fullClipPath, stagger: 0.1 }, '<')
    .fromTo(
      [selectWraps, radioWraps, submitOuter],
      { clipPath: topClipPath, yPercent: 50 },
      { yPercent: 0, clipPath: fullClipPath, duration: 1, ease: 'power2.out', stagger: 0.05 },
      '<'
    )
    .fromTo(dividerHorizontal, { width: 0 }, { width: '100%' }, '<')
    .fromTo(dividerVertical, { height: 0 }, { height: '100%' }, '<')
    .from(alternateItemContent, { yPercent: 100, stagger: 0.1 }, '<')
}

function animateSubmitFeedback(isSuccess) {
  const feedbackWrap = $('[data-animate=form-feedback-wrap]')
  const feedbackInner = feedbackWrap.find('[data-animate=form-feedback-inner]')
  const feedbackBlur = $('[data-animate=form-feedback-blur]')
  const feedbackLogo = feedbackWrap.find('[data-animate=feedback-logo]')
  const feedbackLogoPathLeft = feedbackLogo.find('[data-animate=feedback-logo-path-left]')
  const feedbackLogoPathRight = feedbackLogo.find('[data-animate=feedback-logo-path-right]')
  const successMessage = feedbackWrap.find('[data-animate=form-success-message]')
  const errorMessage = feedbackWrap.find('[data-animate=form-error-message]')

  const feedbackTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } })

  if (isSuccess === true) {
    feedbackTl.set(errorMessage, { display: 'none' })
  } else {
    feedbackTl.set(successMessage, { display: 'none' })
  }

  feedbackTl.set([successMessage, errorMessage], { yPercent: 100 })

  feedbackTl
    .set(feedbackWrap, { display: 'flex' })
    .set(feedbackBlur, { display: 'block' })
    .from(feedbackWrap, { opacity: 0, duration: 1 })
    .from(feedbackBlur, { opacity: 0, duration: 1 }, '<')
  if (isSuccess === true) {
    feedbackTl.to(feedbackLogoPathLeft, { x: 0 }, '<25%').to(feedbackLogoPathRight, { x: 0 }, '<')
  } else {
    feedbackTl.to(feedbackLogoPathLeft, { x: '-1rem' }, '<+25%').to(feedbackLogoPathRight, { x: '1rem' }, '<')
  }
  feedbackTl.to([successMessage, errorMessage], { yPercent: 0, stagger: 0.2 }, '<')

  if (isSuccess === true) {
    feedbackTl
      .to(feedbackInner, { scale: 0.95, duration: 0.5 }, '+=2')
      .to(feedbackWrap, { opacity: 0, duration: 0.5 }, '<')
      .to(feedbackBlur, { opacity: 0, duration: 0.5 }, '<')
      .set(feedbackBlur, { display: 'none' }, '>')
      .to(feedbackWrap, { display: 'none' }, '<')
  }

  return feedbackTl
}

export function killContactForm() {
  if (ctx) {
    ctx.reverse()
  }
  if (validation) {
    validation.destroy()
  }
}

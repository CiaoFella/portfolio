let $ = window.$

export default function syncAwardsList() {
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal
    if (typeof attrVal !== 'string' || attrVal.trim() === '') return defaultVal
    if (attrVal === 'true' && defaultValType === 'boolean') return true
    if (attrVal === 'false' && defaultValType === 'boolean') return false
    if (isNaN(attrVal) && defaultValType === 'string') return attrVal
    if (!isNaN(attrVal) && defaultValType === 'number') return +attrVal
    return defaultVal
  }
  // cms list sync component
  $("[tr-listsync-element='component']").each(function (index) {
    let componentEl = $(this),
      cmsListEl = componentEl.find("[tr-listsync-element='list']"),
      cmsItemEl = cmsListEl.children()
    let onLoadSetting = attr(false, componentEl.attr('tr-listsync-onload')),
      activeIndexSetting = attr(0, componentEl.attr('tr-listsync-activeindex')),
      activeClassSetting = attr(
        'is-active',
        componentEl.attr('tr-listsync-activeclass')
      )
    function addActive(trigger) {
      cmsItemEl.removeClass(activeClassSetting)
      let itemIndex = trigger.index()
      cmsListEl.each(function () {
        $(this).children().eq(itemIndex).addClass(activeClassSetting)
      })
    }
    if (onLoadSetting) addActive(cmsItemEl.eq(activeIndexSetting))
    cmsListEl.each(function () {
      let childrenItemEl = $(this).children(),
        hoverInSetting = attr(false, $(this).attr('tr-listsync-hoverin')),
        hoverOutSetting = attr(false, $(this).attr('tr-listsync-hoverout'))
      if (hoverInSetting) {
        childrenItemEl.on('mouseenter', function () {
          addActive($(this))
        })
      }
      if (hoverOutSetting) {
        childrenItemEl.on('mouseleave', function () {
          cmsItemEl.removeClass(activeClassSetting)
        })
      }
    })
  })
}

const getCurrentWindowTabs = () => {
  return browser.tabs.query({ currentWindow: true })
}

const checkMultipleTabs = () => {
  getCurrentWindowTabs().then((tabsArr) => {
    tabsArr.forEach((tab) => {
      if (tab.id !== 1) browser.tabs.remove(tab.id)
    })
  })
}

const handleUse = () => {
  if (browser.tabs.onCreated.hasListener(checkMultipleTabs)) {
    browser.tabs.onCreated.removeListener(checkMultipleTabs)
    browser.browserAction.setIcon({path: "icons/unblock_icon.png"})
  } else {
    browser.tabs.onCreated.addListener(checkMultipleTabs)
    browser.browserAction.setIcon({path: "icons/block_icon.png"})
  }
}
browser.tabs.onCreated.addListener(checkMultipleTabs)

browser.browserAction.onClicked.addListener(handleUse)

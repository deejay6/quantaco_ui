/**
 * @description Function to replace empty string in object with null value
 * @param {{}} function and delay time.
 * @returns {{}} function
 */
export const debounce = (funct, time) => {
  let timer
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      funct.apply(context, args)
    }, time)
  }
}

/**
 * @description Function to find default route recrusively
 * @returns {[]} array
 */
const recursiveSearch = (sideMenu, searchKey = "is_default", results = []) => {
  const routes = results
  Object.keys(sideMenu).forEach((key) => {
    const value = sideMenu[key]
    if (key === searchKey && value) {
      routes.push(sideMenu.key)
    } else if (typeof value === "object") {
      recursiveSearch(value, searchKey, routes)
    }
  })
  return routes
}


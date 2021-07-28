// import {
//   mdiCity,
//   mdiPhone,
//   mdiHeadphones,
//   mdiMailbox,
//   mdiTimelapse
// } from '@mdi/js'
import { isUndefined } from 'lodash'
export const contacts = () => {
  try {
    const contacts = window.app.footer_contact
    if (isUndefined(contacts)) {
      return false
    }

    if (!Array.isArray(contacts)) {
      // eslint-disable-next-line no-throw-literal
      throw 'window.app.footer_contact must array'
    }
    const isText = contacts.every(item => !isUndefined(item.text))

    if (!isText) {
      // eslint-disable-next-line no-throw-literal
      throw 'contact item text property missing'
    }
    const isIcon = contacts.every(item => !isUndefined(item.icon))
    if (!isIcon) {
      // eslint-disable-next-line no-throw-literal
      throw 'contact item icon property missing'
    }
    const isTag = contacts.every(item => !isUndefined(item.tag))
    if (!isTag) {
      // eslint-disable-next-line no-throw-literal
      throw 'contact item tag property missing'
    }
    return contacts
  } catch (error) {
    console.error(error)
    return false
  }
}
export const links = () => {
  const links = window.app.footer_links
  console.log({ links })
  if (isUndefined(contacts)) {
    return false
  }
  return links
}

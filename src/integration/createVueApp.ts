export { createVueApp }
export type { ChangePage }

import {
 type App,
 createApp,
 createSSRApp,
 h,
 nextTick,
 shallowRef,
 shallowReactive,
 type Component,
 Fragment, Ref,
} from 'vue'
import type { PageContext } from 'vike/types'
import { setPageContext } from '../hooks/usePageContext'
import { objectAssign } from '../utils/objectAssign'
import { callCumulativeHooks } from '../utils/callCumulativeHooks'
import { isPlainObject } from '../utils/isPlainObject'
import { setData } from '../hooks/useData'
import type { PageContextInternal } from '../types/PageContext'

type ChangePage = (pageContext: PageContext) => Promise<void>
async function createVueApp(
  pageContext: PageContext & PageContextInternal,
  ssr: boolean,
  entryComponentName: 'Head' | 'Page',
) {
  let onChangePage: undefined | ((pageContext: PageContext) => void)
  let RootComponent: Component | (() => ReturnType<typeof h>)
  // Wrap <Page> with <Layout>
  if (entryComponentName === 'Page') {
    const entryComponentRef = shallowRef(pageContext.config[entryComponentName])
    const layoutRef = shallowRef(pageContext.config.Layout || [])
    onChangePage = (pageContext: PageContext) => {
    entryComponentRef.value = pageContext.config[entryComponentName]
    layoutRef.value = pageContext.config.Layout || []
    }

    const EntryComponent = () => h(entryComponentRef.value)

     RootComponent = () => {
      let componentWithLayout = EntryComponent

      const layouts = layoutRef.value

      if (!layouts) return componentWithLayout()

       if (Array.isArray(layouts)) {

       layouts.forEach((layout) => {
       const Comp = componentWithLayout
       componentWithLayout = () => h(layout, null, Comp)
       }
       )
       } else {


       const Comp = componentWithLayout

       componentWithLayout = () => h(layouts, null, Comp)

       }

      return componentWithLayout()
     }




  } else {

    RootComponent = () => {
      const HeadElements = [
     // Added by +Head
     ...(pageContext.config.Head ?? []),
     // Added by useConfig()
     ...(pageContext._configFromHook?.Head ?? []),
      ].map((HeadComponent) => h(HeadComponent))
      return h(Fragment, null, HeadElements)
    }
    }


  const app: App = ssr ? createSSRApp(RootComponent) : createApp(RootComponent)
  objectAssign(pageContext, { app })
  const { onCreateApp } = pageContext.config
  await callCumulativeHooks(onCreateApp, pageContext)

  const data = pageContext.data ?? {}
  assertDataIsObject(data)
  // TODO/breaking-change: use shallowRef() instead of shallowReactive()
  // - Remove workaround https://github.com/vikejs/vike-vue/blob/89ca09ed18ffa1c0401851a506f505813a7dece7/packages/vike-vue/src/integration/onRenderClient.ts#L18-L21
  const dataReactive = shallowReactive(data)
  const pageContextReactive = shallowReactive(pageContext)
  setPageContext(app, pageContextReactive)
  setData(app, dataReactive)

  // changePage() is called upon navigation, see +onRenderClient.ts
  const changePage: ChangePage = async (pageContext: PageContext) => {
    let returned = false
    let err: unknown
    app.config.errorHandler = (err_) => {
    if (returned) {
    console.error(err_)
    } else {
    err = err_
    }
    }
    const data = pageContext.data ?? {}
    assertDataIsObject(data)
    objectReplace(dataReactive, data)
    objectReplace(pageContextReactive, pageContext)
    onChangePage?.(pageContext)
    await nextTick()
    returned = true
    if (err) throw err
  }

  return { app, changePage }
 }


function assertDataIsObject(data: unknown): asserts data is Record<string, unknown> {
  if (!isPlainObject(data)) throw new Error('data() should return a plain object, undefined, or null')
}

export function objectReplace(obj: object, objAddendum: object) {
  // @ts-ignore
  Object.keys(obj).forEach((key) => delete obj[key])
  Object.assign(obj, objAddendum)
}

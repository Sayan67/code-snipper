import { Jsx, toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { ElementType, Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'

export async function highlight({code="//this is a code snippet",topic="java"}:{code: string,topic:string}) {
  const out = await codeToHast(code, {
    lang: topic,
    theme: 'github-dark'
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx :jsx as Jsx,
    jsxs :jsxs as any
  })
}
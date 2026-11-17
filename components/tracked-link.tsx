"use client"

import { trackEvent, trackOutboundClick } from "@/lib/analytics"

type TrackedLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "onClick"
> & {
  href: string
  eventName?: string
  eventParams?: Record<string, string | number | boolean>
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function TrackedLink({
  href,
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  const isExternal = href.startsWith("http")
  return (
    <a
      href={href}
      onClick={(e) => {
        if (eventName) {
          trackEvent(eventName, eventParams ?? {})
        } else if (isExternal) {
          trackOutboundClick(href, typeof eventParams?.link_label === "string" ? eventParams.link_label : undefined)
        }
        onClick?.(e)
      }}
      {...props}
    />
  )
}

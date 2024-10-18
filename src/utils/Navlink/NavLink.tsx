'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const NavLink =  ({
  href,
  exact = false,
  children,
  className,
  handleLinkClick,
  ...props
}: any) => {
  const pathname = usePathname()

  // Special handling for home link "/"
  const isHome = href === "/"
  const isActive = exact ? pathname === href : isHome ? pathname === "/" : pathname?.startsWith(href)
  const newClassName = isActive ? `${className} active ` : className

  return (
    <Link href={href} className={newClassName} onClick={handleLinkClick} {...props}>
      {children}
    </Link>
  )
}

import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

const footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "Demo", "Docs"] },
    { title: "Company", links: ["About Us", "Careers", "Contact", "Blog"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
]


export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground">AI-powered logistics for the modern enterprise.</p>
            <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" aria-label="Email for newsletter"/>
                <Button type="submit" aria-label="Subscribe to newsletter">Subscribe</Button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            {footerLinks.map((section) => (
                <div key={section.title} className="flex flex-col gap-4">
                    <h3 className="font-semibold">{section.title}</h3>
                    <ul className="space-y-2">
                        {section.links.map((link) => (
                            <li key={link}>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">{link}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t pt-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AlgoMile, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                    <Link key={label} href={href} aria-label={label} className="text-muted-foreground hover:text-foreground">
                        <Icon className="h-5 w-5" />
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const terminalLines = [
  { text: "$ cat enterprise-experience.txt", delay: 0 },
  { text: "> 100+ enterprise clients supported across Accenture, Samsung SDS, and Sauce Labs", delay: 800, isOutput: true },
  { text: "> GDPR compliance lead for initiatives spanning multiple European markets", delay: 1600, isOutput: true },
  { text: "> Tag management expert across Google, Adobe, and Tealium platforms (client-side and server-side)", delay: 2400, isOutput: true },
  { text: "> JavaScript debugging specialist for production issues other developers can't replicate", delay: 3200, isOutput: true },
]

export function HeroSection() {
  const [displayedLines, setDisplayedLines] = useState<typeof terminalLines>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setIsTyping(false)
      return
    }

    const currentLine = terminalLines[currentLineIndex]
    const timeout = setTimeout(
      () => {
        if (currentText.length < currentLine.text.length) {
          setCurrentText(currentLine.text.slice(0, currentText.length + 1))
        } else {
          setDisplayedLines([...displayedLines, currentLine])
          setCurrentText("")
          setCurrentLineIndex(currentLineIndex + 1)
        }
      },
      currentLine.isOutput ? 30 : 50,
    )

    return () => clearTimeout(timeout)
  }, [currentLineIndex, currentText, displayedLines])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for enterprise consulting engagements
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Mohamed Sonbol</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              <span className="text-primary font-medium">Technical Consultant</span> specializing in{" "}
              <span className="text-primary font-medium">Analytics Implementation, Tag Management, and Enterprise Data Infrastructure</span>
            </p>

            <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
              I help enterprise clients collect accurate data, maintain GDPR compliance, and solve complex production
              issues that standard development teams {"can't"} resolve.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6" asChild>
                <a href="#engagements">View Engagements</a>
              </Button>
              <Button variant="outline" className="border-border hover:bg-secondary bg-transparent" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/mohamedsonbol"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamedsonbol"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="mailto:mohamed@exceptionalgrp.com"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </a>
            </div>
          </div>

          {/* Right side - Terminal */}
          <div className="animate-float">
            <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden animate-glow">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">~/enterprise-consulting</span>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm space-y-2 min-h-[280px]">
                {displayedLines.map((line, index) => (
                  <div key={index} className={line.isOutput ? "text-accent pl-4" : "text-muted-foreground"}>
                    {line.text}
                  </div>
                ))}
                {currentLineIndex < terminalLines.length && (
                  <div
                    className={terminalLines[currentLineIndex]?.isOutput ? "text-accent pl-4" : "text-muted-foreground"}
                  >
                    {currentText}
                    <span className="animate-terminal-blink text-primary">▌</span>
                  </div>
                )}
                {!isTyping && (
                  <div className="text-muted-foreground">
                    $ <span className="animate-terminal-blink text-primary">▌</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}

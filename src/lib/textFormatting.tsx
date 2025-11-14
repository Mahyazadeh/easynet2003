import React from 'react'

/**
 * Parses text with markdown-style formatting:
 * - **text** for bold
 * - \n or \\n for line breaks
 *
 * @param text - The text to parse with formatting
 * @returns An array of React nodes with proper formatting
 *
 * @example
 * parseFormattedText("Hello **world**\nNew line")
 * // Returns: ["Hello ", <strong>world</strong>, <br />, "New line"]
 */
export function parseFormattedText(text: string): React.ReactNode[] {
  if (!text) return []

  const hasFormatting = text.includes('\n') || text.includes('\\n') || text.includes('**')
  if (!hasFormatting) {
    return [text]
  }

  const nodes: React.ReactNode[] = []
  let buffer = ''
  let bold = false
  let keyCounter = 0

  const flushBuffer = () => {
    if (!buffer) return
    if (bold) {
      nodes.push(<strong key={`strong-${keyCounter++}`}>{buffer}</strong>)
    } else {
      nodes.push(buffer)
    }
    buffer = ''
  }

  const pushBreak = () => {
    nodes.push(<br key={`br-${keyCounter++}`} />)
  }

  for (let i = 0; i < text.length; ) {
    const char = text[i]
    const nextChar = text[i + 1]

    // Handle escaped newline sequences (\\n)
    if (char === '\\' && nextChar === 'n') {
      flushBuffer()
      pushBreak()
      i += 2
      continue
    }

    // Handle actual newline characters
    if (char === '\n') {
      flushBuffer()
      pushBreak()
      i += 1
      continue
    }

    // Handle bold markers (**)
    if (char === '*' && nextChar === '*') {
      flushBuffer()
      bold = !bold
      i += 2
      continue
    }

    buffer += char
    i += 1
  }

  flushBuffer()

  return nodes
}

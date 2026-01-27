import React from 'react'

/**
 * Parses text with markdown-style formatting:
 * - **text** for bold
 * - \n or \\n for line breaks
 * - [text](url) for links
 * @param text - The text to parse with formatting
 * @returns An array of React nodes with proper formatting
 *
 * @example
 * parseFormattedText("Hello **world**\nNew line")
 * // Returns: ["Hello ", <strong>world</strong>, <br />, "New line"]
 */
export function parseFormattedText(text: string): React.ReactNode[] {
  if (!text) return []

  const hasFormatting = text.includes('\n') || text.includes('\\n') || text.includes('**') || text.includes('') || text.includes('[')
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

     if (char === '[') {
      // Try to find closing ] and (
      const closeBracketIndex = text.indexOf(']', i)
      const openParenIndex = text.indexOf('(', closeBracketIndex)
      const closeParenIndex = text.indexOf(')', openParenIndex)

      if (closeBracketIndex > -1 && openParenIndex === closeBracketIndex + 1 && closeParenIndex > -1) {
        flushBuffer()
        const linkText = text.slice(i + 1, closeBracketIndex)
        const linkUrl = text.slice(openParenIndex + 1, closeParenIndex)
        nodes.push(
          <a key={`link-${keyCounter++}`} href={linkUrl} rel="noopener noreferrer">
            {linkText}
          </a>
        )
        i = closeParenIndex + 1
        continue
      }
    }

    // GESTIONE LINK CON SUPPORTO BOLD INTERNO
    if (char === '[') {
      const closeBracketIndex = text.indexOf(']', i)
      const openParenIndex = text.indexOf('(', closeBracketIndex)
      const closeParenIndex = text.indexOf(')', openParenIndex)

      if (closeBracketIndex > -1 && openParenIndex === closeBracketIndex + 1 && closeParenIndex > -1) {
        flushBuffer()
        
        const linkRawText = text.slice(i + 1, closeBracketIndex)
        const linkUrl = text.slice(openParenIndex + 1, closeParenIndex)
        
        nodes.push(
          <a key={`link-${keyCounter++}`} href={linkUrl} rel="noopener noreferrer">
            {parseFormattedText(linkRawText)}
          </a>
        )
        
        i = closeParenIndex + 1
        continue
      }
    }

    buffer += char
    i += 1
  }
  

  flushBuffer()

  return nodes
}

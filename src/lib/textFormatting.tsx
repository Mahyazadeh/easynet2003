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

  // Convert literal \n strings to actual newline characters
  // This handles cases where \n is stored as a string in the CMS
  const normalizedText = text.replace(/\\n/g, '\n')

  // First, split by bold markers
  const parts = normalizedText.split(/(\*\*.*?\*\*)/)

  return parts.flatMap((part, partIndex) => {
    // Handle bold text
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2)

      // Check if bold text contains line breaks
      if (boldText.includes('\n')) {
        const lines = boldText.split('\n')
        return lines.flatMap((line, lineIndex) => {
          const nodes: React.ReactNode[] = []
          if (line) {
            nodes.push(<strong key={`${partIndex}-bold-${lineIndex}`}>{line}</strong>)
          }
          if (lineIndex < lines.length - 1) {
            nodes.push(<br key={`${partIndex}-br-${lineIndex}`} />)
          }
          return nodes
        })
      }

      return <strong key={`${partIndex}-bold`}>{boldText}</strong>
    }

    // Handle regular text with potential line breaks
    if (part.includes('\n')) {
      const lines = part.split('\n')
      return lines.flatMap((line, lineIndex) => {
        const nodes: React.ReactNode[] = []
        if (line) {
          nodes.push(line)
        }
        if (lineIndex < lines.length - 1) {
          nodes.push(<br key={`${partIndex}-br-${lineIndex}`} />)
        }
        return nodes
      })
    }

    return part
  })
}

import { Fragment } from 'react'

interface Node {
  type: string
  children?: Node[]
  text?: string
  format?: number
  version?: number
  style?: string
  url?: string
  tag?: number
  listType?: 'bullet' | 'number'
  src?: string
  altText?: string
  width?: number
  height?: number
  newTab?: boolean
  [key: string]: any
}

function renderNode(node: Node): React.ReactNode {
  switch (node.type) {
    case 'text': {
      let content: React.ReactNode = node.text || ''
      if (node.format) {
        if (node.format & 1) content = <strong>{content}</strong>
        if (node.format & 2) content = <em>{content}</em>
        if (node.format & 4) content = <u>{content}</u>
        if (node.format & 8) content = <del>{content}</del>
        if (node.format & 16) content = <code>{content}</code>
        if (node.format & 32) content = <sub>{content}</sub>
        if (node.format & 64) content = <sup>{content}</sup>
      }
      return content
    }

    case 'paragraph':
      return (
        <p>{node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}</p>
      )

    case 'heading': {
      const level = node.tag || 1
      switch (level) {
        case 1:
          return (
            <h1>
              {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
            </h1>
          )
        case 2:
          return (
            <h2>
              {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
            </h2>
          )
        case 3:
          return (
            <h3>
              {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
            </h3>
          )
        case 4:
          return (
            <h4>
              {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
            </h4>
          )
        case 5:
          return (
            <h5>
              {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
            </h5>
          )
        case 6:
          return (
            <h6>
              {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
            </h6>
          )
        default:
          return (
            <h1>
              {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
            </h1>
          )
      }
    }

    case 'list': {
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag>
          {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
        </ListTag>
      )
    }

    case 'listitem':
      return (
        <li>
          {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
        </li>
      )

    case 'quote':
      return (
        <blockquote>
          {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
        </blockquote>
      )

    case 'link':
      return (
        <a href={node.url} target={node.newTab ? '_blank' : undefined} rel="noopener noreferrer">
          {node.children?.map((child, i) => <Fragment key={i}>{renderNode(child)}</Fragment>)}
        </a>
      )

    case 'image':
      return (
        <img
          src={node.src}
          alt={node.altText || ''}
          width={node.width}
          height={node.height}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )

    default:
      return null
  }
}

interface RichTextProps {
  content: any
}

export default function RichText({ content }: RichTextProps) {
  if (!content) return null

  try {
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content
    return (
      <div className="rich-text">
        {parsedContent.root.children?.map((node: Node, i: number) => (
          <Fragment key={i}>{renderNode(node)}</Fragment>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error rendering rich text content:', error)
    return <div className="text-red-600">Error rendering content</div>
  }
}

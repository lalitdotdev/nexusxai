type ContentBlock = {
  type: 'text'
  text: string
}

export type AnthropicMessage = {
  id: string
  type: 'message'
  role: 'assistant'
  model: string
  content: ContentBlock[]
  stop_reason: string
  stop_sequence: null
  usage: {
    input_tokens: number
    output_tokens: number
  }
}


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()

    if (!message) {
      throw new Error('Message is required')
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
    
    if (!ANTHROPIC_API_KEY) {
      console.error("Missing Anthropic API key")
      throw new Error('Anthropic API key is not configured')
    }
    
    console.log("Using Anthropic API key (first 10 chars):", ANTHROPIC_API_KEY.substring(0, 10))
    console.log("Processing message:", message.substring(0, 100))
    
    // Send to Anthropic Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are Lydia, a caring healthcare assistant with these characteristics:
            - Kind, nurturing, and empathetic in your tone
            - Focused on providing healthcare guidance and support
            - Expert at understanding symptoms and suggesting appropriate care
            - Helpful with scheduling doctor appointments
            - Always respectful of medical boundaries (not providing diagnosis)
            
            The user will describe their health concerns or needs. Respond with care and empathy while providing helpful guidance.
            
            User message: ${message}`
          }
        ]
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Anthropic API error:", errorText)
      throw new Error(`Anthropic API error: ${errorText}`)
    }

    const data = await response.json()
    const generatedText = data.content[0].text

    return new Response(
      JSON.stringify({ response: generatedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error("Chat error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})

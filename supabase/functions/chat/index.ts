
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

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || 'AIzaSyCqZU3HoSd5yaCu2GbiJjt28mUR7VaISAg'
    
    // Send to Gemini API using the correct endpoint for Gemini 2.0
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-latest:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are Lydia, a caring healthcare assistant with these characteristics:
                - Kind, nurturing, and empathetic in your tone
                - Focused on providing healthcare guidance and support
                - Expert at understanding symptoms and suggesting appropriate care
                - Helpful with scheduling doctor appointments
                - Always respectful of medical boundaries (not providing diagnosis)
                
                The user will describe their health concerns or needs. Respond with care and empathy while providing helpful guidance.
                
                User message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      throw new Error(`Gemini API error: ${errorText}`)
    }

    const data = await response.json()
    const generatedText = data.candidates[0].content.parts[0].text

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

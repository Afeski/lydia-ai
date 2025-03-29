
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
    const { message, voice_id } = await req.json()
    
    if (!message) {
      throw new Error('Message is required')
    }
    
    // Forward request to the eleven-labs-voice function
    const elevenLabsResponse = await fetch(
      `${req.url.replace('/text-to-speech', '/eleven-labs-voice')}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, voice_id }),
      }
    )
    
    const data = await elevenLabsResponse.json()
    
    return new Response(
      JSON.stringify(data),
      {
        status: elevenLabsResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error("Text-to-speech error:", error.message)
    return new Response(
      JSON.stringify({ error: "Text-to-speech service is unavailable", details: error.message }),
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})

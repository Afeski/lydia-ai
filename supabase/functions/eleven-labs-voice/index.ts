
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

    // Use the API key directly for testing (will be replaced by env variable in production)
    const ELEVEN_LABS_API_KEY = Deno.env.get('ELEVEN_LABS_API_KEY') || "sk_9689a8ee9401aa35d530f4a47ca9db5d50fcba021aef29bb"
    const VOICE_ID = voice_id || "kVWRcvZrI3hlHgA90ED7" // Default to Lydia's voice ID

    if (!ELEVEN_LABS_API_KEY) {
      throw new Error('ElevenLabs API key is not configured')
    }

    console.log("Using voice ID:", VOICE_ID, "for message:", message.substring(0, 50) + "...")
    console.log("API Key used (first 5 chars):", ELEVEN_LABS_API_KEY.substring(0, 5))

    // Call ElevenLabs Speech API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_LABS_API_KEY,
      },
      body: JSON.stringify({
        text: message,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("ElevenLabs API error:", errorText)
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
    }

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    return new Response(
      JSON.stringify({ audio: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error("Voice generation error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})

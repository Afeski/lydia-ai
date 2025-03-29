
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

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

    const ELEVEN_LABS_API_KEY = Deno.env.get('ELEVEN_LABS_API_KEY')
    if (!ELEVEN_LABS_API_KEY) {
      throw new Error('Missing Eleven Labs API key')
    }

    // Use a default voice ID from the standard Eleven Labs voices
    // Use Bella as default (female voice)
    const voiceId = voice_id || 'EXAVITQu4vr4xnSDxMaL'

    console.log(`Converting text to speech with Eleven Labs, voice ID: ${voiceId}`)
    console.log(`Text sample: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`)

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_LABS_API_KEY
      },
      body: JSON.stringify({
        text: message,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Eleven Labs API error:', errorData)
      throw new Error(`Eleven Labs API error: ${response.status}`)
    }

    const audioArrayBuffer = await response.arrayBuffer()
    const audioBase64 = btoa(
      String.fromCharCode.apply(null, new Uint8Array(audioArrayBuffer) as unknown as number[])
    )

    console.log("Received Eleven Labs audio successfully")

    return new Response(
      JSON.stringify({ 
        audio: audioBase64,
        status: "success" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error("Voice service error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})

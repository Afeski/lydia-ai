
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
    const { symptoms } = await req.json()

    if (!symptoms) {
      throw new Error('Symptoms are required')
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
    if (!ANTHROPIC_API_KEY) {
      console.error("Missing Anthropic API key")
      throw new Error('Anthropic API key is not configured')
    }

    console.log("Using Anthropic API key (first 10 chars):", ANTHROPIC_API_KEY.substring(0, 10))
    console.log("Processing symptoms:", symptoms.substring(0, 100))

    // Send to Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are Lydia, a caring healthcare assistant. 
            A user has described these symptoms: ${symptoms}
            
            Provide a thoughtful, empathetic response that:
            1. Acknowledges their symptoms with care
            2. Offers general information about potential causes (without diagnosing)
            3. Suggests appropriate next steps (self-care or when to see a doctor)
            4. Reminds them you're not a replacement for professional medical advice
            
            Keep your tone nurturing and supportive, but ensure medical information is accurate.`
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
    const analysis = data.content[0].text

    return new Response(
      JSON.stringify({ response: analysis }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error("Symptom check error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})

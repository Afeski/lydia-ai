
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
    const { symptoms } = await req.json()
    
    if (!symptoms) {
      throw new Error('Symptoms description is required')
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
    if (!ANTHROPIC_API_KEY) {
      throw new Error('Missing Anthropic API key')
    }

    const systemPrompt = `You are Lydia, an advanced AI health assistant. Your role is to provide helpful, informative responses about symptoms while being clear about your limitations. 

Important guidelines:
- Never diagnose specific conditions
- Always emphasize the importance of seeking professional medical advice
- Focus on general information about symptoms and potential categories of conditions
- Suggest general self-care measures when appropriate
- Clearly indicate when symptoms might warrant urgent medical attention
- Be compassionate and reassuring while remaining factual
- When answering, provide your response in a well-structured format with clear sections

You are not a replacement for professional medical care. Your purpose is to provide preliminary information to help users make informed decisions about seeking appropriate care.`

    const userPrompt = `Here are my symptoms: ${symptoms}

Please help me understand what might be causing these symptoms, whether they're potentially serious, and what I should do next.`

    console.log("Calling Claude API with symptoms:", symptoms)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Claude API error:', errorData)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.content && data.content[0]?.text || 'Unable to analyze symptoms at this time.'

    console.log("Received Claude response successfully")

    return new Response(
      JSON.stringify({ 
        response: aiResponse
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error("Symptom check error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})

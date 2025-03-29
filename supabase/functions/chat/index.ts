
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
    const { message, conversationHistory = [] } = await req.json()
    
    if (!message) {
      throw new Error('Message is required')
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
    if (!ANTHROPIC_API_KEY) {
      throw new Error('Missing Anthropic API key')
    }

    const systemPrompt = `You are Lydia, an AI health assistant that helps users with health-related questions. You are friendly, empathetic, and informative.

Important guidelines:
- Provide helpful health information while acknowledging your limitations
- Never diagnose specific conditions or prescribe treatments
- Emphasize the importance of consulting healthcare professionals for medical advice
- Offer general wellness information, preventive care tips, and lifestyle guidance
- Use a conversational, friendly tone while maintaining professionalism
- If asked about serious symptoms, recommend seeking medical attention
- Assist with finding healthcare resources when appropriate
- Answer non-health questions politely but briefly, steering conversation back to health topics
- Be aware of user emotions and respond with appropriate empathy

You're designed to be helpful but never replace professional medical advice.`

    // Convert conversation history to Claude format
    const claudeMessages = conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }))
    
    // Add the current message
    claudeMessages.push({
      role: 'user',
      content: message
    })
    
    console.log("Calling Claude API with message:", message)

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
        messages: claudeMessages
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Claude API error:', errorData)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.content && data.content[0]?.text || 'I apologize, but I am having trouble processing your request right now.'

    console.log("Received Claude response successfully")

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        status: "success" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error("Chat service error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})

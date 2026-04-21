// AI Virtual Try-On — uses Lovable AI Gateway (Nano Banana) to composite a
// garment image onto a model image, with optional appearance customization
// (skin tone, eye color, hair). Returns a base64 data URL.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TryOnBody {
  modelImage: string;   // absolute URL or data URL
  productImage: string; // absolute URL or data URL
  productName?: string;
  productCategory?: string;
  skinTone?: string;    // e.g. "fair", "wheatish", "dusky", "deep"
  eyeColor?: string;    // "brown" | "hazel" | "green" | "blue" | "black"
  hair?: string;        // "long straight black", "wavy brown bob", etc.
  background?: string;  // optional scene description
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const body = (await req.json()) as TryOnBody;
    if (!body?.modelImage || !body?.productImage) {
      return new Response(
        JSON.stringify({ error: "modelImage and productImage are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const appearance: string[] = [];
    if (body.skinTone) appearance.push(`${body.skinTone} skin tone`);
    if (body.eyeColor) appearance.push(`${body.eyeColor} eyes`);
    if (body.hair) appearance.push(`${body.hair} hair`);
    const appearanceLine = appearance.length
      ? `Adjust the model's appearance to: ${appearance.join(", ")}. Keep the face shape, identity and pose recognizable.`
      : "Keep the model's face, identity and pose unchanged.";

    const basePrompt = `GENERATE AN IMAGE (do not reply with text). Create a photorealistic virtual try-on photograph.

Image 1 = the PERSON (model). Image 2 = the GARMENT (${body.productName ?? "garment"}${body.productCategory ? `, ${body.productCategory}` : ""}).

Task: Output a single new image showing the PERSON from Image 1 wearing the GARMENT from Image 2.

Rules:
- Realistically fit the garment to the person's body, pose and proportions.
- Preserve the garment's exact color, pattern, fabric texture, neckline, sleeves and silhouette from Image 2.
- ${appearanceLine}
- Studio fashion lighting, soft shadows, ${body.background ?? "clean neutral seamless backdrop"}.
- Photorealistic, high-resolution, 3/4 or full-body framing.
- No text, no watermarks, no logos. Return ONLY the image.`;

    const callGateway = async (promptText: string) => {
      return await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            modalities: ["image", "text"],
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: promptText },
                  { type: "image_url", image_url: { url: body.modelImage } },
                  { type: "image_url", image_url: { url: body.productImage } },
                ],
              },
            ],
          }),
        },
      );
    };

    const extractImage = (data: any): string | undefined =>
      data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    let aiRes = await callGateway(basePrompt);

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("AI gateway error", aiRes.status, errText);
      if (aiRes.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiRes.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to your Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({ error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let data = await aiRes.json();
    let imageUrl = extractImage(data);

    // Retry once with a stricter, image-only instruction if the model replied with text only
    if (!imageUrl) {
      console.warn("First attempt returned no image, retrying with stricter prompt");
      const retryPrompt = `OUTPUT IMAGE ONLY. No text, no explanation, no caption.

${basePrompt}

If you cannot edit, generate a brand new photorealistic image that satisfies the rules above. You MUST return an image in the response.`;
      const retryRes = await callGateway(retryPrompt);
      if (retryRes.ok) {
        data = await retryRes.json();
        imageUrl = extractImage(data);
      } else {
        console.error("Retry failed", retryRes.status, await retryRes.text());
      }
    }

    if (!imageUrl) {
      console.error("No image in AI response", JSON.stringify(data).slice(0, 500));
      return new Response(
        JSON.stringify({ error: "AI did not return an image. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ image: imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-tryon error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
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

    const prompt = `You are a professional fashion photographer creating a virtual try-on image.

Take the PERSON in the FIRST image and dress them in the GARMENT shown in the SECOND image (${body.productName ?? "garment"}${body.productCategory ? `, category: ${body.productCategory}` : ""}).

Requirements:
- Realistically fit the garment on the person's body, matching their pose and proportions.
- Preserve the garment's exact color, pattern, fabric texture, neckline, sleeves and silhouette from the second image.
- ${appearanceLine}
- Studio fashion lighting, soft shadows, ${body.background ?? "clean neutral seamless backdrop"}.
- Photorealistic, high-resolution, full-body or 3/4 shot framing.
- No text, no watermarks, no logos overlaid.`;

    const aiRes = await fetch(
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
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: body.modelImage } },
                { type: "image_url", image_url: { url: body.productImage } },
              ],
            },
          ],
        }),
      },
    );

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

    const data = await aiRes.json();
    const imageUrl: string | undefined =
      data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

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
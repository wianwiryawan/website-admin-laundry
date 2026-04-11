import { NextRequest } from "next/server";
import { getApiBaseUrl } from "@/lib/utils";

export async function userLogin(request: NextRequest) {
  //   const response = await fetch('https://localhost/api/users', {
  //     // Optional: forward some headers, add auth tokens, etc.
  //     headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  //   });

  const response = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Include necessary login credentials here
      username: 'your_username',
      password: 'your_password',
    }),
  });
  
  // Transform or forward the response
  const data = await response.json();
  const transformed = { ...data, source: "proxied-through-nextjs" };
  
  return new Response(JSON.stringify(transformed), {
    headers: { "Content-Type": "application/json" },
  });
}

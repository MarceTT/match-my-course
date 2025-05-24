import { handlers } from "@/auth";
import { NextRequest } from 'next/server';

export async function GET(request: Request) {
  console.log("🧪 AUTH GET HEADERS:");
  request.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  return handlers.GET!(request as NextRequest);
}

export async function POST(request: Request) {
  console.log("🧪 AUTH POST HEADERS:");
  request.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  return handlers.POST!(request as NextRequest);
}
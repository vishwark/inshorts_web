import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
//   Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'en'
  try {
    const response = await axios.get(`https://inshorts.com/api/${lang}/search/trending_topics`);
    // Return the data as JSON
    return NextResponse.json(response.data);
  } catch (error) {
    // Handle errors if the request fails
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

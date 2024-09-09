import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get('topic') || 'Israel-Hamas_War';
  const page = searchParams.get('page') || '';
  const lang = searchParams.get('lang') || 'en'

  try {
    // Fetch data using the query parameters
    const response = await axios.get(`https://inshorts.com/api/${lang}/search/trending_topics/${topic}?page=${page}&type=CUSTOM_CATEGORY`);
    // Return the data as JSON
    return NextResponse.json(response.data);
  } catch (error) {
    // Handle errors if the request fails
    return NextResponse.json(
      { error: 'Failed to fetch data', msg : error },
      { status: 500 }
    );
  }
}


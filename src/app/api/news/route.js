import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'top_stories';
  const max_limit = searchParams.get('max_limit') || 10;
  const offset = searchParams.get('offset') || '';
  const lang = searchParams.get('lang') || '';

  try {
    // Fetch data using the query parameters
    const response = await axios.get(`https://inshorts.com/api/${lang}/news`, {
      params: {
        category,
        max_limit,
        include_card_data: true,
        offset,
      },
    });

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


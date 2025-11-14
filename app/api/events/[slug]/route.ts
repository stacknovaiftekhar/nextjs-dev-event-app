import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

// Define the type for route params
interface RouteParams {
  params: {
    slug: string;
  };
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to database
    // await connectDB();   // JSM


    // Await and extract slug from params
    // const { slug } = params;
    const { slug } = await params;   // JSM

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        // { success: false, error: 'Invalid or missing slug parameter' },
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query event by slug
    // const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean();
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { success: false, error: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      { success: true, message: 'Event Fetched Successfully', event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (use proper logging in production)
    // console.error('Error fetching event by slug:', error);

    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events by slug:', error);
    }

    // Handle specific error types
    if (error instanceof Error) {
      // Handle database connection errors
        if (error.message.includes('MONGODB_URI')) {
          return NextResponse.json(
            { message: 'Database configuration error' },
            { status: 500 }
          );
        }

        // Return generic error with error message
        return NextResponse.json(
          { message: 'Failed to fetch events', error: error.message },
          { status: 500 }
        );
      }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
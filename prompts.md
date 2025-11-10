◉ Prompt - Mongoose (DB Connect):

You are a backend developer working on a Next.js application with Mongoose and TypeScript.

Your task is to,
- Create a new file `lib/mongodb.ts` in the lib folder of a Next.js application.
- Set up a Mongoose database connection to MongoDB using TypeScript with proper types (avoid using any).
- Cache the connection to prevent multiple connections during development.
- Write clear and concise comments explaining key parts of the code.
- Make sure the code is clean, readable, and production-ready.

      >> Start a new conversation  ->  Select

      => I'll create a production-ready MongoDB connection file with Mongoose and TypeScript, including connection caching to prevent multiple connections during development.
      ◆ Example File:  [Accept]
        Created lib/mongodb.ts with:
 
        Key features:
        •  Proper TypeScript types - No any types used
        •  Connection caching - Prevents multiple connections during hot reloads in development
        •  Environment variable validation - Checks for MONGODB_URI at startup
        •  Error handling - Resets promise on failure to allow reconnection
        •  Global caching - Uses Node.js global object to persist connection across module reloads
        •  Serverless-friendly - Works well with Next.js API routes and serverless functions

        Usage example:
          import connectDB from '@/lib/mongodb';
          export async function GET() {
            await connectDB();
            // Your database operations here
          }

        Make sure to add MONGODB_URI to your .env.local file.
| =====~=====~=====~=====~=====~=====~=====~=====~=====~===== X =====~=====~=====~=====~=====~=====~=====~=====~=====~===== |

◉ Prompt - Mongoose (Models):

You are a backend developer working on a Next.js application with Mongoose and TypeScript. Your task is to build a database layer with two Mongoose models, `Event` and `Booking` in a new `database` folder.

📁 You must create exactly three files:

1. `event.model.ts`
2. `booking.model.ts`
3. `index.ts`

1. `database/event.model.ts`

Create a strongly typed Mongoose schema and model called Event with the following fields:

- `title` – string, required
- `slug` – string, unique, auto-generated from title
- `description` – string, required
- `overview` – string, required
- `image` – string, required
- `venue` – string, required
- `location` – string, required
- `date` – string, required
- `time` – string, required
- `mode` – string (e.g., online, offline, hybrid), required
- `audience` – string, required
- `agenda` – array of strings, required
- `organizer` – string, required
- `tags` – array of strings, required
- `createdAt` – date, auto-generated
- `updatedAt` – date, auto-generated

Requirements:

- Use a pre-save hook to automatically generate a URL-friendly slug from the title.
- Only regenerate the slug if the title changes.
- In the same pre-save hook, validate and normalize the `date` to ISO format and ensure `time` is stored in a consistent format.
- Validate that required fields are present and non-empty.
- Add a unique index to the slug.
- Enable automatic timestamps.
- Use strict TypeScript types (no `any`).
- Write concise comments explaining key logic such as slug generation, date formatting, and validation.

2. `database/booking.model.ts`

Create a strongly typed Mongoose schema and model called Booking with the following fields:

- `eventId` – ObjectId (reference to `Event`), required
- `email` – string, required, must be a valid email
- `createdAt` – date, auto-generated
- `updatedAt` – date, auto-generated

Requirements:

- In a pre-save hook, verify that the referenced `eventId` corresponds to an existing `Event`. Throw an error if the event does not exist.
- Validate that `email` is properly formatted.
- Add an index on `eventId` for faster queries.
- Enable automatic timestamps.
- Use strong TypeScript types throughout.
- Include concise comments explaining pre-save validation and schema design decisions.

3. `database/index.ts`

- Export both `Event` and `Booking` models so they can be imported anywhere in the application from a single file.

---

✅ Final Deliverable:

- Exactly three files: `event.model.ts`, `booking.model.ts`, and `index.ts`.
- Each model must use pre-save hooks for slug generation, date normalization, and reference validation.
- Code should be production-grade, clean, type-safe, and clear to understand.
- Include only meaningful, concise comments — no unnecessary explanations.

>> I'll create the three model files with production-ready code, proper TypeScript types, and all the required validation logic.

✅ All three files created successfully!

📁 File Structure
database/
├── event.model.ts      (155 lines)
├── booking.model.ts    (69 lines)
└── index.ts            (7 lines)

🔑 Key Features Implemented

event.model.ts
•  Slug generation: Auto-generates URL-friendly slug from title (only on title change)
•  Date normalization: Validates and converts date to ISO format (YYYY-MM-DD)
•  Time validation: Ensures time is in HH:MM 24-hour format
•  Array validation: Ensures agenda and tags have at least one item
•  Unique index: Slug field has unique index for fast lookups
•  Type-safe: Full TypeScript support with IEvent interface

booking.model.ts
•  Event reference validation: Pre-save hook verifies the event exists in database
•  Email validation: Regex-based email format validation
•  Index on eventId: Optimizes queries filtering by event
•  Type-safe: Full TypeScript support with IBooking interface
•  Circular dependency handling: Uses dynamic import to avoid import loops

index.ts
•  Centralized exports: Single import point for both models and types
•  Clean imports: Use import { Event, Booking } from '@/database'

📝 Usage Example
import connectDB from '@/lib/mongodb';
import { Event, Booking, IEvent, IBooking } from '@/database';

// Create an event
await connectDB();
const event = await Event.create({
title: 'Next.js Conference 2025',
description: 'Annual Next.js conference',
// ... other fields
});

// Create a booking
const booking = await Booking.create({
eventId: event._id,
email: 'user@example.com',
});
| =====~=====~=====~=====~=====~=====~=====~=====~=====~===== X =====~=====~=====~=====~=====~=====~=====~=====~=====~===== |
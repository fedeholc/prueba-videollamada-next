import { createClient } from "@libsql/client";

const TABLE_NAME = "note";

const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

export async function GET() {
  try {
    const result = await tursoClient.execute({
      sql: "SELECT * FROM sala",
      args: [],
    });

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Get Error: ", error);
    return new Response(`Get error: ${error.message}`, {
      status: 400,
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const user = body.user;
    const roomId = body.roomId;
    const date = body.date;

    const result = await this.db.execute({
      sql: "INSERT INTO sala (user, roomId, date) VALUES (?,?,?)",
      args: [user, roomId, date],
    });
    return new Response(JSON.stringify(result.rowsAffected), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Added CORS header
        "Access-Control-Allow-Methods": "POST", // Added CORS header
        "Access-Control-Allow-Headers": "Content-Type", // Added CORS header
      },
    });
  } catch (error) {
    console.log("Post Error: ", error);
    return new Response(`Post error: ${error.message}`, {
      status: 400,
    });
  }
}

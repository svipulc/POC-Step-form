import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const crypto = require("node:crypto");
const expiresIn = 600;
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
});
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { filename, contentType } = data;
    const Key = `${crypto.randomUUID()}-${filename}`;

    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key,
        ContentType: contentType,
      }),
      { expiresIn }
    );

    return NextResponse.json({ url, method: "PUT", success: "Image uploaded" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error uploading file" });
  }
}

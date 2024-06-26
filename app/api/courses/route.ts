// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     const { title } = await req.json();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const courseOwner = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId: userId,
//       },
//     });

//     if (!courseOwner) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const lastChapter = await db.chapter.findFirst({
//       where: {
//         courseId: params.courseId,
//       },
//       orderBy: {
//         position: "desc",
//       },
//     });

//     const newPosition = lastChapter ? lastChapter.position + 1 : 1;
//     const chapter = await db.chapter.create({
//       data: {
//         title,
//         courseId: params.courseId,
//         position: newPosition,
//       },
//     });

//     return NextResponse.json(chapter);
//   } catch (error) {
//     console.log("[CHAPTERS_ERROR]", error);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        title,
        userId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


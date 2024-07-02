
"use server";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

import { getCourseById, getUserProgress} from "@/db/queries";
import  db  from "@/db/drizzle";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";


export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user){
        throw new Error("Unauthorized user");
    }

    const course = await getCourseById(courseId);

    if(!course){
        throw new Error("Course not found");

    }

    // TODO: Enable once units and lessons are added

    // if(!course.units.length  || !course.units[0].lesson.length){
    //     throw new Errror("Course is empty");
    // }

    const existingUserProgress = await getUserProgress();
    if (existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "user",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });

        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "user",
        userImageSrc: user.imageUrl || "/mascot.svg",

    });
    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn");
};


export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();

    if(!userId){
        throw new Error("Unauthorized");
    }

    const currentUserProgres = await getUserProgress();


    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge){
        throw new Error( "Challenge not found")
    }

    const lessonId = challenge.lessonId;


    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if(isPractice){
        return {error: "practice"};
    }

    if(!currentUserProgres){
        throw new Error("User progress not found");
    }

    //TODO handle subscription

    
    if(currentUserProgres.hearts === 0){
        return {error: "hearts"}
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgres.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId));


    revalidatePath("/shop");
    revalidatePath("/learn")
    revalidatePath("quests")
    revalidatePath("quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)
}; 

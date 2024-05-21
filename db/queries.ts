import { cache } from "react";
import { eq } from "drizzle-orm";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { userProgress } from "./schema";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId){
        return null;
    }

    const data = db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });
    return data;

})

export const  getCourses = cache(async ()  => {
    const data = await db.query.courses.findMany();
    
    return data;
});
 


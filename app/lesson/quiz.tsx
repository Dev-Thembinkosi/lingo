"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {

    initalPercentage : number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];

    userSubscription: any;  //TODO: Replace with subscription DB type
}


export const Quiz = ({
    initalPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initalPercentage)
    return(
        <>
            <Header 
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
        </>
    )
}
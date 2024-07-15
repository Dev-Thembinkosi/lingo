"use client"

import { Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";

import { UnitList } from "./unit/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";

import { LessonEdit } from "./lesson/edit";
import { LessonCreate } from "./lesson/create";
import { LessonList } from "./lesson/list";

import { ChallengeList } from "./challenge/list";
import { challengeCreate } from "./challenge/create";
import { challengeEdit } from "./challenge/edit";

const dataProvider = simpleRestProvider("/api")

const App = () => {
    return (
    <Admin dataProvider={dataProvider}>
        <Resource 
            name="courses" 
            list={CourseList} 
            create={CourseCreate}
            edit={CourseEdit}
            recordRepresentation="title" 
        />


        <Resource 
            name="units" 
            list={UnitList} 
            create={UnitCreate}
            edit={UnitEdit}
            recordRepresentation="title" 
        />

        <Resource 
            name="lessons" 
            list={LessonList} 
            create={LessonCreate}
            edit={LessonEdit}
            recordRepresentation="title" 
        />

        <Resource 
            name="challenges" 
            list={ChallengeList} 
            create={challengeCreate}
            edit={challengeEdit}
            recordRepresentation="question" 
        />
    </Admin>
)};

export default App;
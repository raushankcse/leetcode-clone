import { Suspense } from "react"
import { useRecoilValue } from "recoil";
import {globalSubmissions } from "../store/atoms/submissions"



export const SubmissionActivityList = () => {
    return <Suspense fallback={"Loading.."}>
         <_SubmissionActivityList/>
    </Suspense>
}

 const _SubmissionActivityList = () => {
    const submissions = useRecoilValue(globalSubmissions);
    return <div>
        {JSON.stringify(submissions)}
    </div>
}
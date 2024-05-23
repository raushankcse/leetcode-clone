import { Suspense } from "react"



export const SubmissionActivityList = () => {
    return <Suspense fallback={()=> <>Loading...</>}>
         <_SubmissionActivityList/>
    </Suspense>
}

 const _SubmissionActivityList = () => {
    const submissions = useRecoilValue(globalSubmissions);
    return <div>
        {JSON.stringify(submissions)}
    </div>
}
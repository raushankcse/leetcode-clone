import axios from "axios";
import { atom, selector } from "recoil";

export type Submission = {
  language: string;
  timestamp: number;
  submission: string;
  status:string;
  username: string;
  problemId: string;
}

 
export const globalSubmissions = selector({
  key: 'globalSubmissions', 
  get: async({get})=>{
    const response = await axios.get("http://127.0.0.1:5001/leetcode-clone-5ecf3/us-central1/getSubmissions");
    return response.data.response.map((x: any)=>({
      language: x.submission.language,
      timestamp: x.submission.submitTime._nanoseconds,
      submission: x.submission.submission,
      status: x.submission.status,
      problemId: x.submission.problemId,
      username: x.user.username
    }));
  },
})
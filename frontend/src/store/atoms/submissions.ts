import axios from "axios";
import { atom, selector } from "recoil";

type Submission = {
  language: string;
  timestamp: number;
  submission: string;
  status:true;
}


export const globalSubmissions = selector({
  key: 'globalSubmissions', 
  get: async({get})=>{
    const response = await axios.get("http://127.0.0.1:5001/leetcode-clone-5ecf3/us-central1/getSubmissions");
    return response.data.response.map(x=>({
      language: x.language,
      timestamp: x.submitTime._nanoseconds,
      submission: x.submission,
      status: x.status
    }));
    
  },
})
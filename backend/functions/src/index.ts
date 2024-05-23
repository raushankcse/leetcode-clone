import {setGlobalOptions} from "firebase-functions/v2";

import {onRequest} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";
// import {initializeApp} from "firebase-admin/app";
// import {getFirestore} from "firebase-admin/firestore";
import admin from "firebase-admin";
import {SUPPORTED_LANGUAGES} from "./utils";

admin.initializeApp();

const db = admin.firestore();


setGlobalOptions({maxInstances: 10});


export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getSubmissions = onRequest({cors:true},async (request, response) => {
  try {
    const limit = request.body.limit || 10;
    const res = await db.collection("submissions")
      .limit(limit)
      .orderBy("submitTime", "desc").get();
    const submissions = res.docs.map((doc) => doc.data());

    response.status(200).send({response: submissions});
  } catch (error) {
    logger.error("Error fetching submissions", error);
    response.status(500).send({error: "Failed to fetch submissions"});
  }
});

export const submit = onRequest(async (request, response) => {
  try {
    const uid = request.body.uid;
    const language = request.body.language;
    const submission = request.body.submission;
    const problemId = request.body.problemId;

    if (!uid) {
      response.status(401).send({message: "Unauthorized"});
      return;
    }

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      response.status(400).send({message: "Language not supported"});
      return;
    }

    const problemDoc = await db.collection("problems")
      .doc(problemId?.toString()).get();
    if (!problemDoc.exists) {
      response.status(404).send({message: "Problem doesn't exist"});
      return;
    }

    const doc = await db.collection("submissions").add({
      language,
      submission,
      problemId,
      userId: uid,
      submitTime: new Date(),
      workerTryCount: 0,
      status: "PENDING...",
    });

    response.status(200).send({message: "Submission done", id: doc.id});
  } catch (error) {
    logger.error("Error submitting", error);
    response.status(500).send({message: "Submission failed"});
  }
});


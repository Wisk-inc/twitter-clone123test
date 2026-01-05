import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.admin_key
);

const index = client.initIndex('tweets');

export const searchTweets = functions.https.onCall(async (data, context) => {
  const { query } = data;
  const result = await index.search(query);
  return result.hits;
});

export const indexTweet = functions.firestore
  .document('tweets/{tweetId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return index.saveObject({ ...data, objectID });
  });

export const unindexTweet = functions.firestore
  .document('tweets/{tweetId}')
  .onDelete((snap, context) => {
    const objectID = snap.id;
    return index.deleteObject(objectID);
  });

export const updateIndexedTweet = functions.firestore
  .document('tweets/{tweetId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

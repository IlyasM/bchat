import {
   mergeMap,
   catchError,
   map,
   withLatestFrom,
   tap,
   debounceTime,
   ignoreElements
} from "rxjs/operators";
import { Socket } from "phoenix";
import { Observable, of } from "rxjs";
import { ofType } from "redux-observable";
const wsURL = "ws://localhost:4000";
export const actions = {
   broadcastCreate: message => ({
      type: "BROADCAST_CREATE",
      message
   }),
   replyCreate: (broadcast, reply) => ({
      type: "REPLY_CREATE",
      broadcast,
      reply
   }),
   replyDecline: broadcast => ({ type: "REPLY_DECLINE", broadcast })
};
export default {
   broadcastCreate: (action$, state$) =>
      action$.pipe(
         ofType("BROADCAST_CREATE"),
         withLatestFrom(state$),
         mergeMap(([{ message }, { identity: { channel } }]) =>
            Observable.create(observer => {
               channel.push("new:broadcast", message).receive("ok", message => {
                  observer.next({
                     type: "BROADCAST_CREATE_OK",
                     message
                  });
               });
            })
         )
      ),
   replyCreate: (action$, state$) =>
      action$.pipe(
         ofType("REPLY_CREATE"),
         withLatestFrom(state$),
         tap(([{ broadcast, reply }, { identity: { channel, myId } }]) => {
            const message = {
               to_id: `user:${broadcast.user_id}`,
               from_id: myId,
               broadcast_id: `${broadcast.id}`,
               text: reply,
               type: "reply"
            };
            channel.push("new:msg", message);
         }),
         ignoreElements()
      )
};

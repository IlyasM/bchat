import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";
import { Socket } from "phoenix";
const wsURL = "ws://localhost:4000";
export const actions = {
   connect: (id: number, bizId: number) => ({
      type: "CONNECT",
      id,
      bizId
   })
};
export default {
   connect: (action$, state$) =>
      action$.pipe(
         ofType("CONNECT"),
         withLatestFrom(state$),
         mergeMap(([{ id, bizId }, { data: { chats, lastEventId } }]) =>
            Observable.create(observer => {
               // connect socket
               const socket = new Socket(`${wsURL}/socket`, {
                  params: { user_id: id }
               });
               socket.connect();
               socket.onError(e =>
                  observer.next({
                     type: "CONNECT_ERROR",
                     error: "unauthorized"
                  })
               );
               // join channel
               const name = bizId ? "business:" + bizId : "user:" + id;
               const channel = socket.channel(name, {
                  last_event_id: 0,
                  chat_ids: chats.allIds
               });

               channel
                  .join()
                  .receive("ok", response => {
                     observer.next({
                        type: "JOIN_MAIN_OK",
                        payload: { channel, response, socket, me: name }
                     });
                     //ack delivery - double tick grey
                     channel.push("bulk:delivered", {
                        ids: Object.keys(response.messages)
                     });
                  })
                  .receive("error", error =>
                     observer.next({ type: "JOIN_MAIN_ERROR", error })
                  );
               //this mainly handles online status and categories
               channel.on("after:join", payload =>
                  observer.next({
                     type: "AFTER_JOIN",
                     payload
                  })
               );
               channel.on("new:msg", message => {
                  console.log(message);
                  observer.next({
                     type: "NEW_MSG",
                     payload: { message }
                  });
               });
            })
         )
      )
};

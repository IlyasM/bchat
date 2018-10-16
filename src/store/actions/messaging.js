import {
   mergeMap,
   catchError,
   map,
   withLatestFrom,
   tap,
   debounceTime,
   ignoreElements,
   switchMap
} from "rxjs/operators";
import { Socket } from "phoenix";
import { Observable, of } from "rxjs";
import { ofType } from "redux-observable";
const wsURL = "ws://localhost:4000";
export const actions = {
   connect: (id: number, bizId: number) => ({
      type: "CONNECT",
      id,
      bizId
   }),
   setRoute: (id: string) => ({
      type: "SET_ROUTE",
      id
   }),
   pushMsg: message => ({
      type: "PUSH_MSG",
      message
   }),
   pushTyping: chatId => ({
      type: "PUSH_TYPING",
      chatId
   })
};
export default {
   connect: (action$, state$) =>
      action$.pipe(
         ofType("CONNECT"),
         withLatestFrom(state$),
         mergeMap(([{ id, bizId }, { data: { chats, lastEventId, route } }]) =>
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
                  last_event_id: lastEventId,
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
                  if (message.reply) {
                     observer.next({
                        type: "NEW_REPLY",
                        payload: { message, myId: name }
                     });
                  } else {
                     observer.next({
                        type: "NEW_MSG",
                        payload: { message, myId: name }
                     });
                  }

                  // ack delivery
                  if (message.type === "message") {
                     setTimeout(() => {
                        observer.next({
                           type: "PUSH_MSG",
                           message: {
                              type: "status",
                              text: null,
                              to_id: message.from_id,
                              from_id: message.to_id
                           }
                        });
                     }, 1000);
                  }
               });
               channel.on("typing", ({ id }) => {
                  observer.next({ type: "TYPING_INCOMING", chatId: id });
               });
               channel.on("new:broadcast", broadcast => {
                  observer.next({ type: "NEW_BROADCAST", broadcast });
               });
            })
         )
      ),
   pushMsg: (action$, state$) =>
      action$.pipe(
         ofType("PUSH_MSG"),
         withLatestFrom(state$),
         mergeMap(
            ([
               { message },
               {
                  identity: { channel, myId },
                  data: { route }
               }
            ]) =>
               Observable.create(observer => {
                  if (message.type === "status") {
                     message.text =
                        route === message.to_id ? "seen" : "delivered";
                  }
                  channel.push("new:msg", message).receive("ok", message => {
                     observer.next({
                        type: "NEW_MSG",
                        payload: {
                           message: { ...message, mark: "saved" },
                           myId
                        }
                     });
                  });
               })
         )
      ),
   setRoute: (action$, state$) =>
      action$.pipe(
         ofType("SET_ROUTE"),
         withLatestFrom(state$),
         tap(
            ([
               { id },
               {
                  identity: { channel, myId }
               }
            ]) =>
               id &&
               channel.push("new:msg", {
                  from_id: myId,
                  to_id: id,
                  type: "status",
                  text: "seen"
               })
         ),
         ignoreElements()
      ),
   pushTyping: (action$: Observable<Action>, state$: Observable<any>) =>
      action$.pipe(
         ofType("PUSH_TYPING"),
         withLatestFrom(state$),
         tap(([{ chatId }, { identity: { channel, myId } }]) =>
            channel.push("typing", { to_id: chatId })
         ),
         ignoreElements()
      ),
   typingIncoming: (action$: Observable<Action>) =>
      action$.pipe(
         ofType("TYPING_INCOMING"),
         debounceTime(800),
         switchMap(action => {
            return of({
               type: "TYPING_INCOMING_STOP",
               chatId: action.chatId
            });
         })
      )
};

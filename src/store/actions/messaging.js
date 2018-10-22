//@flow
import {
  mergeMap,
  catchError,
  map,
  withLatestFrom,
  tap,
  filter,
  debounceTime,
  ignoreElements,
  switchMap
} from "rxjs/operators"
import { Socket } from "phoenix"
import { Observable, of } from "rxjs"
import { ofType } from "redux-observable"
const wsURL = "ws://localhost:4000"
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
}
export default {
  connect: (action$, state$) =>
    action$.pipe(
      ofType("CONNECT"),
      withLatestFrom(state$),
      mergeMap(
        ([
          action,
          {
            identity: { me, token },
            data: { chats, lastEventId, route }
          }
        ]) =>
          Observable.create(observer => {
            // connect socket
            console.log("trying to connect")
            const socket = new Socket(`${wsURL}/socket`, {
              params: { token }
            })
            socket.connect()
            socket.onError(e =>
              observer.next({
                type: "CONNECT_ERROR",
                error: "unauthorized"
              })
            )
            // join channel
            const name = me.category ? "business:" + me.id : "user:" + me.id
            const channel = socket.channel(name, {
              last_event_id: lastEventId,
              chat_ids: chats.allIds
            })
            console.log(lastEventId, chats.allIds)
            channel
              .join()
              .receive("ok", response => {
                observer.next({
                  type: "JOIN_MAIN_OK",
                  payload: { channel, response, socket, me: name }
                })
                //ack delivery - double tick grey
                channel.push("bulk:delivered", {
                  ids: Object.keys(response.messages)
                })
              })
              .receive("error", error =>
                observer.next({ type: "JOIN_MAIN_ERROR", error })
              )
            //this mainly handles online status and categories
            channel.on("after:join", payload =>
              observer.next({
                type: "AFTER_JOIN",
                payload
              })
            )
            channel.on("new:msg", response => {
              if (response.message.type === "reply") {
                observer.next({
                  type: "NEW_REPLY",
                  payload: { response, myId: name }
                })
              } else {
                observer.next({
                  type: "NEW_MSG",
                  payload: { response, myId: name }
                })
              }

              // ack delivery
              if (response.message.type === "message") {
                setTimeout(() => {
                  observer.next({
                    type: "PUSH_MSG",
                    message: {
                      type: "status",
                      text: null,
                      to_id: response.message.from_id,
                      from_id: response.message.to_id
                    }
                  })
                }, 1000)
              }
            })
            channel.on("typing", ({ id }) => {
              observer.next({ type: "TYPING_INCOMING", chatId: id })
            })
            channel.on("new:broadcast", broadcast => {
              observer.next({ type: "NEW_BROADCAST", broadcast })
            })
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
              message.text = route === message.to_id ? "seen" : "delivered"
            }
            channel.push("new:msg", message).receive("ok", response => {
              observer.next({
                type: "NEW_MSG",
                payload: {
                  response: {
                    message: { ...response.message, mark: "saved" },
                    from: response.from
                  },
                  myId
                }
              })
            })
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
            identity: { channel, myId },
            data: { chats: byIds }
          }
        ]) => {
          id &&
            channel.push("new:msg", {
              from_id: myId,
              to_id: id,
              type: "status",
              text: "seen"
            })
          if (!byIds[id]) {
            //create chat?
          }
        }
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
        })
      })
    )
}

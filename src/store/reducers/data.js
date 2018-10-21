import mergeWith from "lodash/mergeWith"
import omit from "lodash/omit"
type Event = {
   id: number,
   toId: string,
   fromId: string,
   text: string,
   type: "message" | "status" | "reply",
   insertedAt: string,
   mark: "saved" | "delivered" | "seen",
   broadcastId: number
}
type Chat = {
   [id: number]: {
      id: number,
      events: [Event],
      state: "normal" | "blocked" | "deleted",
      last: Event
   }
}
type Broadcast = {
   [id: string]: { id: number, replies: [Event], active: boolean }
}

type NShape<Item> = { byIds: Item, allIds: [string] }

type State = {
   lastEventId: number,
   chats: NShape<Chat>,
   broadcasts: NShape<Broadcast>
}
const init: State = {
   lastEventId: 0,
   route: null,
   chats: {
      byIds: {},
      allIds: []
   },
   broadcasts: { byIds: {}, allIds: [] },
   bizBroadcasts: { byIds: {}, all: [] }
}

export default (state = init, action) => {
   switch (action.type) {
      case "SET_ROUTE":
         return { ...state, route: action.id }
      case "JOIN_MAIN_OK":
         return calculateStateFromEvents(action, state)
      case "NEW_MSG":
         return newMessage(action, state)
      case "TYPING_INCOMING":
         return handleTyping(true, action.chatId, state)
      case "TYPING_INCOMING_STOP":
         return handleTyping(false, action.chatId, state)
      case "BROADCAST_CREATE_OK":
         return broadcastCreate(action, state)
      case "NEW_BROADCAST":
         return newBroadcast(action, state)
      case "REPLY_CREATE":
      case "REPLY_DECLINE":
         return handleReply(action, state)
      case "NEW_REPLY":
         return newReply(action, state)
      default:
         return state
   }
}

function newReply(action, state) {
   const { message, from } = action.payload.response

   const id = parseInt(message.broadcast_id)
   const broadcast = state.broadcasts.byIds[id]
   return {
      ...state,
      broadcasts: {
         ...state.broadcasts,
         byIds: {
            ...state.broadcasts.byIds,
            [id]: {
               ...broadcast,
               replies: [{ ...message, business: from }, ...broadcast.replies]
            }
         }
      }
   }
}

function handleReply({ broadcast }, state) {
   return {
      ...state,
      bizBroadcasts: {
         byIds: omit(state.bizBroadcasts.byIds, broadcast.id),
         all: state.bizBroadcasts.all.filter(b => b.id !== broadcast.id)
      }
   }
}
function newBroadcast({ broadcast }, state) {
   return {
      ...state,
      bizBroadcasts: {
         byIds: {
            ...state.bizBroadcasts.byIds,
            [broadcast.id]: broadcast
         },
         all: [broadcast, ...state.bizBroadcasts.all]
      }
   }
}
function broadcastCreate(action, state) {
   const broadcast = action.message

   return {
      ...state,
      broadcasts: {
         byIds: {
            ...state.broadcasts.byIds,
            [broadcast.id]: { ...broadcast, replies: [] }
         },
         allIds: [broadcast.id, ...state.broadcasts.allIds]
      }
   }
}
function handleTyping(typing, chatId, state) {
   const chat = state.chats.byIds[chatId]
   return {
      ...state,
      chats: {
         ...state.chats,
         byIds: { ...state.chats.byIds, [chatId]: { ...chat, typing } }
      }
   }
}
function newMessage(action, state) {
   const { response, myId } = action.payload
   const { message, from } = response
   const chatId = message.to_id === myId ? message.from_id : message.to_id
   let chat = state.chats.byIds[chatId]
   console.log(chat)
   if (!chat) {
      chat = {
         events: [],
         id: chatId,
         last: message,
         name: from.name,
         category: from.category
      }
   }
   const ids = state.chats.allIds.filter(id => id !== chatId)

   if (message.type !== "message") {
      for (ev of chat.events) {
         if (ev.mark === "seen") break
         ev.mark = message.text
      }
   }

   const events =
      message.type === "message" ? [message, ...chat.events] : chat.events
   const last = message.type === "message" ? message : chat.last
   return {
      ...state,
      lastEventId: message.id,
      chats: {
         allIds: [chatId, ...ids],
         byIds: {
            ...state.chats.byIds,
            [chatId]: {
               ...chat,
               events,
               last
            }
         }
      }
   }
}

function calculateStateFromEvents(action, state) {
   //get updated messages in chats post join
   const { response, me } = action.payload
   const { messages, statuses, last_event_id } = response
   if (Object.keys(messages).length === 0 && messages.constructor === Object) {
      return state
   }
   const chats = mergeWith(state.chats.byIds, messages, (oldChat, newChat) => {
      const initial = oldChat ? oldChat.events : []
      return {
         ...oldChat,
         events: [...newChat.events, ...initial],
         typing: false,
         ...newChat
      }
   })
   // sort chats according to last message date
   const ids =
      Object.keys(chats).sort((a, b) => {
         if (!chats[a].last || !chats[b].last) return false
         return chats[a].last.inserted_at < chats[b].last.inserted_at
      }) || []
   // handle statuses
   Object.keys(statuses).forEach(id => {
      if (!chats[id]) return
      if (statuses[id].text === "seen") {
         chats[id].last.mark = "seen"
      } else {
         // traverse and count unseen messages
         let count = 0
         for (ev of chats[id].events) {
            if (ev.mark && ev.mark === "seen") break
            if (ev.from_id !== me) {
               count += 1
            } else {
               ev.mark = "delivered"
            }
         }
         chats[id].count = count
      }
   })

   return {
      ...state,
      lastEventId: last_event_id,
      chats: { byIds: chats, allIds: ids }
   }
}

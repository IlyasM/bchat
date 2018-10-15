import mergeWith from "lodash/mergeWith";
type Event = {
   id: number,
   toId: string,
   fromId: string,
   text: string,
   type: "message" | "status" | "reply",
   insertedAt: string,
   mark: "saved" | "delivered" | "seen" | null,
   broadcastId: number
};
type Chat = {
   [id: number]: {
      id: number,
      events: [Event],
      state: "normal" | "blocked" | "deleted",
      last: Event
   }
};
type Broadcast = {
   [id: string]: { id: number, replies: [Event], active: boolean }
};

type NShape<Item> = { byIds: Item, allIds: [string] };

type State = {
   lastEventId: number,
   chats: NShape<Chat>,
   broadcasts: NShape<Broadcast>
};
const init: State = {
   lastEventId: 0,
   route: null,
   chats: {
      byIds: {},
      allIds: []
   },
   broadcasts: { byIds: {}, allIds: [] }
};

export default (state = init, action) => {
   switch (action.type) {
      case "SET_ROUTE":
         return { ...state, route: action.id };
      case "JOIN_MAIN_OK":
         return calculateStateFromEvents(action, state);
      case "NEW_MSG":
         return newMessage(action, state);
      case "TYPING_INCOMING":
         return handleTyping(true, action.chatId, state);
      case "TYPING_INCOMING_STOP":
         return handleTyping(false, action.chatId, state);

      default:
         return state;
   }
};
function handleTyping(typing, chatId, state) {
   const chat = state.chats.byIds[chatId];
   if (!chat) return state;
   return {
      ...state,
      chats: {
         ...state.chats,
         byIds: { ...state.chats.byIds, [chatId]: { ...chat, typing } }
      }
   };
}
function newMessage(action, state) {
   const { message, myId } = action.payload;

   const chatId = message.to_id === myId ? message.from_id : message.to_id;
   const chat = state.chats.byIds[chatId];
   const ids = state.chats.allIds.filter(id => id !== chatId);
   const events =
      message.type === "message"
         ? [message, ...chat.events]
         : chat.events.map(ev => ({
              ...ev,
              mark: ev.mark === "seen" ? ev.mark : message.text
           }));
   const last = message.type === "message" ? message : chat.last;
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
   };
}

function calculateStateFromEvents(action, state) {
   //get updated messages in chats post join
   const { response, me } = action.payload;
   const { messages, statuses, last_event_id } = response;
   const chats = mergeWith(state.chats.byIds, messages, (oldChat, newChat) => {
      const initial = oldChat ? oldChat.events : [];
      return {
         ...oldChat,
         events: [...newChat.events, ...initial],
         typing: false,
         ...newChat
      };
   });
   // sort chats according to last message date
   const ids =
      Object.keys(chats).sort((a, b) => {
         return chats[a].last.inserted_at < chats[b].last.inserted_at;
      }) || [];
   // handle statuses
   Object.keys(statuses).forEach(id => {
      if (statuses[id].text === "seen") {
         chats[id].last.mark = "seen";
      } else {
         // traverse and count unseen messages
         let count = 0;
         for (ev of chats[id].events) {
            if (ev.mark && ev.mark === "seen") break;
            if (ev.from_id !== me) {
               count += 1;
            } else {
               ev.mark = "delivered";
            }
         }
         chats[id].count = count;
      }
   });

   // console.log(chats, statuses, ids);
   return {
      ...state,
      lastEventId: last_event_id,
      chats: { byIds: chats, allIds: ids }
   };
}

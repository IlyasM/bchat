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

   chats: {
      byIds: {},
      allIds: []
   },
   broadcasts: { byIds: {}, allIds: [] }
};

export default (state = init, action) => {
   switch (action.type) {
      case "JOIN_MAIN_OK":
         //get updated messages in chats post join
         const jPayload = action.payload.response;
         const jChats = mergeWith(
            state.chats.byIds,
            jPayload.messages,
            (c1, c2) => {
               const initial = c1 ? c1.events : [];
               return {
                  ...c1,
                  events: [...c2.events, ...initial],
                  ...c2
               };
            }
         );
         // sort chats according to last message date
         const jIds = Object.keys(jChats).sort((a, b) => {
            return jChats[a].last.inserted_at > jChats[b].last.inserted_at;
         });
         const jStatuses = jPayload.statuses;
         // handle statuses
         Object.keys(jStatuses).forEach(id => {
            if (jStatuses[id].text === "seen") {
               jChats[id].last.mark = "seen";
            } else {
               // traverse and mark delivered till first seen
               for (ev of jChats[id].events) {
                  if (ev.mark && ev.mark === "seen") break;
                  ev.mark = "delivered";
               }
            }
         });
         console.log(jChats, jStatuses);
         // return init;
         return { ...state, chats: { byIds: jChats, allIds: jIds } };

      default:
         return state;
   }
};

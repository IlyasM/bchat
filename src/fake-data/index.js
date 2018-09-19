import Faker from "faker";
import range from "lodash/range";
import { uuid4 } from "fast-uuid";
let tags = ["Посуточно", "<2000", "Недорого"];

export const categories = [
   { name: "Еда", id: uuid4(), tags },
   { name: "Квартиры", id: uuid4(), tags },
   { name: "Сувениры", id: uuid4(), tags },
   { name: "Спорт", id: uuid4(), tags },
   { name: "Дизайн", id: uuid4(), tags },
   { name: "Цветы", id: uuid4(), tags },
   { name: "Фотография", id: uuid4(), tags },
   { name: "Отдых", id: uuid4(), tags },
   { name: "Парашют", id: uuid4(), tags },
   { name: "Замена Масла", id: uuid4(), tags },
   { name: "Игры", id: uuid4(), tags },
   { name: "Маникюрный салон", id: uuid4(), tags },
   { name: "Эвакуатор", id: uuid4(), tags },
   { name: "Страховка", id: uuid4(), tags },
   { name: "Поля", id: uuid4(), tags },
   { name: "Трезвый водитель", id: uuid4(), tags },
   { name: "Школа английского", id: uuid4(), tags },
   { name: "Юрист", id: uuid4(), tags },
   { name: "Репетитор", id: uuid4(), tags },
   { name: "Ремонт", id: uuid4(), tags },
   { name: "SMM", id: uuid4(), tags },
   { name: "Нотариус", id: uuid4(), tags }
];

const randomOf = lis => lis[Math.floor(Math.random() * lis.length)];

export const bizList = range(0, 100).map(i => ({
   id: uuid4(),
   name: Faker.company.companyName(),
   address: Faker.address.city() + " " + Faker.address.streetAddress(),
   phoneNumbers: [
      Faker.phone.phoneNumber(),
      Faker.phone.phoneNumber(),
      Faker.phone.phoneNumber()
   ],
   description: Faker.lorem.sentence(),
   image: { uri: Faker.image.avatar() },
   category: randomOf(categories),
   tags: randomOf(tags),
   online: Math.random() > 0.5
}));

export const generate = number => {
   return new Promise((resolve, reject) => {
      this.setTimeout(() => {
         resolve({
            lastIndex: number,
            list: range(1, number).map(key => ({
               id: uuid4(),
               name: Faker.company.companyName(),
               address:
                  Faker.address.city() + " " + Faker.address.streetAddress(),
               phoneNumbers: [
                  Faker.phone.phoneNumber(),
                  Faker.phone.phoneNumber(),
                  Faker.phone.phoneNumber()
               ],
               description: Faker.lorem.sentence(),
               image: { uri: Faker.image.avatar() },
               category: randomOf(categories),
               tags: randomOf(tags),
               online: Math.random() > 0.5
            }))
         });
      }, 500);
   });
};

export const messages = () => {
   return range(0, 20)
      .map(key => ({
         id: uuid4(),
         order: key,
         text: Faker.lorem.sentence(),
         isMe: Math.random() > 0.5
      }))
      .reverse();
};

export const me = {
   id: uuid4(),
   name: "Ilyas",
   phoneNumber: "87081914554",
   image: { uri: Faker.image.avatar() }
};
export const chats = range(0, 20).map(i => ({
   id: uuid4(),
   name: Faker.company.companyName(),
   address: Faker.address.city() + " " + Faker.address.streetAddress(),
   phoneNumbers: [
      Faker.phone.phoneNumber(),
      Faker.phone.phoneNumber(),
      Faker.phone.phoneNumber()
   ],
   description: Faker.lorem.sentence(),
   image: { uri: Faker.image.avatar() },
   lastMessage: Faker.lorem.sentence(),
   tags: randomOf(tags),
   online: Math.random() > 0.5,
   category: randomOf(categories),
   count: Math.floor(Math.random() * 20)
}));

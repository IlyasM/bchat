import Faker from "faker";
import range from "lodash/range";
import { uuid4 } from "fast-uuid";
let tags = ["Посуточно", "<2000", "Недорого"];

export const categories = [
   { name: "Еда", id: uuid4(), tags, question: "Есть бизнес ланч?" },
   {
      name: "Квартиры",
      id: uuid4(),
      tags,
      question: "Нужна на пару часов квартира от 2000 тенге в час"
   },
   {
      name: "Сувениры",
      id: uuid4(),
      tags,
      question: "Хочу сделать интересеный подарок"
   },
   { name: "Спорт", id: uuid4(), tags, question: "Нужны кроссы" },
   {
      name: "Дизайн",
      id: uuid4(),
      tags,
      question: "Сделайте мне лого. Сколько будет стоить примерно?"
   },
   { name: "Цветы", id: uuid4(), tags, question: "Есть гортензии?" },
   {
      name: "Фотография",
      id: uuid4(),
      tags,
      question: "Сможете сделать свадебные фотки?"
   },
   { name: "Отдых", id: uuid4(), tags, question: "Нужен гид по горам" },
   {
      name: "Парашют",
      id: uuid4(),
      tags,
      question: "Хочу прыгнуть на этой неделе?"
   },
   {
      name: "Замена Масла",
      id: uuid4(),
      tags,
      question: "Поменяете масло? Свободный бокс?"
   },
   { name: "Игры", id: uuid4(), tags, question: "Mortal combat есть?" },
   {
      name: "Маникюрный салон",
      id: uuid4(),
      tags,
      question: "На 5 вечера можно записаться?"
   },
   { name: "Эвакуатор", id: uuid4(), tags, question: "Срочно нужен эвакуатор" },
   {
      name: "Страховка",
      id: uuid4(),
      tags,
      question: "Страховка истекает через пару дней, легковое авто"
   },
   {
      name: "Поля",
      id: uuid4(),
      tags,
      question: "Поиграть хотим в 9 вечера, 2 часа"
   },
   {
      name: "Трезвый водитель",
      id: uuid4(),
      tags,
      question: "Нужен трезвый водитель, я у бара"
   },
   {
      name: "Школа английского",
      id: uuid4(),
      tags,
      question: "Intermediate нужно прокачаться, недорого"
   },
   {
      name: "Юрист",
      id: uuid4(),
      tags,
      question: "Консультация по имуществу нужна"
   },
   {
      name: "Репетитор",
      id: uuid4(),
      tags,
      question: "Ищу репетитора по математике для ребенка 10 лет"
   },
   {
      name: "Ремонт",
      id: uuid4(),
      tags,
      question: "Побелить стену, дом 100 кв"
   },
   { name: "SMM", id: uuid4(), tags, question: "Нужны подписчики" },
   { name: "Нотариус", id: uuid4(), tags, question: "Заверить удостоверение" }
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

import Faker from "faker/locale/ru";
import range from "lodash/range";
import { uuid4 } from "fast-uuid";
let tags = ["Посуточно", "<2000", "Недорого"];
export const categories = [
   { name: "Обмен товаров", id: uuid4(), tags, question: "Есть бизнес ланч?" },
   {
      name: "Квартиры",
      id: uuid4(),
      tags,
      question: "Нужна на пару часов квартира от 2000 тенге в час"
   },
   {
      name: "Персональный тренер",
      id: uuid4(),
      tags,
      question: "накачай пресс"
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
   // {
   //    name: "Парашют",
   //    id: uuid4(),
   //    tags,
   //    question: "Хочу прыгнуть на этой неделе?"
   // },
   {
      name: "Замена Масла",
      id: uuid4(),
      tags,
      question: "Поменяете масло? Свободный бокс?"
   },
   {
      name: "Грузо перевозки",
      id: uuid4(),
      tags,
      question: "Нужна газель от Тимирязева маркова до хан тенгри?"
   },
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

export const business = () => ({
   id: uuid4(),
   name: Faker.company.companyName(),
   address: Faker.address.city() + " " + Faker.address.streetAddress(),
   phoneNumbers: [
      Faker.phone.phoneNumber(),
      Faker.phone.phoneNumber(),
      Faker.phone.phoneNumber()
   ],
   lastMessage: Faker.lorem.sentence(),
   description: Faker.lorem.paragraph(),
   shortDescription: Faker.lorem.sentence(),
   image: { uri: Faker.image.avatar() },
   category: randomOf(categories),
   tags: randomOf(tags),
   online: Math.random() > 0.5,
   count: Math.floor(Math.random() * 20)
});

export const bizList = range(0, 100).map(business);

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
export const faq = range(0, 2).map(o => Faker.lorem.sentence());

export const chats = range(0, 20).map(business);

export const replies = () =>
   range(0, Math.floor(Math.random() * 7)).map(i => ({
      id: uuid4(),
      business: business(),
      reply: Faker.lorem.sentence()
   }));

import { Model, fk, oneToOne, many } from "redux-orm"

export class Category extends Model {}
Category.modelName = "Category"
Category.fields = {
  businesses: many("Business")
}

export class Business extends Model {}
Business.modelName = "Business"
Business.fields = {
  category: fk("Category"),
  user: fk("User")
}

export class User extends Model {}
User.modelName = "User"
User.fields = {
  businesses: many("Business"),
  broadcasts: many("Broadcast")
}

export class Broadcast extends Model {}
Broadcast.modelName = "Broadcast"
Broadcast.fields = {
  user: fk("User"),
  replies: many("Event")
}

export class AEvent extends Model {}
AEvent.modelName = "Event"

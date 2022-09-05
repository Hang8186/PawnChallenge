import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    id: string;

    @Prop()
    createAt: string;

    @Prop()
    userName: string;
    
    @Prop()
    password: string;
    
    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
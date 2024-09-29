"use server";
import * as sdk from 'node-appwrite'
import { parseStringify } from "@/lib/utils";

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ad2c76001c700ba8ae')
    .setKey('df9835b268e3a1f9f64f604b906b92097ac4c982ed68a2b92b2144541abb1c1f84b357c79adf6ee328a9bdcb92711b5ac96a87d3079f712a139034fd35dce5661419bb86c7590ce2d20925e090f88ce0acb8160eb24e22458771c0edba3c87b14a3ed383f9081a494a2972ae9ca79005c34a8de6aab321140383fee7611ca036')
    .setSession('')

    const users = new sdk.Users(client);
    const account = new sdk.Account(client)

export const getUser = async (userId:string) => {
    try {
      const user = await users.get(
        userId 
    );
      console.log({useri:user})
      return parseStringify(user);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the user details:",
        error
      );
    }
  };



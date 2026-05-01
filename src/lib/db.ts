/* Notes from Gabe:
 *
 * This is for anyone working on this over the weekend.
 * The basic backend structure is fully built, but it's not connected to the front end.
 * Furthermore, I've been testing this on Postman. It is correctly connecting to the database through that app, so that's good.
 * So it can create new accounts and knows if an account is already been created with specific information.
 * Problem is, I can't seem to get the authorization cookies to work, so I can't test to see if classes are added correctly.
 * Basically, I can create an account, but not log in with that account.
 * The class creation may already work, idk. I can't test it yet, because I need to be logged in to create a class.
 * The demo account I created was username = test, email = test@test.com, password = 123456 for further testing.
 * Add this to your .env.local file: MONGODB_URI=mongodb+srv://gai73005:TheS1thM%40ster@dawg-developers-cluster.sjgmajx.mongodb.net/?appName=Dawg-Developers-Cluster
 * I'll be able to get back to this on Sunday, so anything y'all can do in the meantime is greatly appreciated.
 * The current goal is to make sure the backend functionality works by itself before connecting it to the frontend.
 * You shouldn't need access to the mongo database, but if for some reason you do, I can try to get you added over the weekend.
 * I work a double on Friday and Saturday, so I'll do my best.
 * Make sure to run 'npm install mongoose bcryptjs next-auth' in the project directory btw
 * That's all. I'll be available as I can. We can definitely get this done before Tuesday.
 * 
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
import {Context} from "elysia";

export const index = (context: Context) => {
    return Bun.file('public/index.html')
}
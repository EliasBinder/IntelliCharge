import {Context} from "elysia";

export const frontend = (context: Context) => {
    const path = context.path;
    const filepath = 'public' + path; //TODO: add security check to prevent path traversal
    return Bun.file(filepath);
}
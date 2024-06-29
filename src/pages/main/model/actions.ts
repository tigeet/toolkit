import { client } from "@app/apollo";
import { GET_CURRENT_USER } from "../api";

export async function createQuery(search: string | null): Promise<string> {
  if (search) {
    return `is:public ${search}`;
  }
  const { data } = await client.query({ query: GET_CURRENT_USER });
  const login = data.viewer.login;
  return `is:public owner:${login}`;
}

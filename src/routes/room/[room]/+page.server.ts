import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  return {
    roomName: params.room
  }
};

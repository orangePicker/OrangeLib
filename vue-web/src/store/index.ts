import { useConfState } from "./modules/config";
import { useUserState } from "./modules/user";

export default function useStore() {
  return {
    useConfig: useConfState(),
    useUser: useUserState(),
  };
}

import { inject } from "vue";
import {
  RouteLocationNormalizedLoaded,
  Router,
  useRoute,
  useRouter
} from "vue-router";
import userStore from "./user";

export interface TStore {
  user: typeof userStore;
}

export const state = Symbol("state");

let cachedStore: TStore;
let cachedRoute: RouteLocationNormalizedLoaded;
let cachedRouter: Router;

export type TGetStoreFromOutsideSetup =
  | TStore
  | {
      store: TStore;
      router: Router;
      route: RouteLocationNormalizedLoaded;
    };

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const getStore = (
  fromOutsideSetup?: boolean
): TGetStoreFromOutsideSetup => {
  if (fromOutsideSetup == undefined) fromOutsideSetup = false;

  const route = useRoute();
  const router = useRouter();
  const store = inject<TStore>(state);
  if (store == undefined) {
    if (fromOutsideSetup)
      return {
        store: cachedStore,
        route: cachedRoute,
        router: cachedRouter
      };
    return cachedStore;
  }
  cachedStore = store;
  cachedRoute = route;
  cachedRouter = router;

  if (fromOutsideSetup)
    return {
      store: cachedStore,
      route: cachedRoute,
      router: cachedRouter
    };
  return store;
};

export const createStore: () => TStore = () => {
  return {
    user: userStore
  };
};

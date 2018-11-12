import * as t from "io-ts";
import { sessionSchema } from "./schema/sessionSchema";
import { decodeToPromise } from "./utils/decodeToPromise";

type Session = t.TypeOf<typeof sessionSchema>;

export class SessionStorage {
  constructor(
    private readonly storage: Storage,
    private readonly key: string
  ) {}

  public retrieve(): Promise<Session | null> {
    const value = this.storage.getItem(this.key);

    if (value === null) {
      return Promise.resolve(null);
    }

    return Promise.resolve(value)
      .then(JSON.parse)
      .then((data: any) => decodeToPromise(sessionSchema, data))
      .catch(() => null);
  }

  public reset(): void {
    this.storage.removeItem(this.key);
  }

  public update(session: Session): void {
    this.storage.setItem(this.key, JSON.stringify(session));
  }
}

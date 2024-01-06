import Consul from 'consul';

export class ConsulClient {
  constructor(private readonly consul: Consul.Consul) {}

  async fetchVariables(prefix: string) {
    const GLOBAL_PREFIX = 'global';
    const consulKeys: string[] = [];
    await Promise.all([
      this.fetchAllKeyValuesByPrefix(prefix),
      this.fetchAllKeyValuesByPrefix(GLOBAL_PREFIX),
    ])
      .then((res) => {
        if (res && res[0]) consulKeys.push(...(res[0] as string[]));
        if (res && res[1]) consulKeys.push(...(res[1] as string[]));
      })
      .catch((err) => err.message);

    const keys = consulKeys
      .map((key) => key.split('/')[1])
      .filter((key) => !!key);

    const environments = {};

    await Promise.all([
      this.fetchKeys(prefix, keys),
      this.fetchKeys(GLOBAL_PREFIX, keys),
    ]).then((res) => {
      res.forEach((keys) => {
        Object.keys(keys).forEach((key) => {
          if (!environments.hasOwnProperty(key)) {
            environments[key] = keys[key];
          }
        });
      });
    });
    return environments;
  }

  private async fetchAllKeyValuesByPrefix(prefix: string) {
    try {
      return await this.consul.kv.keys(prefix);
    } catch (error) {
      return;
    }
  }

  private async fetchKeys(prefix: string, keys: string[]) {
    const result = {};
    if (!prefix) return result;
    for (const key of keys) {
      try {
        const keyValue: { Value: string } = await this.consul.kv.get(
          `${prefix}/${key}`,
        );
        if (keyValue) {
          result[key] = keyValue.Value;
        }
      } catch (error) {
        break;
      }
    }
    return result;
  }
}

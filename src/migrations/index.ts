import * as migration_20251028_140010 from './20251028_140010';

export const migrations = [
  {
    up: migration_20251028_140010.up,
    down: migration_20251028_140010.down,
    name: '20251028_140010'
  },
];

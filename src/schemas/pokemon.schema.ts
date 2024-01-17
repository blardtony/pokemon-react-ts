import { z } from 'zod';

export const PokemonAbilitySchema = z.object({
  is_hidden: z.boolean(),
  slot: z.number(),
  ability: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export const PokemonAbilitiesSchema = z.array(PokemonAbilitySchema);

export const NamedAPIResourceSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const NamedAPIResourcesSchema = z.array(NamedAPIResourceSchema);

export const PokemonStatSchema = z.object({
  stat: NamedAPIResourceSchema,
  effort: z.number(),
  base_stat: z.number(),
});

export const PokemonStatsSchema = z.array(PokemonStatSchema);

export const PokemonSpritesSchema = z.object({
  front_default: z.string(),
});

export const PokemonTypeSchema = z.object({
  slot: z.number(),
  type: NamedAPIResourceSchema,
});

const PokemonTypesSchema = z.array(PokemonTypeSchema);

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  is_default: z.boolean(),
  order: z.number(),
  weight: z.number(),
  abilities: PokemonAbilitiesSchema,
  forms: NamedAPIResourcesSchema,
  sprites: PokemonSpritesSchema,
  species: NamedAPIResourceSchema,
  stats: PokemonStatsSchema,
  types: PokemonTypesSchema,
});

export const PokemonsSchema = z.array(PokemonSchema);
export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: NamedAPIResourcesSchema,
});

export type PokemonList = z.infer<typeof PokemonListSchema>;
export type PokemonsSchemaList = z.infer<typeof PokemonsSchema>;
export type PokemonType = z.infer<typeof PokemonSchema>;

<template>
    <pokemon-cards
        :pokemons="starters"
        :selectedId="selectedId"
        @pokemonClicked="fetchEvolutions"
    />
    <pokemon-cards :pokemons="evolutions" />
</template>



<script>
import Card from "./comps/Card.vue";
import PokemonCards from "./comps/PokemonCards.vue";

const API = "https://pokeapi.co/api/v2/pokemon";
const STARTER_IDS = [1, 4, 7];

export default {
    components: {
        Card,
        PokemonCards,
    },
    data() {
        return {
            starters: [],
            evolutions: [],
            selectedId: null,
        };
    },
    methods: {
        async fetchData(ids) {
            const responses = await Promise.all(
                ids.map((id) => window.fetch(`${API}/${id}`))
            );
            const data = await Promise.all(responses.map((res) => res.json()));
            return data.map((datum) => ({
                id: datum.id,
                name: datum.name,
                sprite: datum.sprites.other["official-artwork"].front_default,
                types: datum.types.map((type) => type.type.name),
            }));
        },
        async fetchEvolutions(pokemon) {
            this.selectedId = pokemon.id;
            this.evolutions = await this.fetchData([
                pokemon.id + 1,
                pokemon.id + 2,
            ]);
        },
    },
    // Lifecycle Hooks
    async created() {
        this.starters = await this.fetchData(STARTER_IDS);
    },
    // mounted() {},
};
</script>



<style scoped>
</style>

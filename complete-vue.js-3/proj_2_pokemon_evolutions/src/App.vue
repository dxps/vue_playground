<template>
    <div class="cards">
        <card v-for="starter in starters" @click="fetchEvolutions(starter)">
            <template v-slot:title>
                {{ starter.name }}
            </template>

            <template v-slot:content>
                <img :src="starter.sprite" />
            </template>

            <template v-slot:description>
                <div v-for="type in starter.types">{{ type }}</div>
            </template>
        </card>
    </div>

    <div class="cards">
        <card v-for="creature in evolutions">
            <template v-slot:title>
                {{ creature.name }}
            </template>

            <template v-slot:content>
                <img :src="creature.sprite" />
            </template>

            <template v-slot:description>
                <div v-for="type in creature.types">{{ type }}</div>
            </template>
        </card>
    </div>
</template>



<script>
import Card from "./comps/Card.vue";

const API = "https://pokeapi.co/api/v2/pokemon";
const STARTER_IDS = [1, 4, 7];

export default {
    components: {
        Card,
    },
    data() {
        return {
            starters: [],
            evolutions: [],
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
.cards {
    display: flex;
}

img {
    width: 100%;
}
</style>

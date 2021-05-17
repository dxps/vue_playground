<template>
    <div class="cards">
        <card v-for="starter in starters">
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
</template>



<script>
import Card from "./comps/Card.vue";

const api = "https://pokeapi.co/api/v2/pokemon";
const ids = [1, 4, 7];

export default {
    components: {
        Card,
    },
    data() {
        return {
            starters: [],
        };
    },
    methods: {
        async fetchData() {
            const responses = await Promise.all(
                ids.map((id) => window.fetch(`${api}/${id}`))
            );
            const data = await Promise.all(responses.map((res) => res.json()));
            this.starters = data.map((datum) => ({
                id: datum.id,
                name: datum.name,
                sprite: datum.sprites.other["official-artwork"].front_default,
                types: datum.types.map((type) => type.type.name),
            }));
        },
    },
    // Lifecycle Hooks
    created() {
        this.fetchData();
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

<template>
    <div class="card">
        <button @click="fetchData">Fetch</button>
        <div class="title">title</div>
        <div class="content">content</div>
        <div class="description">desc</div>
    </div>
</template>



<script>
const api = "https://pokeapi.co/api/v2/pokemon";

export default {
    methods: {
        async fetchData() {
            const response = await window.fetch(`${api}/1`);
            const data = await response.json();
            const pokemon = {
                name: data.name,
                sprite: data.sprites.other["official-artwork"],
                types: data.types.map((type) => ({ name: type.type.name })),
            };
            console.log("pokemon:", pokemon);
        },
    },
};
</script>



<style scoped>
.card {
    border: 1px solid silver;
    border-radius: 8px;
    max-width: 200px;
    margin: 0 5px;
    cursor: pointer;
    box-shadow: 0px 1px 3px darkgrey;
    transition: 0.2s;
}

.title,
.content,
.description {
    padding: 16px;
    text-transform: capitalize;
    text-align: center;
}

.title,
.content {
    border-bottom: 1px solid silver;
}

.title {
    font-size: 1.25em;
}

.card:hover {
    transition: 0.2s;
    box-shadow: 0px 1px 9px darkgrey;
}
</style>

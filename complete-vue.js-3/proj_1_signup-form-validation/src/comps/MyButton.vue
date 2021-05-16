<template>
    <button
        :style="{ background, color }"
        :class="{ 'disabled-button': disabled }"
        :disabled="disabled"
    >
        Button
    </button>
</template>



<script>
export default {
    props: {
        background: {
            type: String,
        },
        color: {
            type: String,
        },
        disabled: {
            type: Boolean,
        },
    },
};
</script>



<style scoped>
.disabled-button {
    opacity: 0.5;
}
button {
    background: none;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 40px;
}
button:hover {
    filter: brightness(125%);
}
</style>
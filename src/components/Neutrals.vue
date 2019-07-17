<template>
<div class="container">
    <div class="columns">
        <div class="column is-full">
            <div class="field is-grouped is-grouped-multiline">
                <div class="control clickable">
                    <div class="control clickable" v-on:click="openNeutralCardsPage()">
                        <div class="tags">
                            <span v-bind:class="['tag', 'is-medium', neutralClass ]">중립</span>
                        </div>
                    </div>
                </div>
                <div class="control clickable">
                    <div class="control clickable" v-on:click="openRelicPage()">
                        <div class="tags">
                            <span v-bind:class="['tag', 'is-medium', neutralClass ]">유물</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Neutrals",
    data: function () {
        return {
            neutralClass: ['button', 'is-focused']
        };
    },
    methods: {
        openNeutralCardsPage: function () {
            this.$router.push({
                path: "/neutral"
            })
        },
        openRelicPage: function () {
            this.$router.push({
                path: "/relic"
            })
        }
    }
};
</script>

<style scoped>
.tags {
    padding-left: 0.65em;
    padding-right: 0.65em;
    padding-top: 0.35em;
    padding-bottom: 0.35em;
}

.clickable {
    cursor: pointer;
}


.container {
    margin-bottom : 20px;
}
</style>

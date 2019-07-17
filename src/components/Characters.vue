<template>
<div class="container">
    <div v-for="character in characters" v-bind:key="character.name">
        <div class="columns">
            <div class=" column is-full">
                <div class="field is-grouped is-grouped-multiline">
                    <div class="control clickable">
                        <div class="control clickable" v-on:click="openCharacterPage(character)">
                            <div class="tags">
                                <span v-bind:class="['tag', 'is-medium', toCharacteClass(character) ]">{{ character.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-for="deck in character.decks" v-bind:key="deck.name">
                        <div class="control clickable" v-on:click="openDeckPage(character, deck)">
                            <div class="tags">
                                <span v-bind:class="['tag', 'is-medium', toActiveClass(character, deck) ]">{{ deck.name }}</span>
                            </div>
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
    name: "Characters",
    props: ["characters", "characterId", "deckId"],
    data: function () {
        return {
            ironcladClass: 'is-danger',
            silentClass: 'is-primary',
            defectClass: 'is-link',
            neutralClass: ['button', 'is-focused']
        };
    },
    methods: {
        toCharacteClass: function (character) {
            if (character.id == "ironclad") {
                return this.ironcladClass
            } else if (character.id == "silent") {
                return this.silentClass
            } else if (character.id == "defect") {
                return this.defectClass
            } else {
                return this.neutralClass
            }
        },
        toActiveClass: function (character, deck) {
            if (this.characterId == character.id && this.deckId == deck.id) {
                return this.toCharacteClass(character)
            } else {
                return undefined
            }
        },
        openCharacterPage: function (character) {
            this.$router.push({
                path: "/" + character.id
            })
        },
        openDeckPage: function (character, deck) {
            this.$router.push({
                path: "/" + character.id + "/" + deck.id
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
    margin-bottom: 0px;
}
</style>

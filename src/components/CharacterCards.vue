<template>
<div class="container">
    <div class="columns">
        <div class="column" v-if="!isCharacterCardsListing()">
            <a class="button is-outlined" v-if="this.allVisible" v-on:click="setVisible(false)">안중요카드 숨기기</a>
            <a class="button is-outlined" v-if="!this.allVisible" v-on:click="setVisible(true)">모두 보이기</a>
        </div>
    </div>
    <div class="columns is-multiline">
        <div v-for="card in cards" v-bind:key="card.key">
            <div class="column" v-if="isVisible(card)">
                <div v-bind:class="['card', toSelectedClass(card)]">
                    <header v-bind:class="['card-header', toRarityClass(card)]">
                        <div class="card-header-title is-centered">
                            <div>{{ card.korName }}</div>
                        </div>
                    </header>
                    <div class="card-image">
                        <img v-bind:src="toImageSrc(card)">

                        <div class="class-cost is-overlay">
                            <span v-bind:class="['tag', 'has-text-weight-semibold', 'is-rounded', costClass]">{{ card.normal.cost }}</span>
                            <span v-if="card.normal.cost != card.reinforced.cost" v-bind:class="['tag', 'has-text-weight-semibold', 'is-rounded', costClass]">
                                {{ card.reinforced.cost }}
                            </span>
                        </div>

                        <div class="class-type is-overlay">
                            <span v-bind:class="['tag', 'has-text-weight-semibold', 'is-rounded', toTypeClass(card)]">{{ toKorType(card) }}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="normal-content has-text-left is-description">
                            <p>{{ card.normal.effect }}</p>
                        </div>
                    </div>
                    <footer class="normal-content has-text-left is-description card-footer">
                        <div class="card-content">
                            <p>
                                <span v-for="(diff, index) in colorReinforcedEffect(card)" v-bind:key="index">
                                    <span v-if="diff[0] == 0">{{ diff[1] }}</span>
                                <span v-else-if="diff[0] == 1" v-bind:class="[ reinforcedTextClass ]">{{ diff[1] }}</span>
                                </span>
                            </p>
                            <p v-if="card.normal.cost != card.reinforced.cost">
                                <span>비용이 {{ card.normal.cost }}에서 </span>
                                <span v-bind:class="[ reinforcedTextClass ]">{{ card.reinforced.cost }}</span>
                                <span>{{ getPostposition(card.reinforced.cost, "이") }} 됩니다.</span>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'CharacterCards',
    props: ["characterId", "cards", "deckKeyCards", "deckCards"],
    data: function () {
        return {
            allVisible: true,

            deckKeyCardClass: 'is-deck-key-card',
            deckCardClass: 'is-deck-card',
            notDeckClass: 'is-not-deck-card',

            attackClass: 'is-danger',
            skillClass: 'is-info',
            powerClass: 'is-link',

            commonClass: 'class-common',
            uncommonClass: 'class-uncommon',
            rareClass: 'class-rare',

            costClass: 'is-warning',
            reinforcedTextClass: 'has-text-reinforced'
        }
    },
    mounted: function () {
        this.allVisible = this.$store.state.allVisible
    },
    methods: {
        toImageSrc: function (card) {
            return this.$helper.toRelativeSrc(this, '/images/' + this.characterId + '/' + card.key + '.png')
        },
        toKorType: function (card) {
            return this.$helper.toKorType(card.type)
        },
        toRarityClass: function (card) {
            switch (card.rarity) {
                case "common":
                    return this.commonClass
                case "uncommon":
                    return this.uncommonClass
                case "rare":
                    return this.rareClass
            }
        },
        toTypeClass: function (card) {
            switch (card.type) {
                case "attack":
                    return this.attackClass
                case "skill":
                    return this.skillClass
                case "power":
                    return this.powerClass
            }
        },
        colorReinforcedEffect: function (card) {
            return this.$diff.main(card.normal.effect, card.reinforced.effect)
        },
        getPostposition: function (num, pp) {
            if (["0", "1", "3", "6", "7", "8"].indexOf(num) != -1) {
                if (pp == "을/를") {
                    return "을"
                } else {
                    return "이"
                }
            } else {
                if (pp == "을/를") {
                    return "를"
                } else {
                    return "가"
                }
            }
        },
        isCharacterCardsListing() {
            if ((!this.deckKeyCards || this.deckKeyCards.length == 0) && (!this.deckCards || this.deckCards.length == 0)) {
                return true
            } else {
                return false
            }
        },
        isVisible: function (card) {
            if (this.allVisible) {
                return true
            }
            if (this.isCharacterCardsListing()) {
                return true
            }
            if (this.deckKeyCards.find(array => array.replace(/ /g, '') == card.korName.replace(/ /g, ''))) {
                return true
            } else if (this.deckCards.find(array => array.replace(/ /g, '') == card.korName.replace(/ /g, ''))) {
                return true
            } else {
                return false
            }
        },
        setVisible: function (newValue) {
            this.allVisible = newValue
            this.$store.commit("setVisiblility", newValue)
        },
        toSelectedClass: function (card) {
            if (this.isCharacterCardsListing()) {
                return this.deckCardClass // default
            }
            if (this.deckKeyCards.find(array => array.replace(/ /g, '') == card.korName.replace(/ /g, ''))) {
                return this.deckKeyCardClass
            } else if (this.deckCards.find(array => array.replace(/ /g, '') == card.korName.replace(/ /g, ''))) {
                return this.deckCardClass
            } else {
                return this.notDeckClass
            }
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 200px;
}

.is-deck-key-card {
    opacity: 1;
}

.is-deck-card {
    opacity: 1;
}

.is-not-deck-card {
    opacity: 0.2;
}

img {
    background-color: #000000;
    width: 200px;
}

.card-content {
    padding: 5px;
}

.normal-content p {
    padding: 7px;
    max-width: 200px;
}

header.class-common {
    background-color: #999999;
}

header.class-uncommon {
    background-color: #71dbe6;
}

header.class-rare {
    background-color: #f6b752;
}

.class-type {
    display: flex;
    justify-content: flex-end;
}

.class-type span {
    margin: 5px;
}

.class-cost {
    display: flex;
    justify-content: flex-start;
}

.class-cost span {
    margin: 5px;
}

.is-description {
    font-size: 0.8rem;
}

.has-text-reinforced {
    color: hsl(168, 100%, 40%)
}
</style>

<template>
<div class="container">
    <div class="columns is-multiline">
        <div v-for="relic in relics" v-bind:key="relic.key">
            <div class="column">
                <div class="card">
                    <header v-bind:class="['card-header', toRarityClass(relic)]">
                        <div class="card-header-title is-centered">
                            <div>{{ relic.korName }}</div>
                        </div>
                    </header>
                    <div class="card-image">
                        <img v-bind:src="toImageSrc(relic)">

                        <div class="class-cost is-overlay class-rarity">
                            <span v-bind:class="['tag', 'has-text-weight-semibold', 'is-rounded', toRarityClass(relic)]">{{ toKorRarity(relic) }}</span>
                        </div>

                        <div v-bind:class="['class-type', 'is-overlay', 'class-character']">
                            <span v-bind:class="['tag', 'has-text-weight-semibold', 'is-rounded', toTypeClass(relic)]">{{ toKorCharacter(relic) }}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="normal-content has-text-left is-description">
                            <p>{{ relic.effect }}</p>
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
    name: "Relics",
    props: ["relics"],
    data: function () {
        return {
            commonClass: 'class-common',
            uncommonClass: 'class-uncommon',
            rareClass: 'class-rare',
            starterClass: 'class-starter',
            bossClass: 'class-boss',
            eventClass: 'class-event',
            shopClass: 'class-shop',

            ironcladClass: 'is-danger',
            silentClass: 'is-info',
            defectClass: 'is-link'
        };
    },
    methods: {
        toImageSrc: function (relic) {
            return this.$helper.toRelativeSrc(this, '/images/relic/' + relic.key + '.png')
        },
        toKorRarity: function (relic) {
            return this.$helper.toKorRarity(relic.rarity)
        },
        toKorCharacter: function (relic) {
            return this.$helper.toKorCharacter(relic.character)
        },
        toTypeClass: function (relic) {
            switch (relic.character) {
                case "ironclad":
                    return this.ironcladClass
                case "silent":
                    return this.silentClass
                case "defect":
                    return this.defectClass
            }
        },
        toRarityClass: function (relic) {
            switch (relic.rarity) {
                case "common":
                    return this.commonClass
                case "uncommon":
                    return this.uncommonClass
                case "rare":
                    return this.rareClass
                case "starter":
                    return this.starterClass
                case "boss":
                    return this.bossClass
                case "event":
                    return this.eventClass
                case "shop":
                    return this.shopClass

            }
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 200px;
    min-width: 200px;
}

.card-content {
    padding: 10px;
}

.class-uncommon {
    background-color: #71dbe6;
}

.class-rare {
    background-color: #f6b752;
}

.class-boss {
    background-color: #ed797c;
}

.class-event {
    background-color: #d8a0f0;
}

.class-starter {
    background-color: #aabbcc;
}

.class-shop {
    background-color: #7cb980;
}

.is-description {
    font-size: 0.8rem;
}

.class-character {
    display: flex;
    justify-content: flex-end;
}

.class-character span {
    margin: 5px;
}

.class-rarity {
    display: flex;
    justify-content: flex-start;
}

.class-rarity span {
    margin: 5px;
}
</style>

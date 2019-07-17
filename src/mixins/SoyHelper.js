var urljoin = require('url-join');

module.exports = {
  toRelativeSrc: function (vm, url) {
    if (vm.$router.options && vm.$router.options.base) {
      return urljoin(vm.$router.options.base, url)
    } else {
      return url
    }
  },

  toKorRarity: function (rarity) {
    switch (rarity) {
      case "common":
        return "일반"
      case "uncommon":
        return "희귀"
      case "rare":
        return "특별"
      case "starter":
        return "시작"
      case "boss":
        return "보스"
      case "event":
        return "이벤트"
      case "shop":
        return "샵"
    }
  },

  toKorType: function (type) {
    switch (type) {
      case "attack":
        return "공격"
      case "skill":
        return "스킬"
      case "power":
        return "파워"
    }
  },

  toKorCharacter: function (type) {
    switch (type) {
      case "ironclad":
        return "아이언클래드"
      case "silent":
        return "사일런트"
      case "defect":
        return "디펙트"
      case "common":
        return "공용"
    }
  }
}
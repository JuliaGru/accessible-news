export const state = () => ({
  screenReader: false,
  theme: 'theme-default',
  navigation: null,
  navMore: true,
  navMoreLength: 0,
  navMoreItems: [],
  navMoreIndex: 0,
  navItemsLength: [],
})

export const mutations = {
  setReader(state, bool) {
    state.screenReader = bool;
  },
  setTheme(state, theme) {
    state.theme = theme;
  },
  setNavigation(state, navigation) {
    state.navigation = navigation;
  },
  setNavRefMore(state, refMore) {
    state.navMoreLength = refMore.clientWidth;
  },
  setNavMore(state, more) {
    for (let i = state.navMoreIndex - 1; i >= 0; i--) {
      state.navMoreItems = { ...state.navMoreItems, [i]: false }
    }
  },
  setNavMoreIndex(state, length) {
    state.navMoreIndex = length;
  },
  setNavItemsLength(state, refNavItems) {
    for (let i = 0; i < refNavItems.length; i++ ) {
      state.navItemsLength[i] = refNavItems[i].clientWidth;
    }
  },
  shortMenu(state, width) {
    let summary = 0;
    let maxwidth = width - 50;

    for (let i = 0; i < state.navMoreIndex; i++) {
      summary += state.navItemsLength[i];
    }

    if (summary > maxwidth) {
      state.navMore = true;
      summary += state.navMoreLength;

      for (let i = state.navMoreIndex - 1; i >= 0; i--) {
        if (summary > maxwidth) {
          state.navMoreItems = { ...state.navMoreItems, [i]: true }
        } else {
          state.navMoreItems = { ...state.navMoreItems, [i]: false }
        }
        summary -= state.navItemsLength[i];
      }
    } else {
      state.navMore = false;
    }
  }
}
